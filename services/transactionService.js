import Account from "../models/account.js";
import User from "../models/user.js";
import Transaction from "../models/transaction.js"
import account from "../models/account.js";
import transaction from "../models/transaction.js";



const getTransaction = async () => {

     return translaction = await Transaction.find()

}

const getIdTransaction = async (id) =>  {

    return transaction = await transaction.findById(id)
}


export default {

  getTransaction,
  getIdTransaction,

}
