import Account from "../models/account.js";
import User from "../models/user.js";
import Transaction from "../models/transaction.js"
import account from "../models/account.js";

const createAccount = async (data) => {

  const lastAccount = await Account.findOne().sort({ accountNumber: -1 });

  const accountNumber = lastAccount ? lastAccount.accountNumber + 1 : 1;

  const { userId, type, limit } = data

  console.log("idUsuario:", userId);

  const userExists = await User.findById(userId);

  if (!userExists) {
    const error = new Error("Não existe um usuario com esse id");
    error.statusCode = 400;
    throw error;
  }

  if (!userExists.active) {

    const error = new Error("O usuario esta inativo");
    error.statusCode = 400;
    throw error;

  }

  if (type === "poupanca" && limit > 0) {

    const error = new Error("Contas poupança nao podem ter limite maior que 0");
    error.statusCode = 400;
    throw error;

  }

  if (type === "corrente" && userExists.age < 18) {

    const error = new Error("Menores de idade Nao podem ter conta corrente");
    error.statusCode = 400;
    throw error;

  }


  const newAccount = await Account.create({
    userId,
    type,
    limit,
    accountNumber,
  });

  return newAccount;
}

const getAllAccounts = async () => {
  return Account.find();
};

const getIdAccount = async (id) => {
  return Account.findById(id);
};

const getAccountNumber = async (number) => {
  return Account.findOne({ accountNumber: number });
};

const getBalanceAccount = async (id) => {
  const account = await Account.findById(id);
  const availableBalance = account.balance + account.limit
  return { balance: account.balance, limit: account.limit, availableBalance };
};

const DepositAccout = async (id, data) => {
  const account = await Account.findById(id);
  const { valor, description } = data;

  if (!account) {
      const error = new Error("Conta não encontrada");
      error.statusCode = 400;
      throw error;
  }

  if (valor <= 0) {
      const error = new Error("O valor do deposito precisa ser maior que 0");
      error.statusCode = 400;
      throw error;
  }

  if (!account.active) {
      const error = new Error("A conta esta inativa");
      error.statusCode = 400;
      throw error;
  }

  const previousBalance = account.balance;

  account.balance += valor;
  await account.save();

  await Transaction.create({
      accountId: id,
      type: "deposit",
      amount: valor,
      description,
      previousBalance,
      currentBalance: account.balance,
      status: "completed"
  });

  return { account, previousBalance, valor };
}

const withdraw = async (id, data) => {

 const { value, description} = data;

 const account = await Account.findById(id)

 
  if (!account) {
    const error = new Error("Não existe um usuario com esse id");
    error.statusCode = 400;
    throw error;
  }

  if (!account.active) {

    const error = new Error("A conta esta inativa");
    error.statusCode = 400;
    throw error;

  }

  if (account.blocked) {
      const error = new Error("A conta esta bloqueada");
      error.statusCode = 400;
      throw error;
  }



  if ( value <= 0){

   const error = new Error("O valor de saque precisa ser maior que 0")
   error.statusCode = 400;
   throw error;

  }

   if( account.type === "poupanca"){


   

    if (account.balance < value) { 
    const error = new Error("Saldo insuficiente");
    error.statusCode = 400;
    throw error;
  }

     const beforeBalance = account.balance;

   
  const updatedAccount = await Account.findByIdAndUpdate( 
    id,
    { $inc: { balance: -value } }, 
    { new: true, runValidators: true }
  );

    return {
    
    saldo: beforeBalance,
    saque: value,
    novo_Saldo: updatedAccount.balance


  };

}else {


    if (account.balance + account.limit < value) { 
    const error = new Error("Saldo insuficiente");
    error.statusCode = 400;
    throw error;
  }

  const beforeBalance = account.balance;
   
  const updatedAccount = await Account.findByIdAndUpdate( 
    id,
    { $inc: { balance: -value } }, 
    { new: true, runValidators: true }
  );

  return {
    
    saldo: beforeBalance,
    limite: account.limit,
    disponivel: account.limit + beforeBalance,
    saque: value,
    novo_Saldo: updatedAccount.balance


  };

}



}

const transfer = async (data) => {

   const {fromAccountId, toAccountId, value, description} = data;

   const fromAccount = await Account.findById(fromAccountId);
   const toAccount = await Account.findById(toAccountId);

    if (!fromAccount) {
      const error = new Error("Conta origem não encontrada");
      error.statusCode = 400;
      throw error;
  }

   if (!toAccount) {
      const error = new Error("Conta destino não encontrada");
      error.statusCode = 400;
      throw error;
  }

    if (!fromAccount.active) {
      const error = new Error("A conta origem esta inativa");
      error.statusCode = 400;
      throw error;
  }

      if (fromAccount.blocked) {
      const error = new Error("A conta origem esta bloqueada");
      error.statusCode = 400;
      throw error;
  }

  if (toAccount.blocked) {
      const error = new Error("A conta destino esta bloqueada");
      error.statusCode = 400;
      throw error;
  }

  if ( value <= 0){

   const error = new Error("O valor da transferencia precisa ser maior que 0")
   error.statusCode = 400;
   throw error;

  }

  if ( fromAccountId === toAccountId){

   const error = new Error("Não e possivel fazer transferencia para a mesma conta")
   error.statusCode = 400;
   throw error;

  }

  if ( fromAccount.balance < value){

   const error = new Error("A conta origem nao tem saldo suficiente")
   error.statusCode = 400;
   throw error;

  }

  const newFromAccount = await account.findByIdAndUpdate(

    fromAccountId,
    { $inc: {balance: -value}},
    { new: true, runValidators: true }
  )

   const newFromAccount = await account.findByIdAndUpdate(

    fromAccountId,
    { $inc: {balance: -value}},
    { new: true, runValidators: true }
  )

    const newtoAccount = await account.findByIdAndUpdate(

    toAccountId,
    { $inc: {balance: +value}},
    { new: true, runValidators: true }
  )

 

}

export default {

  createAccount,
  getAllAccounts,
  getIdAccount,
  getAccountNumber,
  getBalanceAccount,
  DepositAccout,
  withdraw,

}
