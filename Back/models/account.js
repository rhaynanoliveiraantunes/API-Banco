import mongoose from "mongoose";

const AccountSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    accountNumber: {
      type: Number,
      required: true,
      unique: true,
    },
    agency: {
      type: String,
      required: true,
      default: "0001",
    },
    type: {
      type: String,
      enum: ["corrente", "poupanca"],
      required: true,
    },
    balance: {
      type: Number,
      required: true,
      default: 0,
    },
    limit: {
      type: Number,
      required: true,
      default: 0,
    },
    active: {
      type: Boolean,
      required: true,
      default: true,
    },
    blocked: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    collection: "accounts",
    timestamps: true,
  }
);

export default mongoose.model("Account", AccountSchema);
