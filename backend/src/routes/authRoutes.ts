import { Router } from "express";
import { upload } from "../middleware/multer";
import { VerifyJwt } from "../middleware/authMiddleware";
import { registerUser ,loginUser} from "../controllers/authController";


const userrouter = Router();

userrouter.route("/signin").post(registerUser);
userrouter.route("/signup").post(loginUser);


export default userrouter