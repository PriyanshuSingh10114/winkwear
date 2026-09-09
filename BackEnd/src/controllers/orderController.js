const orderService = require("../services/orderService");

const placeOrder = async (req, res, next) => {
  try {
    const orderId = await orderService.placeOrder(req.user.id, req.body);
    res.json({
      success: true,
      orderId,
    });
  } catch (error) {
    if (error.message.includes("Invalid")) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
    console.error("Order error:", error);
    res.status(500).json({
      success: false,
      message: "Server error while placing order",
    });
  }
};

const getMyOrders = async (req, res, next) => {
  try {
    const orders = await orderService.getMyOrders(req.user.id);
    res.json(orders);
  } catch (error) {
    next(error);
  }
};

const getOrderById = async (req, res, next) => {
  try {
    const order = await orderService.getOrderById(req.user.id, req.params.id);
    if (!order) {
      return res.status(404).json({ success: false });
    }
    res.json(order);
  } catch (error) {
    next(error);
  }
};

const cancelOrder = async (req, res, next) => {
  try {
    const success = await orderService.cancelOrder(req.user.id, req.params.id);
    if (!success) {
      return res.status(400).json({ success: false });
    }
    res.json({ success: true });
  } catch (error) {
    next(error);
  }
};

const getPaymentStatus = async (req, res, next) => {
  try {
    const order = await orderService.getPaymentStatus(req.user.id, req.params.id);
    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }
    res.json({
      success: true,
      orderId: order._id,
      paymentStatus: order.paymentStatus,
      status: order.status,
      total: order.total,
      subtotal: order.subtotal,
      discount: order.discount,
      shipping: order.shipping,
      paymentMethod: order.paymentMethod,
      items: order.items,
      address: order.address,
      createdAt: order.createdAt,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  placeOrder,
  getMyOrders,
  getOrderById,
  cancelOrder,
  getPaymentStatus,
};
