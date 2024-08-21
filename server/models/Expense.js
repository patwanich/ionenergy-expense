import mongoose from "mongoose";

const expenseSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    receipts: {
      type: [String],
    },
    total: {
      type: mongoose.Types.Decimal128,
      required: true,
    },
  },
  {
    timestamps: true,
    discriminatorKey: "type",
  }
);
const Expense = mongoose.model("Expense", expenseSchema);
export default Expense;
