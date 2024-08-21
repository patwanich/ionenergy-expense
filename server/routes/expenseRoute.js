import express from "express";
import upload from "../middlewares/upload.js";
import * as expenseController from "../controllers/expenseController.js";

const router = express.Router();

router.post("/", upload.array("receipts"), expenseController.createExpense);
router.get("/:expenseId", expenseController.getExpenseById);
router.get(
  "/:userId/:expenseType/expenses",
  expenseController.getUserExpensesByType
);
router.get("/:userId/total", expenseController.getExpensesTotal);

export default router;
