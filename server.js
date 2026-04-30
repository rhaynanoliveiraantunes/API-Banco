import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import accountRoutes from "./routes/accountRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "API de loja de venda de carros funcionando" });
});

app.use("/account", accountRoutes)
app.use("/users", userRoutes);

app.use((error, req, res, next) => {
  res.status(error.statusCode || 500).json({
    message: error.message
  });
});


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