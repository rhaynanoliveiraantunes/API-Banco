import transactionService from "../services/transactionService.js";



 const getTransaction = async (req, res, next) => {
    try {
        const transactions = await transactionsService.getTransaction()
        res.json(transactions);
    } catch (error) {
        next(error);
    }
}

  const getIdTransaction = async (req, res, next) => {
    try {
        const Idtransaction = await transactionsService.getIdTransaction(req.params.id)
        res.json(Idtransaction);
    } catch (error) {
        next(error);
    }
}


export default {
  getTransaction,
  getIdTransaction,
}