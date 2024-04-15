import mongoose from "mongoose";
import { customAlphabet } from "nanoid";

const nanoid = customAlphabet("abcdefghijklmnopqrstuvwxyz0123456789", 10);

export interface UserInput {
  fullName: string;
  username: string;
  email: string;
  password: string;
  verifyToken: string;
  isVerified?: boolean;
  role: string;
  permission?:object;
  gSub?:string
}

export interface UserDocument extends UserInput, mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
      unique: true,
      default: () => `user_${nanoid()}`,
    },
    fullName: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: false },
    gSub: { type: String, required: false },
    profile: {
      type: String,
      required: false,
      default:
        "data:image/jpeg;base64,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",
    },
    verifyToken: { type: String },
    isVerified: { type: Boolean, required: false, default: false },
    role: {
      type: String,
      required: true,
      enum: ["admin", "user", "super-admin"],
      default: "user",
    },
    permission:{type:Object}
  },
  {
    timestamps: true,
  }
);

const UserModel = mongoose.model<UserDocument>("User", userSchema);

export default UserModel;
