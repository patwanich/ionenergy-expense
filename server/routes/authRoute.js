import * as authController from "../controllers/authController.js";
import express from "express";

const router = express.Router();

router.post("/signin", authController.signIn);

export default router;
