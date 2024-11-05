import { Request, Response } from "express";
import { UserBusiness } from "../business/userBusiness";

const userBusiness = new UserBusiness();

export class UserController{
    cadastro = async(req: Request, res: Response) =>{
        try {
            const { username, email, senha, telefone, cpf } = req.body
            const result = await userBusiness.cadastro(
               username,
               email,
               senha,
               telefone,
               cpf
            );
            res.status(200).send(result);
         } catch (error:any) {
            res.status(401).send("Não foi possível cadastrar o usuário");
        }
    }
}