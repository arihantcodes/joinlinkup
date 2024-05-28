import { Router } from "express";
import { upload } from "../middleware/multer";
import { VerifyJwt } from "../middleware/authMiddleware";
import { registerUser } from "../controllers/authController";


const userrouter = Router();

userrouter.route("/signin").post(registerUser);


export default userrouter