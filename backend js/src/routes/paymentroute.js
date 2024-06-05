import Router from 'express';

import { verifyJWT } from '../middleware/auth.js';
import { webhook,createorder, success } from '../controllers/razorpay.js';

const paymentRouter = Router();


paymentRouter.route('/createorder').post(verifyJWT, createorder);
paymentRouter.route('/webhook').post(webhook);
paymentRouter.route('/success').post(success);


export default paymentRouter;