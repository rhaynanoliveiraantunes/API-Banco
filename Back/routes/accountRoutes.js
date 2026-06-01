import express from "express";
import accountController from "../controllers/accountController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, accountController.createAccount);
router.get("/", authMiddleware, accountController.getAllAccounts);
router.get("/:id", authMiddleware, accountController.getIdAccount);
router.get("/number/:accountNumber", authMiddleware, accountController.getAccountNumber);
router.get("/:id/balance", authMiddleware, accountController.getBalanceAccount);
router.post("/:id/deposit", authMiddleware, accountController.DepositAccout);
router.post("/:id/withdraw", authMiddleware, accountController.withdraw);
router.post("/transfer", authMiddleware, accountController.transfer);
router.get("/:id/statement", authMiddleware, accountController.getStatement);
router.post("/:id/whitdraw/simulate", authMiddleware, accountController.withdrawSimulate);
router.post("/transfer/simulate", authMiddleware, accountController.transferSimulate);

export default router;