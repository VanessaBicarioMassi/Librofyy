import express from "express";
import { RentsController } from "../controller/rentsController";

export const rentsRouter = express.Router();

const rentsController = new RentsController();

rentsRouter.post("/realizarEmprestimo/:id", rentsController.realizarEmprestimo);
rentsRouter.get("/buscarLivrosDoUsuario", rentsController.buscarLivrosDoUsuario);
rentsRouter.get("/buscarEmprestimos", rentsController.buscarEmprestimos);
rentsRouter.delete("/cancelarEmprestimo/:id", rentsController.cancelarEmprestimo);
