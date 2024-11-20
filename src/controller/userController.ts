import { Request, Response } from "express";
import { UserBusiness } from "../business/userBusiness";

export class UserController {
    private userBusiness: UserBusiness;

    constructor() {
        this.userBusiness = new UserBusiness();
    }

    cadastro = async (req: Request, res: Response) => {
        try {
            const { username, email, senha, telefone, cpf } = req.body;
            const result = await this.userBusiness.cadastro(
                username,
                email,
                senha,
                telefone,
                cpf
            );
            res.send(result);
        } catch (error: any) {
            const message = error.message || "Não foi possível realizar o cadastro" 
            res.send(message);
        }
    };

    login = async (req: Request, res: Response) => {
        try {
            const { email, password } = req.body;
            const result = await this.userBusiness.login(email, password);
            res.send(result);
        } catch (error: any) {
            const message = error.message || "Não foi possível realizar o login"
            res.send(message);
        }
    };

    atualizarSenha = async (req: Request, res: Response) => {
        try {
            const token = req.headers.authorization;
            const { newPassword } = req.body;
            const result = await this.userBusiness.atualizarSenha(token as string, newPassword);
            res.send(result);
        } catch (error: any) {
            const message = error.message || "Não foi possível alterar a senha" 
            res.send(message);
        }
    };

    atualizarDados = async (req: Request, res: Response) => {
        try {
            const token = req.headers.authorization;
            const { newUsername, newEmail, newTelefone } = req.body;
            const result = await this.userBusiness.atualizarDados(token as string, newUsername, newEmail, newTelefone);
            res.send(result);

        }catch (error: any) {
            const message = error.message || "Não foi possível alterar os dados" 
            res.send(message);
        }
    }

    deletarUsuario = async (req: Request, res: Response) => {
        try {
            const token = req.headers.authorization;
            const result = await this.userBusiness.deletarUsuario(token as string);
            res.send(result);

        } catch (error: any) {
            const message = error.message || "Não foi possível deletar o usuário" 
            res.send(message);
        }
    }
}
