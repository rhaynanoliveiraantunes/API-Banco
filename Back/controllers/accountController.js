import accountService from "../services/accountService.js";
//import userService from "../services/accountService.js";

const createAccount = async (req, res, next) => {
    try {
        const account = await accountService.createAccount(req.body)
        res.json(account);
    } catch (error) {
        next(error);
    }
}

const getAllAccounts = async (req, res, next) => {
    try {
        const accounts = await accountService.getAllAccounts()
        res.json(accounts);
    } catch (error) {
        next(error);
    }
}

const getIdAccount = async (req, res, next) => {
    try {
        const accounts = await accountService.getIdAccount(req.params.id)
        res.json(accounts);
    } catch (error) {
        next(error);
    }
}

const getAccountNumber = async (req, res, next) => {
    try {
        const accounts = await accountService.getAccountNumber(req.params.accountNumber)
        res.json(accounts);
    } catch (error) {
        next(error);
    }
}

const getBalanceAccount = async (req, res, next) => {
    try {
        const balance = await accountService.getBalanceAccount(req.params.id)
        res.json(balance);
    } catch (error) {
        next(error);
    }
}


const DepositAccout = async (req, res, next) => {
    try {
        const { account, previousBalance, valor } = await accountService.getDepositAccout(req.params.id, req.body);

        res.json({
            message: "Depósito realizado com sucesso",
            saldoAnterior: previousBalance,
            valorDepositado: valor,
            saldoAtual: account.balance
        });
    } catch (error) {
        next(error);
    }
}

const withdraw = async (req, res, next) => {
    try {
        const whitchdrawr = await accountService.withdraw(req.params.id, req.body)
        res.json(whitchdrawr);
    } catch (error) {
        next(error);
    }
}

const transfer = async (req, res, next) => {
    try {
        const transfe = await accountService.transfer(req.body)
        res.json(transfe);
    } catch (error) {
        next(error);
    }
}

const getStatement = async (req, res, next) => {
    try {
        const statement = await accountService.getStatement(req.params.id)
        res.json(statement);
    } catch (error) {
        next(error);
    }
}

 const withdrawSimulate = async (req, res, next) => {
    try {
        const whitdraw = await accountService.mithdrawSimulate(req.params.id, req.body)
        res.json(whitdraw);
    } catch (error) {
        next(error);
    }
}

 const transferSimulate = async (req, res, next) => {
    try {
        const transfe = await accountService.transferSimulate( req.body)
        res.json(transfe);
    } catch (error) {
        next(error);
    }
}




export default {

    createAccount,
    getAllAccounts,
    getIdAccount,
    getAccountNumber,
    getBalanceAccount,
    DepositAccout,
    withdraw,
    transfer,
    getStatement,
    withdrawSimulate,
    transferSimulate,
}