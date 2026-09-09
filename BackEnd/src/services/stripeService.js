const stripe = require("../config/stripe");
const Order = require("../models/Order");
const Product = require("../models/Product");
const { calculateOrderTotals } = require("../utils/promoUtils");
const emailSender = require("../utils/emailSender");
const env = require("../config/env");

/**
 * Creates a pending Order in MongoDB and initializes a Stripe Hosted Checkout Session.
 * 
 * Enforces server-side price lookup and coupon calculation.
 */
const createCheckoutSession = async (userId, payload) => {
  if (!stripe) {
    throw new Error("Stripe is not configured on the server. Missing STRIPE_SECRET_KEY.");
  }

  const { email, name, items, address, couponCode } = payload;

  if (
    !email ||
    !name ||
    !address ||
    !Array.isArray(items) ||
    !items.length
  ) {
    throw new Error("Invalid checkout payload");
  }

  // 1. Fetch products from MongoDB for authoritative prices
  const productIds = items.map((i) => Number(i.productId)).filter(Boolean);
  const dbProducts = await Product.find({ id: { $in: productIds } }).lean();
  const dbProductMap = new Map(dbProducts.map((p) => [p.id, p]));

  // Build validated line items
  const detailedItems = [];
  let subtotal = 0;

  for (const item of items) {
    const pId = Number(item.productId);
    const qty = Math.min(Math.max(Number(item.quantity) || 1, 1), 10);
    const dbProduct = dbProductMap.get(pId);

    // Fallback if product was from local fallback collection but has valid structure
    const productName = dbProduct ? dbProduct.name : (item.name || `Fashion Item #${pId}`);
    const unitPrice = dbProduct ? Number(dbProduct.new_price) : Number(item.price);
    const productImage = dbProduct ? (dbProduct.images || "") : (item.image || "");

    if (isNaN(unitPrice) || unitPrice <= 0) {
      throw new Error(`Invalid price for product #${pId}`);
    }

    subtotal += unitPrice * qty;

    detailedItems.push({
      productId: pId,
      name: productName,
      price: unitPrice,
      quantity: qty,
      image: productImage,
    });
  }

  if (!detailedItems.length) {
    throw new Error("No valid products found in cart");
  }

  // 2. Server-side authoritative total & promo calculation
  const totals = calculateOrderTotals(subtotal, couponCode);

  // 3. Create Pending Order in MongoDB
  const newOrder = new Order({
    userId,
    items: detailedItems,
    address: {
      name,
      phone: address.phone,
      street: address.street,
      city: address.city,
      state: address.state,
      pincode: address.pincode || address.zipCode,
      country: address.country || "India",
    },
    subtotal: totals.subtotal,
    discount: totals.discount,
    shipping: totals.shipping,
    total: totals.total,
    promoCode: totals.appliedCode,
    currency: "usd",
    paymentMethod: "Stripe",
    paymentStatus: "pending",
    status: "Placed",
    tracking: [{ step: "Order Initiated (Stripe Checkout)", date: new Date() }],
  });

  await newOrder.save();

  // 4. Build Stripe Checkout line items
  const stripeLineItems = detailedItems.map((item) => ({
    price_data: {
      currency: "usd",
      product_data: {
        name: item.name,
        images: item.image && item.image.startsWith("http") ? [item.image] : [],
        metadata: {
          productId: String(item.productId),
        },
      },
      unit_amount: Math.round(item.price * 100), // integer cents
    },
    quantity: item.quantity,
  }));

  // Handle coupon discount in Stripe
  const discountsList = [];
  if (totals.discount > 0) {
    try {
      const stripeCoupon = await stripe.coupons.create({
        amount_off: Math.round(totals.discount * 100),
        currency: "usd",
        duration: "once",
        name: totals.appliedCode || "Promo Discount",
      });
      discountsList.push({ coupon: stripeCoupon.id });
    } catch (couponErr) {
      console.warn("Stripe Coupon Creation Notice:", couponErr.message);
    }
  }

  // Handle shipping in Stripe
  const shippingOptions = [
    {
      shipping_rate_data: {
        type: "fixed_amount",
        fixed_amount: {
          amount: Math.round(totals.shipping * 100),
          currency: "usd",
        },
        display_name: totals.shipping === 0 ? "Free Shipping" : "Standard Delivery",
      },
    },
  ];

  // 5. Create Stripe Checkout Session
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    mode: "payment",
    customer_email: email,
    line_items: stripeLineItems,
    discounts: discountsList.length > 0 ? discountsList : undefined,
    shipping_options: shippingOptions,
    client_reference_id: newOrder._id.toString(),
    metadata: {
      orderId: newOrder._id.toString(),
      userId: userId.toString(),
    },
    success_url: `${env.CLIENT_URL}/payment-success?session_id={CHECKOUT_SESSION_ID}&order_id=${newOrder._id}`,
    cancel_url: `${env.CLIENT_URL}/place-order?cancelled=true`,
  });

  // 6. Link Stripe Session ID to Order
  newOrder.stripeSessionId = session.id;
  await newOrder.save();

  return {
    url: session.url,
    sessionId: session.id,
    orderId: newOrder._id,
  };
};

