import express from "express";
import transactionController from "../controllers/transactionControllers.js";
import transaction from "../models/transaction.js";


const router = express.Router();

router.get("/transaction/:id", transactionController.getTransaction);
router.get("transaction/:id", transactionController.getIdTransaction);


export default router; 
