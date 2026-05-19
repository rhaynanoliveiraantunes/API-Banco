import Transaction from "../models/transaction.js";
import Account from "../models/account.js";
import User from "../models/user.js"
import transaction from "../models/transaction.js";

 const getActiveUsers = async () => {

      return await User.find( { active: true})

 }

  const getInactiveUsers = async () => {

      return await User.find( { active: false})

 }

 const patchActivateUser = async (userId) => {

     const user = await User.findById(userId)
    
     if(!user){

    const error = new Error("Não existe um usuario com esse id");
    error.statusCode = 400;
    throw error;

     }

     const activateUser = await User.findByIdAndUpdate(
        userId,
        {
            activated: true,
        }
     )

     return {
        message: "Usuario ativado com sucesso"
     }

 }      

  const patchDeactivateUser = async (userId) => {
    const user = await User.findById(userId);
 
    if (!user) {
        const error = new Error("Não existe um usuario com esse id");
        error.statusCode = 400;
        throw error;
    }
 
    const accounts = await Account.find({ userId });
 
    const hasPositiveBalance = accounts.some((account) => account.balance > 0);
 
    if (hasPositiveBalance) {
        const error = new Error("Não é possível desativar usuário com saldo positivo");
        error.statusCode = 400;
        throw error;
    }
 
    await User.findByIdAndUpdate(userId, { active: false });
 
    return {
        message: "Usuario desativado com sucesso"
    };
};

  const getActiveAccounts = async () => {

    return await Account.find({ active: true})
  }

  const getInactiveAccounts = async () => {

    return await Account.find({ active: true})
  }

  const blockeAccount = async (accountId) => {
 
   const account = await Account.findById(accountId);

   if(!account){

    const error = new Error("Não existe uma conta com esse id");
        error.statusCode = 400;
        throw error;

   } 

   if(account.blocked){

    const error = new Error("A conta ja esta bloqueada");
        error.statusCode = 400;
        throw error;

   } 

   const newBlockedAccount = await Account.findByIdAndUpdate(
    accountId,
    {
        blocked: true
    }
   )

   return {
    message: "conta bloquada com sucesso"
   }

  }

  const unblockAccount = async (accountId) => {
    const account = await Account.findById(accountId);

    if (!account) {
        const error = new Error("Não existe uma conta com esse id");
        error.statusCode = 400;
        throw error;
    }

    if (!account.blocked) {
        const error = new Error("A conta ja esta desbloqueada");
        error.statusCode = 400;
        throw error;
    }

    await Account.findByIdAndUpdate(
        accountId,
         { 
            blocked: false 
         });

    return {
        message: "Conta desbloqueada com sucesso"
    };
};

const closeAccount = async (accountId) => {

  const account = await Account.findById(accountId)

  if (!account) {
        const error = new Error("Não existe uma conta com esse id");
        error.statusCode = 400;
        throw error;
    }

    if (account.balance !== 0) {
        const error = new Error("O saldo da conta precisa ser 0 para ser encerrada");
        error.statusCode = 400;
        throw error;
    }

    const offAccount = await Account.findByIdAndUpdate(

        accountId,
        {
            active: false
        }
    )

    return {
        message: "Conta encerrada com sucesso"
    }

}

const chargeMonthly = async (accountId, data) => {
    const account = await Account.findById(accountId);

    const { value, description } = data;

    if (!account) {
        const error = new Error("Não existe uma conta com esse id");
        error.statusCode = 400;
        throw error;
    }

    if (!account.active) {
        const error = new Error("A conta precisa estar ativa");
        error.statusCode = 400;
        throw error;
    }

    if (value <= 0) {
        const error = new Error("O valor precisa ser maior que 0");
        error.statusCode = 400;
        throw error;
    }

    if (value > account.balance + account.limit) {
        const error = new Error("Saldo insuficiente para cobrar a taxa");
        error.statusCode = 400;
        throw error;
    }

    let newAccountBalance;

    if (value <= account.balance) {
        newAccountBalance = await Account.findByIdAndUpdate(
            accountId,
            { balance: account.balance - value },
            { new: true }
        );
    } else {
        const newValue = value - account.balance;

        newAccountBalance = await Account.findByIdAndUpdate(
            accountId,
            { balance: 0, limit: account.limit - newValue },
            { new: true }
        );
    }

    return newAccountBalance;
};

 const transactionRefund = async (transactionId) => {
    const transaction = await Transaction.findById(transactionId);

    if (!transaction) {
        const error = new Error("Não existe uma transaçao com esse id");
        error.statusCode = 400;
        throw error;
    }

      if (transaction.status !== "completed") {
        const error = new Error("A transaçao nao pode estar cancelada nem ter falhado");
        error.statusCode = 400;
        throw error;
    }

       if (transaction.type !== "deposit" && transaction.type !== "withdraw" && transaction.type !== "fee") {
        const error = new Error("So e possivel dar refund em transaçoes do tipo deposito, saque e taxa");
        error.statusCode = 400;
        throw error;
    }


  const newEstorno = await Transaction.create({
        accountId: transaction.accountId,
        type: "reversal",
        status: "completed",
        amount: transaction.amount,
        previousBalance: transaction.currentBalance,
        currentBalance: transaction.previousBalance,
    });


    await Account.findByIdAndUpdate(
        transaction.accountId,
        { balance: transaction.previousBalance },
        { new: true }
    );


    return newEstorno;
};

  const generalReports = async () => {
    const [


        totalUsers,
        totalActiveUsers,
        totalInactiveUsers,
        totalAccounts,
        totalActiveAccounts,
        totalBlockedAccounts,
        totalTransactions,
        accounts,


    ] = await Promise.all([

        User.countDocuments(),
        User.countDocuments({ active: true }),
        User.countDocuments({ active: false }),
        Account.countDocuments(),
        Account.countDocuments({ active: true }),
        Account.countDocuments({ blocked: true }),
        Transaction.countDocuments(),
        Account.find({}, { balance: 1 }),

    ]);

    const totalBalance = accounts.reduce((total, account) => total + account.balance, 0);

    return {
        totalUsers,
        totalActiveUsers,
        totalInactiveUsers,
        totalAccounts,
        totalActiveAccounts,
        totalBlockedAccounts,
        totalTransactions,
        totalBalance,
    };
};

const  getNegativeBalanceAccounts = async () => {
 
    
    return await Account.find({ balance: { $lte: 0}})

}

const getTopBalances = async (limit) => {

     return await Account.find().sort({ balance: -1 }).limit(Number(limit));

}
 

export default {

    getActiveUsers,
    getInactiveUsers,
    patchActivateUser,
    patchDeactivateUser,
    getActiveAccounts,
    getInactiveAccounts,
    unblockAccount,
    closeAccount,
    chargeMonthly,
    transactionRefund,
    generalReports,
    getNegativeBalanceAccounts,
    getTopBalances,

};
 
