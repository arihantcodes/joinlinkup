import Razorpay from 'razorpay';
import {Order} from "../models/Order.js";
import asyncHandler from "../utils/asyncHandler.js";

import ApiResponse from "../utils/ApiResponse.js";

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_SECRET_KEY,
    });




const createorder = asyncHandler(async (req, res) => {

    const { amount, currency } = req.body;
    const order = await razorpay.orders.create({ amount, currency });
    await Order.create({ user_id: req.user.userId, amount, currency, payment_status: 'created', order_id: order.id });
    
    return res.status(200).json(new ApiResponse(200, { order }));
});

const webhook = asyncHandler(async (req, res) => {
    const { event, payload } = req.body;
    if (event === 'payment.captured') {
        const order = await Order.findOne({ where: { order_id: payload.payment.entity.order_id } });
        order.payment_status = 'captured';
        await order.save();
    }

    return res
    .status(200)
    .json(new ApiResponse(200, null, "Webhook Received Successfully"));

})


export { createorder ,webhook};