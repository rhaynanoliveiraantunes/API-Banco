import express from "express";
import transactionController from "../controllers/transactionControllers.js";
 
const router = express.Router();
 
router.get("/", transactionController.getTransaction);
router.get("/type/:type", transactionController.getTypeTransactions);
router.get("/value/:min/:max", transactionController.getPriceRange);
router.get("/value/transactions/year/:year", transactionController.getYearRange);
router.get("/:id", transactionController.getIdTransaction);
 
export default router;