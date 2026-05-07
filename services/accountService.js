import Account from "../models/account.js";
import User from "../models/user.js";
import Transaction from "../models/transaction.js"

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


export default {

  createAccount,
  getAllAccounts,
  getIdAccount,
  getAccountNumber,
  getBalanceAccount,
  DepositAccout,

}
