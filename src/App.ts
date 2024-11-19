import express from "express";
import cors from "cors";
import { userRouter } from "./routers/userRouter";
import { booksRouter } from "./routers/booksRouter";
import db from "./services/db";

export const app = express();

app.use(express.json());
app.use(cors());

app.use("/users", userRouter);
app.use("/books", booksRouter);
app.use("/rents", rentsRouter);


app.listen(3003, () => {
    console.log("Servidor está rodando na porta 3003");
  });

  db.raw('SELECT 1')
  .then(() => {
    console.log('Conectado ao banco de dados com sucesso!');
  })
  .catch((err) => {
    console.error('Erro ao conectar ao banco de dados:', err);
  });
  