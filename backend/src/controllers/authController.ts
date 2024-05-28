import AsyncHandler from "../utils/AsyncHandler";
import ApiError from "../utils/ApiError";
import { User } from "../models/User";
import uploadonCloudnary from "../utils/Cloudinary";
import ApiResponse from "../utils/ApiResponse";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import { Request, Response, NextFunction } from "express";

type Usertoken = {
  UserId: string;
};

const generateAccessTokenandRefreshToken = async (userId: Usertoken) => {
  try {
    const user = await User.findById(userId);
    const AccessToken = user.generateAccessToken();
    const RefreshToken = user.generateRefreshToken();

    user.RefreshToken = RefreshToken;
    await user.save({ validateBeforeSave: false });

    return { AccessToken, RefreshToken };
  } catch (error) {
    throw new ApiError(500, "Something Went Wrong While generating Token");
  }
};

const registerUser = AsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { username, email, password } = req.body;

    if (!username) {
      throw new ApiError(400, "username is required");
    }
    if (!email) {
      throw new ApiError(400, "email is required");
    }
    if (!password) {
      throw new ApiError(400, "password is required");
    }

    const Exitsuser = await User.findOne({
      $or: [{ username }, { email }],
    });

    if (Exitsuser) {
      throw new ApiError(400, "User Already Exists");
    }

    const user = await User.create({
      username: username.toLowerCase(),
      email,
      password,
    });

    const registerUser = await User.findById(user._id).select(
      "-password -RefreshToken"
    );

    if (!registerUser) {
      throw new ApiError(500, "Error in Registering User");
    }

    return res
      .status(201)
      .json(new ApiResponse(201, registerUser, "User Registered Successfully"));
  }
);

export { registerUser };
