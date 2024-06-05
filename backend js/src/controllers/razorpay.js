import Razorpay from 'razorpay';
import { Order } from "../models/Order.js";
import asyncHandler from '../utils/asyncHandler.js';
import ApiResponse from '../utils/ApiResponse.js';
import { google } from 'googleapis';
import { createGoogleMeetEvent } from '../utils/googleCalendar.js';
import Apierror from '../utils/Apierror.js';
const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_SECRET_KEY,
});

const createorder = asyncHandler(async (req, res) => {
    const { amount, currency } = req.body;
    const order = await razorpay.orders.create({ amount, currency });

    await Order.create({
        userId: req.user._id,
        amount,
        currency,
        paymentStatus: 'created',
        orderId: order.id,
    });

    return res.status(200).json(new ApiResponse(200, { order }));
});

const webhook = asyncHandler(async (req, res) => {
    const { event, payload } = req.body;
    if (event === 'payment.captured') {
        const order = await Order.findOne({ orderId: payload.payment.entity.order_id });
        if (order) {
            order.paymentStatus = 'captured';
            await order.save();
        }
        console.log(order)
    }

    return res.status(200).json(new ApiResponse(200, null, "Webhook Received Successfully"));
});

const success = asyncHandler(async (req, res) => {
const { paymentId, mentorEmail, studentEmail, meetingTitle, meetingDescription, startTime, endTime } = req.body;

  const payment = await razorpay.payments.fetch(paymentId);
  if (payment.status === 'captured') {
    const oauth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      `${process.env.BASE_URL}/api/v1/auth/callback`
    );
    oauth2Client.setCredentials(/* fetch from database or session */);

    const event = await createGoogleMeetEvent(oauth2Client, meetingTitle, meetingDescription, startTime, endTime, [mentorEmail, studentEmail]);
    const meetLink = event.hangoutLink;

    res.status(200).json(new ApiResponse(200,{ meetLink }));
  } else {
    res.status(400).json(new Apierror , 'Payment not captured' );
  }
});

export { createorder, webhook,success };
