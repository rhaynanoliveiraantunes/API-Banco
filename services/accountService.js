import account from "../models/account.js";
import User from "../models/user.js"; 

const createAccount = async (data) => {
  
    const lastAccount = await account.findOne().sort({ accountNumber: -1 });
    
    const accountNumber = lastAccount ? lastAccount.accountNumber + 1 : 1;
    
    const {userId , type, limit } = data

    console.log("idUsuario:", userId);

    const userExists = await User.findById(userId);

  if (!userExists) {
    const error = new Error("Não existe um usuario com esse id");
    error.statusCode = 400;
    throw error;
  }

  if(!userExists.active){

    const error = new Error("O usuario esta inativo");
    error.statusCode = 400;
    throw error;

  }

  if(type === "poupanca" && limit > 0){

    const error = new Error("Contas poupança nao podem ter limite maior que 0");
    error.statusCode = 400;
    throw error;

  }

  if(type === "corrente" &&  userExists.age < 18){

    const error = new Error("Menores de idade Nao podem ter conta corrente");
    error.statusCode = 400;
    throw error;

  }


  const newAccount = await account.create({
    userId,
    type,
    limit,
    accountNumber,
});

    return newAccount;
}

const getAllAccounts = async () => {
  return account.find();
};

const getIdAccount = async (id) => {
  return account.findById(id);
};

const getAccountNumber = async (number) => {
  return account.findOne({number});
};

export default {

   createAccount,
   getAllAccounts,
   getIdAccount,
   getAccountNumber,

}
