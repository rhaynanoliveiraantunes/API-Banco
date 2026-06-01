import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.js";

const register = async (data) => {
    const { name, email, password, cpf, phone, age } = data;

    if (!name || !email || !password || !cpf || !phone || !age) {
        const error = new Error("Nome, email, senha, cpf, telefone e idade são obrigatórios");
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

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
        name,
        email,
        password: hashedPassword,
        cpf,
        phone,
        age,
        role: "user",
        active: true,
    });

    return {
        _id: user._id,
        name: user.name,
        email: user.email,
        cpf: user.cpf,
        phone: user.phone,
        age: user.age,
        role: user.role,
    };
};

const login = async (data) => {
    const { email, password } = data;

    if (!email || !password) {
        const error = new Error("Email e senha são obrigatórios");
        error.statusCode = 400;
        throw error;
    }

    const user = await User.findOne({ email }).select("+password");
    if (!user) {
        const error = new Error("Email ou senha inválidos");
        error.statusCode = 401;
        throw error;
    }

    if (!user.active) {
        const error = new Error("Usuário inativo. Entre em contato com a administração");
        error.statusCode = 403;
        throw error;
    }

    const passwordIsCorrect = await bcrypt.compare(password, user.password);
    if (!passwordIsCorrect) {
        const error = new Error("Email ou senha inválidos");
        error.statusCode = 401;
        throw error;
    }

    const token = jwt.sign(
        { id: user._id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN || "1d" }
    );

    return {
        user: {
            _id: user._id,
            name: user.name,
            email: user.email,
            cpf: user.cpf,
            phone: user.phone,
            age: user.age,
            role: user.role,
        },
        token,
    };
};

export default { register, login };