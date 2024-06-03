import Router from 'express';

import { verifyJWT } from '../middleware/auth.js';
import { webhook,createorder } from '../controllers/razorpay.js';

const paymentRouter = Router();


paymentRouter.route('/createorder').post(verifyJWT, createorder);
paymentRouter.route('/webhook').post(webhook);


export default paymentRouter;