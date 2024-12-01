import { Request, Response } from "express";
import { UserBusiness } from "../business/userBusiness";
import { InternalServerErrorException } from "../services/exeception";

export class UserController {
    private userBusiness: UserBusiness;

    constructor() {
        this.userBusiness = new UserBusiness();
    }

    cadastro = async (req: Request, res: Response) => {
        try {
            const { username, email, senha, telefone, cpf } = req.body;

            this.userBusiness.cadastro(
                res,
                username,
                email,
                senha,
                telefone,
                cpf
            ).then((token) => res.status(201).json({ message: "Usuário criado com sucesso", token }));

        } catch (error: any) {
            InternalServerErrorException(res, "Não foi possível realizar o cadastro")
        }
    };

    login = async (req: Request, res: Response) => {
        try {
            const { email, password } = req.body;
            this.userBusiness.login(res, email, password)
                .then((token) => res.status(200).json({ message: "Login feito com sucesso", token }));

        } catch (error: any) {
            console.log(error)
            InternalServerErrorException(res, "Não foi possível realizar login");
        }
    };

    atualizarSenha = async (req: Request, res: Response) => {
        try {
            const token = req.headers.authorization;
            const { newPassword } = req.body;
            this.userBusiness.atualizarSenha(res, token as string, newPassword)
                .then( ()=> res.status(200).json({message: "Senha atualizada com sucesso"}));
        } catch (error: any) {
            InternalServerErrorException(res, "Não foi possível realizar a atualização de senha");
        }
    };

    atualizarDados = async (req: Request, res: Response) => {
        try {
            const token = req.headers.authorization;
            const { newUsername, newEmail, newTelefone } = req.body;
            this.userBusiness.atualizarDados(res, token as string, newUsername, newEmail, newTelefone)
            .then( ()=> res.status(200).json({message: "Dados atualizados com sucesso"}));


        } catch (error: any) {
            InternalServerErrorException(res, "Não foi possível realizar a atualização de dados");
        }
    }

    deletarUsuario = async (req: Request, res: Response) => {
        try {
            const token = req.headers.authorization;
            this.userBusiness.deletarUsuario(res, token as string).then(()=> res.status(204).send())
        } catch (error: any) {
            InternalServerErrorException(res, "Não foi possível realizar a exclusão do usuário");
        }
    }
}
