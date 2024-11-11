import { Request, Response } from "express";
import { UserBusiness } from "../business/userBusiness";

export class UserController{
    userBusiness = new UserBusiness();
    cadastro = async(req: Request, res: Response) =>{
        try {
            const { username, email, senha, telefone, cpf, role } = req.body
            const result = await this.userBusiness.cadastro(
               username,
               email,
               senha,
               telefone,
               cpf,
               role
            );
            res.send(result);
         } catch (error:any) {
            res.status(500).send("Não foi possível cadastrar o usuário"); 
        }
    }
    login = async (req: Request, res: Response) => {
        try {
            const { email, password } = req.body;
            const result = this.userBusiness.login(email, password);
            res.send(result);
        } catch (error: any) {
            res.status(500).send("Não foi possível realizar o login"); 
        }
    }
}