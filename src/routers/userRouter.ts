import express from "express";
import { UserController } from "../controller/userController";

export const userRouter = express.Router();

const userController = new UserController();

userRouter.post("/cadastro", userController.cadastro);
userRouter.post("/login", userController.login);
userRouter.patch("/atualizarSenha", userController.atualizarSenha);
userRouter.put("/atualizarDados", userController.atualizarDados);
userRouter.delete("/deletarUsuario", userController.deletarUsuario);