 import express from "express";
import adminController from "../controllers/adminController.js";
import account from "../models/account.js";
 


const router = express.Router();

router.get("/users/active", adminController.getActiveUsers);
router.get("/users/inactive", adminController.getInactiveUsers);
router.get("account/active", adminController.getActiveAccounts);
router.get("account/inactive", adminController.getActiveAccounts);
router.patch("/users/:id/deactivate", adminController.patchDeactivateUser);
router.patch("/users/:id/activate", adminController.patchActivateUser);
router.patch("/account/:id/block", adminController.blockAccount);
router.patch("/account/:id/unblock", adminController.unblockAccount);
router.patch("/account/:id/close", adminController.closeAccount);
router.post("/account/:id/mhonthly-fee", adminController.chargeMonthly);
router.post("/transactions/:id/refund", adminController.transactionRefund);
router.get("/reports/general", adminController.generalReports);
router.get("/accounts/negative-balance", adminController.getNegativeBalanceAccounts)
router.get("/accounts/top-balances/:limit", adminController.getTopBalances)

export default router;