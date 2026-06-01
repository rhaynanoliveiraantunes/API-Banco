import User from "../models/user.js";

const getMe = async (id) => {
  return User.findById(id);
};

const updateMe = async (id, data) => {
  delete data.role;
  delete data.active;
  delete data.password;

  if (data.email) {
    const emailExists = await User.findOne({ email: data.email, _id: { $ne: id } });
    if (emailExists) {
      const error = new Error("Já existe um usuário com esse email");
      error.statusCode = 400;
      throw error;
    }
  }

  if (data.cpf) {
    const cpfExists = await User.findOne({ cpf: data.cpf, _id: { $ne: id } });
    if (cpfExists) {
      const error = new Error("Já existe um usuário com esse cpf");
      error.statusCode = 400;
      throw error;
    }
  }

  return User.findByIdAndUpdate(id, data, { new: true, runValidators: true });
};

const getAllUsers = async () => {
  return User.find();
};

const getIdUsers = async (id) => {
  return User.findById(id);
};

const updateUser = async (id, data) => {
  const { name, email, cpf, password, age } = data;

  if (!name || !email || !cpf || !password || age === undefined) {
    const error = new Error("Nome, email, cpf, telefone, senha e idade são obrigatórios");
    error.statusCode = 400;
    throw error;
  }

  if (email) {
    const emailExists = await User.findOne({ email, _id: { $ne: id } });
    if (emailExists) {
      const error = new Error("Já existe um usuário com esse email");
      error.statusCode = 400;
      throw error;
    }
  }

  if (cpf) {
    const cpfExists = await User.findOne({ cpf, _id: { $ne: id } });
    if (cpfExists) {
      const error = new Error("Já existe um usuário com esse cpf");
      error.statusCode = 400;
      throw error;
    }
  }

  return User.findByIdAndUpdate(id, data, { new: true, runValidators: true });
};

const deleteUser = async (id) => {
  const user = await User.findByIdAndDelete(id);

  if (!user) {
    const error = new Error("Usuário não encontrado");
    error.statusCode = 404;
    throw error;
  }

  return user;
};

const getcpfUsers = async (cpf) => {
  return User.findOne({ cpf });
};

const getEmailUsers = async (email) => {
  return User.findOne({ email });
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