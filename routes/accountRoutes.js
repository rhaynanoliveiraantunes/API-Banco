import express from "express";
import accontsController from "../controllers/accountController.js";
import account from "../models/account.js";
import accountController from "../controllers/accountController.js";

const router = express.Router();

router.post("/", accontsController.createAccount);
router.get("/", accontsController.getAllAccounts);
router.get("/:id", accountController.getIdAccount);
router.get("/number/:accountNumber", accontsController.getAccountNumber);
router.get("/:id/balance", accountController.getBalanceAccount);
router.post("/:id/deposit", accountController.DepositAccout);
router.post("/:id/withdraw", accountController.withdraw);


export default router; 