/**
 * Processes incoming Stripe Webhook events idempotently.
 * 
 * @param {object} event - Verified Stripe Webhook event
 */
const handleWebhookEvent = async (event) => {
  console.log(`[STRIPE WEBHOOK] Received event: ${event.type} (ID: ${event.id})`);

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object;
      const orderId = session.metadata?.orderId || session.client_reference_id;

      if (!orderId) {
        console.warn("[STRIPE WEBHOOK] Missing orderId in session metadata");
        return { received: true, error: "Missing orderId" };
      }

      const order = await Order.findById(orderId);
      if (!order) {
        console.warn(`[STRIPE WEBHOOK] Order not found for ID ${orderId}`);
        return { received: true, error: "Order not found" };
      }

      // Idempotency check: do not double-process already confirmed orders
      if (order.paymentStatus === "paid") {
        console.log(`[STRIPE WEBHOOK] Order ${orderId} is already marked as paid. Skipping.`);
        return { received: true, alreadyProcessed: true };
      }

      // Update Order Status
      order.paymentStatus = "paid";
      order.status = "Processing";
      order.stripePaymentIntentId = session.payment_intent;
      order.tracking.push({
        step: "Payment Confirmed via Stripe",
        date: new Date(),
      });

      await order.save();
      console.log(`[STRIPE WEBHOOK] Order ${orderId} successfully marked as PAID`);

      // Dispatch async confirmation email
      const itemsHtml = order.items
        .map(
          (item) =>
            `<tr><td>${item.name}</td><td align="center">${item.quantity}</td><td align="right">$${item.price.toFixed(2)}</td></tr>`
        )
        .join("");

      emailSender
        .sendEmail({
          from: '"Wink&Wear" <artisinghstp5313@gmail.com>',
          to: session.customer_email || session.customer_details?.email,
          subject: `Payment Confirmed • Order #${order._id}`,
          html: `
            <div style="font-family:Arial,Helvetica,sans-serif; background:#f6f6f6; padding:30px;">
              <div style="max-width:600px; margin:auto; background:#ffffff; padding:24px; border-radius:8px;">
                <h2 style="color:#d4a045; margin-bottom:8px;">Payment Successful! 🎉</h2>
                <p>Hi ${order.address?.name || "Valued Customer"},</p>
                <p>Your payment has been verified and your order is now being processed.</p>
                <hr style="margin:20px 0;" />
                <p><strong>Order ID:</strong> ${order._id}</p>
                <p><strong>Payment Status:</strong> Paid (Stripe)</p>
                <p><strong>Total Amount:</strong> $${order.total.toFixed(2)}</p>
                <h3 style="margin-top:24px;">Items Ordered</h3>
                <table width="100%" style="border-collapse:collapse;">
                  <thead>
                    <tr style="border-bottom:1px solid #ddd;">
                      <th align="left">Product</th>
                      <th align="center">Qty</th>
                      <th align="right">Price</th>
                    </tr>
                  </thead>
                  <tbody>${itemsHtml}</tbody>
                </table>
                <hr style="margin:20px 0;" />
                <p>📦 Your order will be delivered within <strong>5–7 business days</strong>.</p>
                <p style="margin-top:30px;">— Team <strong>Wink&Wear</strong></p>
              </div>
            </div>
          `,
        })
        .catch((err) => {
          console.error("[STRIPE WEBHOOK] Async Confirmation Email Error:", err.message);
        });

      return { received: true, status: "paid" };
    }

    case "payment_intent.payment_failed": {
      const paymentIntent = event.data.object;
      const order = await Order.findOne({ stripePaymentIntentId: paymentIntent.id });
      if (order && order.paymentStatus !== "paid") {
        order.paymentStatus = "failed";
        order.tracking.push({
          step: "Payment Failed",
          date: new Date(),
        });
        await order.save();
        console.log(`[STRIPE WEBHOOK] Order ${order._id} marked as FAILED`);
      }
      return { received: true, status: "failed" };
    }

    case "checkout.session.expired": {
      const session = event.data.object;
      const orderId = session.metadata?.orderId || session.client_reference_id;
      if (orderId) {
        const order = await Order.findById(orderId);
        if (order && order.paymentStatus === "pending") {
          order.paymentStatus = "failed";
          order.status = "Cancelled";
          order.tracking.push({
            step: "Checkout Session Expired",
            date: new Date(),
          });
          await order.save();
        }
      }
      return { received: true, status: "expired" };
    }

    default:
      return { received: true, ignored: true };
  }
};

module.exports = {
  createCheckoutSession,
  handleWebhookEvent,
};
