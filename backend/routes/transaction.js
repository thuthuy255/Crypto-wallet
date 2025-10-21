import express from "express";
import { sendTransaction, getTransactionHistory } from "../controllers/transactionController.js";

const router = express.Router();

router.post("/send", sendTransaction);
router.get("/history", getTransactionHistory);

export default router;
