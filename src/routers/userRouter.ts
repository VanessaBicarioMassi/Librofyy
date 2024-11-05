import express from "express";
import { UserBusiness } from "../business/userBusiness";
import {UserController} from "../controller/userController";

export const userRouter = express.Router();

const userController = new UserController()

userRouter.post("/cadastro", userController.cadastro);