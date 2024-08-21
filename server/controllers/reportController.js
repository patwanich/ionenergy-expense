import Report from "../models/Report.js";
import PrivateCarExpense from "../models/PrivateCarExpense.js";

const createReport = async (req, res) => {
  try {
    const { type, status, expenses, submittedAt, userId } = req.body;
    const report = new Report({
      type: type,
      status: status,
      expenses: expenses,
      submittedAt: new Date(submittedAt),
      userId: userId,
    });
    const savedReport = await report.save();

    if (savedReport) {
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
    }

    res.status(201).json(savedReport);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to submit report" });
  }
};

const getReport = async (req, res) => {
  try {
    const { reportId } = req.params;
    const report = await Report.findOne({
      _id: reportId,
    });
    console.log(report);

    res.status(200).json(report);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

const getAllReports = async (req, res) => {
  try {
    const { userId } = req.params;
    const reports = await Report.find({
      userId: userId,
    });
    console.log(reports);

    res.status(200).json(reports);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to get all reports" });
  }
};

export { createReport, getAllReports, getReport };
