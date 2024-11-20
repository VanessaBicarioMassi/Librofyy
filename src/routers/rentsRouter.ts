import express from "express";
import { RentsController } from "../controller/rentsController";

export const rentsRouter = express.Router();

const rentsController = new RentsController();

rentsRouter.post("/alugarLivros", rentsController.alugarLivros);
rentsRouter.get("/buscarLivrosDoUsuario", rentsController.buscarLivrosDoUsuario);
rentsRouter.delete("/deletarEmprestimo", rentsController.cancelarEmprestimo);
