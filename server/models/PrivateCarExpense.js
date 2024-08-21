import mongoose from "mongoose";
import Expense from "./Expense.js";

const PrivateCarExpenseSchema = new mongoose.Schema(
  {
    wayType: {
      type: String,
      required: true,
    },
    locationFrom: {
      type: String,
      required: true,
    },
    locationTo: {
      type: String,
      required: true,
    },
    distance: {
      type: mongoose.Types.Decimal128,
      required: true,
    },
    amount: {
      type: mongoose.Types.Decimal128,
      required: true,
    },
    expressWay: {
      type: mongoose.Types.Decimal128,
    },
    dateStart: {
      type: Date,
      required: true,
    },
    dateEnd: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
const PrivateCarExpense = Expense.discriminator("Private Car", PrivateCarExpenseSchema);
export default PrivateCarExpense;
