const Order = require("../models/Order");
const emailSender = require("../utils/emailSender");

const placeOrder = async (userId, orderData) => {
  const { email, name, order, address, items } = orderData;

  if (
    !email ||
    !name ||
    !order ||
    !address ||
    !Array.isArray(items) ||
    !items.length
  ) {
    throw new Error("Invalid order payload");
  }

  const detailedItems = items
    .filter(
      (item) =>
        item.productId &&
        item.quantity > 0 &&
        item.name &&
        typeof item.price === "number"
    )
    .map((item) => ({
      productId: item.productId,
      name: item.name,
      price: item.price,
      quantity: item.quantity,
      image: item.image || "",
    }));

  if (!detailedItems.length) {
    throw new Error("Invalid cart items");
  }

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
    subtotal: order.subtotal,
    shipping: order.shipping,
    total: order.total,
    paymentMethod: order.paymentMethod || "COD",
    status: "Placed",
    tracking: [{ step: "Order Placed", date: new Date() }],
  });

  await newOrder.save();

  const itemsHtml = detailedItems
    .map(
      (item) =>
        `<tr><td>${item.name}</td><td align="center">${item.quantity}</td><td align="right">${item.price}</td></tr>`
    )
    .join("");

  await emailSender.sendEmail({
    from: '"Wink&Wear" <artisinghstp5313@gmail.com>',
    to: email,
    subject: `Order Confirmation • ${newOrder._id}`,
    html: `
      <div style="font-family:Arial,Helvetica,sans-serif; background:#f6f6f6; padding:30px;">
        <div style="max-width:600px; margin:auto; background:#ffffff; padding:24px; border-radius:8px;">
          
          <h2 style="margin-bottom:8px;">Hi ${name},</h2>
          <p>Thank you for shopping with <strong>Wink&Wear</strong> 🎉</p>

          <hr style="margin:20px 0;" />

          <p><strong>Order ID:</strong> ${newOrder._id}</p>
          <p><strong>Order Date:</strong> ${new Date(
            newOrder.createdAt
          ).toDateString()}</p>
          <p><strong>Payment Method:</strong> ${newOrder.paymentMethod}</p>

          <h3 style="margin-top:24px;">Items Ordered</h3>

          <table width="100%" style="border-collapse:collapse;">
            <thead>
              <tr style="border-bottom:1px solid #ddd;">
                <th align="left">Product</th>
                <th align="center">Qty</th>
                <th align="right">Price</th>
              </tr>
            </thead>
            <tbody>
              ${itemsHtml}
            </tbody>
          </table>

          <hr style="margin:20px 0;" />

          <p><strong>Subtotal:</strong> ${newOrder.subtotal}</p>
          <p><strong>Shipping:</strong> ${newOrder.shipping}</p>
          <p style="font-size:18px;">
            <strong>Total Paid:</strong> ${newOrder.total}
          </p>

          <h3 style="margin-top:24px;">Delivery Address</h3>
          <p>
            ${newOrder.address.name}<br/>
            ${newOrder.address.street}<br/>
            ${newOrder.address.city}, ${newOrder.address.state} – ${newOrder.address.pincode}<br/>
            ${newOrder.address.country}<br/>
            📞 ${newOrder.address.phone}
          </p>

          <hr style="margin:20px 0;" />

          <p>
            📦 Your order will be delivered within <strong>5–7 business days</strong>.
          </p>

          <p style="margin-top:30px;">
            — Team <strong>Wink&Wear</strong><br/>
            <small>Need help? Reply to this email.</small>
          </p>
        </div>
      </div>
    `,
  });

  return newOrder._id;
};

const getMyOrders = async (userId) => {
  return await Order.find({ userId }).sort({
    createdAt: -1,
  });
};

const getOrderById = async (userId, orderId) => {
  return await Order.findOne({
    _id: orderId,
    userId,
  });
};

const cancelOrder = async (userId, orderId) => {
  const order = await Order.findOne({
    _id: orderId,
    userId,
  });

  if (!order || order.status === "Delivered") {
    return false;
  }

  order.status = "Cancelled";
  order.tracking.push({
    step: "Order Cancelled",
    date: new Date(),
  });

  await order.save();
  return true;
};

module.exports = {
  placeOrder,
  getMyOrders,
  getOrderById,
  cancelOrder,
};
