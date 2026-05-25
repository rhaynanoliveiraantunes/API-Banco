import express from "express";
import adminController from "../controllers/adminController.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import adminMiddleware from "../middlewares/adminMiddleware.js";

const router = express.Router();

router.get("/users/active", authMiddleware, adminMiddleware, adminController.getActiveUsers);
router.get("/users/inactive", authMiddleware, adminMiddleware, adminController.getInactiveUsers);
router.get("/account/active", authMiddleware, adminMiddleware, adminController.getActiveAccounts);
router.get("/account/inactive", authMiddleware, adminMiddleware, adminController.getInactiveAccounts);
router.patch("/users/:id/deactivate", authMiddleware, adminMiddleware, adminController.patchDeactivateUser);
router.patch("/users/:id/activate", authMiddleware, adminMiddleware, adminController.patchActivateUser);
router.patch("/account/:id/block", authMiddleware, adminMiddleware, adminController.blockAccount);
router.patch("/account/:id/unblock", authMiddleware, adminMiddleware, adminController.unblockAccount);
router.patch("/account/:id/close", authMiddleware, adminMiddleware, adminController.closeAccount);
router.post("/account/:id/monthly-fee", authMiddleware, adminMiddleware, adminController.chargeMonthly);
router.post("/transactions/:id/refund", authMiddleware, adminMiddleware, adminController.transactionRefund);
router.get("/reports/general", authMiddleware, adminMiddleware, adminController.generalReports);
router.get("/accounts/negative-balance", authMiddleware, adminMiddleware, adminController.getNegativeBalanceAccounts);
router.get("/accounts/top-balances/:limit", authMiddleware, adminMiddleware, adminController.getTopBalances);

export default router;