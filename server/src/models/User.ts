import mongoose from "mongoose";

interface IUserSchema {
  username: string;
  email: string;
  password: string;
  picture: string;
  savedCodes: Array<mongoose.Types.ObjectId>;
}

const UserSchema = new mongoose.Schema<IUserSchema>(
  {
    username: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    picture: {
      type: String,
      default: "https://vectorified.com/images/default-user-icon-33.jpg",
    },
    savedCodes: [{ type: mongoose.Schema.Types.ObjectId }],
  },
  { timestamps: true }
);

export const User = mongoose.model("User", UserSchema);
