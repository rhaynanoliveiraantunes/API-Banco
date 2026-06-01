import transactionService from "../services/transactionService.js";
 
const getTransaction = async (req, res, next) => {
    try {
        const transactions = await transactionService.getTransaction();
        res.json(transactions);
    } catch (error) {
        next(error);
    }
};
 
const getIdTransaction = async (req, res, next) => {
    try {
        const idTransaction = await transactionService.getIdTransaction(req.params.id);
        res.json(idTransaction);
    } catch (error) {
        next(error);
    }
};
 
const getTypeTransactions = async (req, res, next) => {
    try {
        const typeTransaction = await transactionService.getTypeTransactions(req.params.type);
        res.json(typeTransaction);
    } catch (error) {
        next(error);
    }
};
 
const getPriceRange = async (req, res, next) => {
    try {
        const transactions = await transactionService.getPriceRange(req.params.min, req.params.max);
        res.json(transactions);
    } catch (error) {
        next(error);
    }
};
 
const getYearRange = async (req, res, next) => {
    try {
        const transactions = await transactionService.getYearRange(req.params.year);
        res.json(transactions);
    } catch (error) {
        next(error);
    }
};
 
export default {
    getTransaction,
    getIdTransaction,
    getTypeTransactions,
    getPriceRange,
    getYearRange,
};