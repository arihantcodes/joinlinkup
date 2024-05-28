import ApiError from "../utils/ApiError";
import AsyncHandler from "../utils/AsyncHandler";
import jwt from "jsonwebtoken"
import {User} from "../models/User"

export const VerifyJwt = AsyncHandler(async(req,res,next)=>{
    try {
        const token =
      req.cookies?.AccessToken ||
      req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      throw new ApiError(401, "Unauthorized request");
    }

    const decodeToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET || "") as jwt.JwtPayload;

    const user = await User.findById(decodeToken?._id).select(
      "-password -RefreshToken"
    );

    if (!user) {
      throw new ApiError(400, "Invalid accesss ");
    }

    req.user = user;
    next();
    } catch (error:any) {
        throw new ApiError(404,error.message ||"Invalid Access Token")
    }
})