import Transaction from "../models/transaction.js";
 
const getTransaction = async () => {
    return await Transaction.find().sort({ createdAt: -1 });
};
 
const getIdTransaction = async (id) => {
    return await Transaction.findById(id);
};
 
const getTypeTransactions = async (type) => {
    return await Transaction.find({ type: type });
};
 
const getPriceRange = async (min, max) => {
    if (typeof min !== "number" || typeof max !== "number") {
        const error = new Error("O minimo e o maximo precisam ser numeros");
        error.statusCode = 400;
        throw error;
    }
 
    if (min > max) {
        const error = new Error("minimo nao pode ser maior que o maximo");
        error.statusCode = 400;
        throw error;
    }
 
    return await Transaction.find({ amount: { $gte: min, $lte: max } });
};
 
const getYearRange = async (year) => {
    const beginningOfTheYear = new Date(year, 0, 1).getTime();
    const endOfTheYear = new Date(year, 11, 31).getTime();
 
    return await Transaction.find({
        createdAt: { $gte: beginningOfTheYear, $lte: endOfTheYear },
    });
};
 
export default {
    getTransaction,
    getIdTransaction,
    getTypeTransactions,
    getPriceRange,
    getYearRange,
};