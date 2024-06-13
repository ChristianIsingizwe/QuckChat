import mongoose from "mongoose";

// The user model
export const User = mongoose.model(
  "users",
  new mongoose.Schema({
    username: {
      type: string,
      maxlength: 255,
      required: true,
    },
    email: {
      type: string,
      maxlength: 255,
      required: true,
      unique: true,
    },
    password: {
      type: string,
      minlength: 8,
      required: true,
    },
    tokenVersion: {
      type: Number,
      default: 1,
    },
  })
);
