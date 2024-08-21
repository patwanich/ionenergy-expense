import express from "express";
import * as reportController from "../controllers/reportController.js";
import verifyToken from "../middlewares/verifyToken.js";

const router = express.Router();

router.post("/", verifyToken, reportController.createReport);
router.get("/:reportId", verifyToken, reportController.getReport);
router.get("/:userId/reports", verifyToken, reportController.getAllReports);

export default router;
