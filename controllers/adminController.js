import adminService from "../services/adminService.js";


const getActiveUsers = async ( req, res, next) => {

     try {
        const activeUsers = await adminService.getActiveUsers();
        res.json(activeUsers)
      } catch (error) {
    
        next(error);
    
      }

}

const getInactiveUsers = async ( req, res, next) => {

     try {
        const InactiveUsers = await adminService.getInactiveUsers();
        res.json(InactiveUsers)
      } catch (error) {
    
        next(error);
    
      }

}


const     patchActivateUser = async ( req, res, next) => {

     try {
        const ActivateUser = await adminService.patchActivateUser(req.params.id);
        res.json(ActivateUser)
      } catch (error) {
    
        next(error);
    
      }

}

const patchDeactivateUser = async (req, res, next) => {
    try {
        const deactivateUser = await adminService.patchDeactivateUser(req.params.id);
        res.json(deactivateUser);
    } catch (error) {
        next(error);
    }
};

const getActiveAccounts = async (req, res, next) => {
    try {
        const activeAccounts = await adminService.getActiveAccounts();
        res.json(activeAccounts);
    } catch (error) {
        next(error);
    }
};

const getInactiveAccounts = async (req, res, next) => {
    try {
        const InactiveAccounts = await adminService.getInactiveAccounts();
        res.json(activeAccounts);
    } catch (error) {
        next(error);
    }
};

const blockAccount = async (req, res, next) => {
    try {
        const blockedAccount = await adminService.blockAccount(req.params.id);
        res.json(blockedAccount);
    } catch (error) {
        next(error);
    }
};

const unblockAccount = async (req, res, next) => {
    try {
        const unblockedAccount = await adminService.unblockAccount(req.params.id);
        res.json(unblockedAccount);
    } catch (error) {
        next(error);
    }
};

const closeAccount = async (req, res, next) => {
    try {
        const closeAccount = await adminService.closeAccount(req.params.id);
        res.json(unblockedAccount);
    } catch (error) {
        next(error);
    }
};

const chargeMonthly = async (req, res, next) => {
    try {
        const transaction = await adminService.chargeMonthly(req.params.id, req.body);
        res.json(transaction);
    } catch (error) {
        next(error);
    }
};

const transactionRefund = async (req, res, next) => {
    try {
        const transaction = await adminService.transactionRefund(req.params.id);
        res.json(transaction);
    } catch (error) {
        next(error);
    }
};

 const generalReports = async (req, res, next) => {
    try {
        const reports = await adminService.generalReports();
        res.json(reports);
    } catch (error) {
        next(error);
    }
};

 const getNegativeBalanceAccounts = async ( req, res, next) => {
    try{
        const negativeAccounts = await adminService.getNegativeBalanceAccounts()
        res.json(negativeAccounts)
    } catch ( error) {
        next(error)
    }
 }

   const getTopBalances = async ( req, res, next) => {
    try{
        const topBalances = await adminService.getTopBalances(req.params.limit)
        res.json(topBalances)
    } catch ( error) {
        next(error)
    }
 }



export default {
  
    getActiveUsers,
    getInactiveUsers,
    patchActivateUser,
    patchDeactivateUser,
    getActiveAccounts,
    getInactiveAccounts,
    blockAccount,
    unblockAccount,
    closeAccount,
    chargeMonthly,
    transactionRefund,
    generalReports,
    getNegativeBalanceAccounts,
    getTopBalances,
}