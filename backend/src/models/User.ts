import mongoose from "mongoose";
import { Schema } from "mongoose";

const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      default: "",
    },
    otp: {
      type: Number,
      // required: true,
    },
    socialLinks: [
      {
        platform: {
          type: String,
          // required: true,
        },
        url: {
          type: String,
          // required: true,
        },
      },
    ],
    bio: {
      type: String,
      // required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const User = mongoose.models.User || mongoose.model("User", UserSchema);
