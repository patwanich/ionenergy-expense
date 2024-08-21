import PrivateCarExpense from "../models/PrivateCarExpense.js";
import Expense from "../models/Expense.js";
import * as s3Client from "../utilities/s3Client.js";

const createExpense = async (req, res) => {
  try {
    const { amount, expressWay } = req.body;

    const total = parseFloat(amount) + (parseFloat(expressWay) || 0);
    const receiptFileNames = [];

    if (req.files.length > 0) {
      const receipts = req.files;
      for (const receipt of receipts) {
        receiptFileNames.push(crypto.randomUUID());
      }

      for (let i = 0; i < req.files.length; i++) {
        await s3Client.putObject(
          receiptFileNames[i],
          req.files[i].buffer,
          req.files[i].mimetype
        );
      }
    }
    const privateCarExpense = new PrivateCarExpense({
      ...req.body,
      total: total,
      receipts: receiptFileNames,
    });
    const savedExpense = await privateCarExpense.save();

    res.status(200).json({ savedExpense });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to create expense" });
  }
};

const getExpenseById = async (req, res) => {
  try {
    const { expenseId } = req.params;

    const expense = await PrivateCarExpense.findOne({
      _id: expenseId,
    }).lean();

    if (!expense) {
      return res.status(404).json({ message: "Expense not found" });
    }

    const receiptUrls = [];
    for (const key of expense.receipts) {
      const url = await s3Client.getObject(key);
      receiptUrls.push(url);
    }
    res.status(200).json({ ...expense, receiptUrls: receiptUrls });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to get expense" });
  }
};

const getUserExpensesByType = async (req, res) => {
  try {
    console.log("test");

    const { userId, expenseType } = req.params;
    let expenses;
    console.log(expenseType);

    switch (expenseType) {
      case "privatecar":
        expenses = await Expense.find({
          userId: userId,
          type: "Private Car",
        });
        break;

      default:
        break;
    }

    res.status(200).json({ expenses });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to get expenses" });
  }
};

const deleteExpenses = async () => {
  try {
    const { expenses } = req.body;

    const expenseIds = expenses.map((expense) => {
      return expense._id;
    });
    switch (type) {
      case "privatecar":
        await PrivateCarExpense.deleteMany({
          _id: {
            $in: expenseIds,
          },
        });
        break;
    }
    res.status(200).end();
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to delete expenses" });
  }
};

const getExpensesTotal = async (req, res) => {
  try {
    const { userId } = req.params;
    const expenses = await Expense.find({
      type: "Private Car",
    });

    let privateCarTotal = 0;
    if (expenses) {
      privateCarTotal = expenses.reduce((accumulator, expense) => {
        return accumulator + parseFloat(expense.total.toString());
      }, privateCarTotal);
    }
    res
      .status(200)
      .json({
        privatecar: privateCarTotal,
        grab: 0,
        food: 0,
        phone: 0,
        medical: 0,
        other: 0,
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to get expenses total" });
  }
};

export {
  createExpense,
  getExpenseById,
  getUserExpensesByType,
  getExpensesTotal,
};
