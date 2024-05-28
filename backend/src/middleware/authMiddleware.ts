import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import ApiError from "../utils/ApiError";
import AsyncHandler from "../utils/AsyncHandler";
import { User } from "../models/User";

interface CustomRequest extends Request {
  user?: any; // Ideally, you should define a proper user type based on your User model
}

export const VerifyJwt = AsyncHandler(async (req: CustomRequest, res: Response, next: NextFunction) => {
  const token = req.cookies?.AccessToken || req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return next(new ApiError(401, "Unauthorized request"));
  }

  try {
    const secret = process.env.ACCESS_TOKEN_SECRET;
    if (!secret) {
      throw new ApiError(500, "Missing token secret");
    }

    const decodedToken = jwt.verify(token, secret) as jwt.JwtPayload;

    const user = await User.findById(decodedToken._id).select("-password -RefreshToken");

    if (!user) {
      return next(new ApiError(400, "Invalid access"));
    }

    req.user = user;
    next();
  } catch (error: any) {
    next(new ApiError(401, error.message || "Invalid Access Token"));
  }
});
