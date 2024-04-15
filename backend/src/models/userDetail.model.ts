import mongoose from "mongoose";
import { customAlphabet } from "nanoid";
import { UserDocument } from "./user.model";

const nanoid = customAlphabet("abcdefghijklmnopqrstuvwxyz0123456789", 10);

export interface UserDetailInput {
  profileImage: string;
  backgroundImage: string;

  phone1: string;
  phone2: string;
  phone3: string;

  quote: string;
  education: string;
  address: string;

  email1: string;
  email2: string;

  businessLink1: string;
  businessLink2: string;
  businessLink3: string;
  businessLink4: string;

  whatsapp: string;
  viber: string;

  facebook: string;
  instagram: string;
  x: string;
  youtube: string;
  linkedin: string;

  organizationImage: string;
  organizationName: string;
  position: string;

  user: UserDocument["_id"];
}

export interface UserDetailDocument extends UserDetailInput, mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
}

const userDetailSchema = new mongoose.Schema(
  {
    userDetailId: {
      type: String,
      required: true,
      unique: true,
      default: () => `user_detail_${nanoid()}`,
    },
    profileImage: { type: String },
    backgroundImage: { type: String },

    phone1: { type: String },
    phone2: { type: String },
    phone3: { type: String },

    quote: { type: String },
    education: { type: String },
    address: { type: String },

    email1: { type: String },
    email2: { type: String },

    businessLink1: { type: String },
    businessLink2: { type: String },
    businessLink3: { type: String },
    businessLink4: { type: String },

    whatsapp: { type: String },
    viber: { type: String },

    facebook: { type: String },
    instagram: { type: String },
    x: { type: String },
    youtube: { type: String },
    linkedin: { type: String },

    organizationImage: { type: String },
    organizationName: { type: String },
    position: { type: String },

    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  {
    timestamps: true,
  }
);

const UserDetailModel = mongoose.model<UserDetailDocument>("UserDetail", userDetailSchema);

export default UserDetailModel;
