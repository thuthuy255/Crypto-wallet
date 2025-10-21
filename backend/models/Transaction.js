import mongoose from "mongoose";

const TransactionSchema = new mongoose.Schema(
  {
    from: { type: String, required: true },
    to: { type: String, required: true },
    amount: { type: Number, required: true },
    txHash: { type: String, required: true },
    status: { type: String, default: "pending" }, // pending / confirmed / failed
  },
  { timestamps: true }
);

const Transaction = mongoose.model("Transaction", TransactionSchema);

export default Transaction;  // <--- phải là export default
