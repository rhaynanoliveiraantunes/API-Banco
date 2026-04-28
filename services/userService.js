import User from "../models/user.js";

const createUser = async (data) => {
  const { name, email, cpf, phone, password, age } = data;

  if (!name || !email || !cpf || !password || age === undefined) {
    const error = new Error("Nome, email, cpf, telefone, senha e idade são obrigatórios");
    error.statusCode = 400;
    throw error;
  }

  const userExists = await User.findOne({ email });
  if (userExists) {
    const error = new Error("Já existe um usuário com esse email");
    error.statusCode = 400;
    throw error;
  }

  const cpfExists = await User.findOne({ cpf });
  if (cpfExists) {
    const error = new Error("Já existe um usuário com esse cpf");
    error.statusCode = 400;
    throw error;
  }

  return User.create({ name, email, cpf, phone, password, age });
};

const getAllUsers = async () => {
  return User.find();
};

const getIdUsers = async (id) => {
    return User.findById(id)
}



export default {
  createUser,
  getAllUsers,
  getIdUsers,
  
};