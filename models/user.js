import mongoose from "mongoose";
const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    cpf: {
      type: Number,
      required: true,
      unique: true,
      
    },
    phone: {
      type: String,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    active: {
      type: Boolean,
      default: true
  },
  },
  {
    collection: "users",
    timestamps: true,
  }
);

const User = mongoose.model("User", UserSchema);

export default User;