import mongoose from "mongoose";

const usersSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Please enter a valid email"],
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minLength: 8,
    },
    role: {
      type: String,
      enum: ["admin", "confirmer", "businessman"],
      required: true,
    },
  },
  { timestamps: true },
);

const usersModel = mongoose.model("usersRegister", usersSchema);
export default usersModel;
