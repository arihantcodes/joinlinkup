import mongoose, { Schema } from "mongoose";

const OrderSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    currency: {
      type: String,
      required: true,
    },
    paymentStatus: {
      type: String,
      enum: ["created", "captured", "failed"],
      default: "created",
    },
    orderId: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Order = mongoose.model("Order", OrderSchema);
