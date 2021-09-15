import asyncHandler from 'express-async-handler';
import Order from '../models/orderModel.js';

// @description Create Order
// @route POST /api/orders
// @access Private
const addOrderItems = asyncHandler(async (req, res) => {
    const {
        orderItems,
        shippingAddress,
        paymentMethod,
        totalPrice,
        taxPrice,
        shippingPrice,
    } = req.body;

    if (orderItems && orderItems?.length === 0) {
        res.status(400);
        throw new Error("No Order items")
    } else {
        const order = new Order({
            orderItems,
            user: req.user,
            shippingAddress,
            paymentMethod,
            totalPrice,
            taxPrice,
            shippingPrice,
        })
        const createOrder = await order.save();
        res.status(201).json(createOrder)
    }

})

// @description Get Order By Id
// @route GET /api/orders:id
// @access Private
const getOrderById = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id).populate({
        path: 'user',
        select: 'firstName lastName email'
    });
    if (order) {
        res.json(order);
    } else {
        res.status(404);
        throw new Error("Order not found.")
    }
})

// @description Order pay with paypal
// @route PUT /api/orders/:id/pay
// @access Private
const orderUpdateToPay = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (order) {
        order.isPaid = true;
        order.paidAt = Date.now();
        order.paymentResult = {
            id: req.body.id,
            status: req.body.status,
            update_time: req.body.update_time,
            email_address: req.body.payer.email_address
        };

        const updateOrder = await order.save();
        res.status(201).json(updateOrder)

    } else {
        res.status(404);
        throw new Error("Order not found.");
    }
})

// @description Get Orders By Logged User.
// @route GET /api/orders/myOrder
// @access Private
const getMyOrder = asyncHandler(async (req, res) => {
    const orders = await Order.find({ user: req.user });
    if (orders) {
        res.json(orders);
    } else {
        res.status(404);
        throw new Error("Order not found.")
    }
})

// @description Get Orders By Logged User.
// @route GET /api/allorders
// @access Private/Admin
const getAllOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find({}).populate('user', '_id firstName lastName');
    res.json(orders);
})

// @description Order Delever update
// @route PUT /api/orders/:id/delever
// @access Private/Admin
const orderUpdateToDelever = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (order) {
        order.isDelivered = true;
        order.deliveredAt = Date.now();

        const updateOrder = await order.save();
        res.status(201).json(updateOrder)

    } else {
        res.status(404);
        throw new Error("Order not found.");
    }
})

export {
    addOrderItems,
    getOrderById,
    orderUpdateToPay,
    getMyOrder,
    getAllOrders,
    orderUpdateToDelever
}


