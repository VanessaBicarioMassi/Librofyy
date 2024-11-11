import express from "express";
import { UserController } from "../controller/userController";

export const userRouter = express.Router();

const userController = new UserController();

userRouter.post("/cadastro", userController.cadastro);
userRouter.post("/atualizarSenha", userController.atualizarSenha);
userRouter.post("/login", userController.login);