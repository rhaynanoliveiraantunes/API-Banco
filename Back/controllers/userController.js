import userService from "../services/userService.js";

const getMe = async (req, res, next) => {
  try {
    res.status(200).json(req.user);
  } catch (error) {
    next(error);
  }
};

const updateMe = async (req, res, next) => {
  try {
    const user = await userService.updateMe(req.user._id, req.body);
    res.json(user);
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
  try {
    const user = await userService.getIdUsers(req.params.id);
    res.json(user);
  } catch (error) {
    next(error);
  }
};

const updateUser = async (req, res, next) => {
  try {
    const newUser = await userService.updateUser(req.params.id, req.body);
    res.json(newUser);
  } catch (error) {
    next(error);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const user = await userService.deleteUser(req.params.id);
    res.json(user);
  } catch (error) {
    next(error);
  }
};

const getcpfUsers = async (req, res, next) => {
  try {
    const user = await userService.getcpfUsers(req.params.cpf);
    res.json(user);
  } catch (error) {
    next(error);
  }
};

const getEmailUsers = async (req, res, next) => {
  try {
    const user = await userService.getEmailUsers(req.params.email);
    res.json(user);
  } catch (error) {
    next(error);
  }
};

export default {
  getMe,
  updateMe,
  getAllUsers,
  getIdUsers,
  updateUser,
  deleteUser,
  getcpfUsers,
  getEmailUsers,
};