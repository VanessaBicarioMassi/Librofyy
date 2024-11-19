import express from "express";
import { RentsController } from "../controller/rentsController";

export const rentsRouter = express.Router();

const rentsController = new RentsController();

rentsRouter.post("/adicionarLivros", rentsController.adicionarLivros);
