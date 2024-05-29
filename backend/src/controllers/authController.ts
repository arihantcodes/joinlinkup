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

const loginUser = AsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    if (!email) {
      throw new ApiError(400, "Email is required");
    }
    if (!password) {
      throw new ApiError(400, "Password is required");
    }
    const user = await User.findOne({
      email,
    });
    if (!user) {
      throw new ApiError(400, "User Not Found");
    }

    const isPassword = await user.isPasswordCorrect(password);

    if (!isPassword) {
      throw new ApiError(400, "Invalid Password");
    }
    const { AccessToken, RefreshToken } =
      await generateAccessTokenandRefreshToken(user._id);

    const LogUser = await User.findById(user._id).select(
      "-password -RefreshToken"
    );

    const options = {
      httpOnly: true,
      secure: true,
    };
    return res
      .status(200)
      .cookie("AccessToken", AccessToken, options)
      .cookie("RefreshToken", RefreshToken, options)
      .json(
        new ApiResponse(
          200,
          { user: LogUser, AccessToken, RefreshToken },
          "User Logged In Successfully"
        )
      );
  }
);

const onboarding = AsyncHandler(async(req: Request, res: Response, next: NextFunction) => {
  const { bio, fullname } = req.body;
  const avatarlocal = req.files?.avatar?.[0]?.path;

  if (!fullname) {
    throw new ApiError(400, "Fullname is required");
  }
  if (!bio) {
    throw new ApiError(400, "Bio is required");
  }
  if (!avatarlocal) {
    throw new ApiError(400, "Please Upload an Image");
  }

  const avatar = await uploadonCloudnary(avatarlocal);
  if (!avatar) {
    throw new ApiError(400, "Avatar file upload failed");
  }

  const updatedUser = await User.findByIdAndUpdate(
    req.user._id,
    {
      fullname,
      bio,
      avatar
    },
    { new: true }
  );

  if (!updatedUser) {
    throw new ApiError(404, "User not found");
  }

  return res
  .status(200)
  .json(new ApiResponse(200, updatedUser, "User Onboarded Successfully"));
})






const logout = AsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  await User.findByIdAndUpdate(
    req.user._id!,
    {
      $unset: {
        RefreshToken: 1,
      },
    },
    {
      new: true,
    }
  );

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .clearCookie("AccessToken", options)
    .clearCookie("RefreshToken", options)
    .json(new ApiResponse(200, {}, "User logged Out"));
});
export { registerUser,loginUser,onboarding,logout };
