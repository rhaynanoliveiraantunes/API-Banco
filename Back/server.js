import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import accountRoutes from "./routes/accountRoutes.js";
import transaction from "./models/transaction.js";
import transactionRoutes from "./routes/transactionRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import errorHandler from "./middlewares/errorHandler.js";
import notFound from "./middlewares/notFound.js";
import cors from "cors";

dotenv.config();


const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors())
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "API de loja de venda de carros funcionando" });
});

app.use("/account", accountRoutes);
app.use("/users", userRoutes);
app.use("/transaction",transactionRoutes);
app.use("/admin",adminRoutes);
app.use("/auth", authRoutes);
app.use(notFound);
app.use(errorHandler);


const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });
  } catch (error) {
    console.log("Erro ao iniciar o servidor:", error.message);
  }
};

startServer();
