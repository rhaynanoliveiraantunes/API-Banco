import mongoose from "mongoose";

const TransactionSchema = new mongoose.Schema(
  {
    accountId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Account",
      required: true,
    },
    targetAccountId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Account",
      default: null,
    },
    type: {
      type: String,
      enum: ["deposit", "withdraw", "transfer_sent", "transfer_received", "reversal", "fee"],
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    previousBalance: {
      type: Number,
      required: true,
    },
    currentBalance: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      trim: true,
    },
    status: {
      type: String,
      enum: ["completed", "cancelled", "failed"],
      required: true,
      default: "completed",
    },
  },
  {
    collection: "transactions",
    timestamps: true,
  }
);

export default mongoose.model("Transaction", TransactionSchema);