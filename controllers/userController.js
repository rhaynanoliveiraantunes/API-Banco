import userService from "../services/userService.js";

const createUser = async (req, res, next) => {
  try {
    const user = await userService.createUser(req.body);
    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
};

const getAllUsers = async (req, res, next) => {
  try {
    const users = await userService.getAllUsers();
    res.json(users);
  } catch (error) {
    next(error);
  }
};

const getIdUsers = async (req, res, next) => {
  try{
    const user = await userService.getIdUsers(req.params.id);
    res.json(user)
  }catch(error){

    next(error);

  }
};

export default {
    createUser,
    getAllUsers,
    getIdUsers,
}