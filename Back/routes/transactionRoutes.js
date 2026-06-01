import express from "express";
import transactionController from "../controllers/transactionControllers.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import adminMiddleware from "../middlewares/adminMiddleware.js";

const router = express.Router();

router.get("/", authMiddleware, adminMiddleware, transactionController.getTransaction);
router.get("/type/:type", authMiddleware, adminMiddleware, transactionController.getTypeTransactions);
router.get("/value/:min/:max", authMiddleware, adminMiddleware, transactionController.getPriceRange);
router.get("/value/transactions/year/:year", authMiddleware, adminMiddleware, transactionController.getYearRange);
router.get("/:id", authMiddleware, adminMiddleware, transactionController.getIdTransaction);

export default router;