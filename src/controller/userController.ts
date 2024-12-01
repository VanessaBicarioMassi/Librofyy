import { Request, Response } from "express";
import { UserBusiness } from "../business/userBusiness";

export class UserController {
    private userBusiness: UserBusiness;

    constructor() {
        this.userBusiness = new UserBusiness();
    }

    cadastro = async (req: Request, res: Response) => {
        const { username, email, senha, telefone, cpf } = req.body;

        // const token = await this.userBusiness.cadastro(
        //     res,
        //     username,
        //     email,
        //     senha,
        //     telefone,
        //     cpf
        // )

        // if (token) {
        //     res.status(201).send({message: "Email criado com sucesso", token })
        // }

        this.userBusiness.cadastro(
            res,
            username,
            email,
            senha,
            telefone,
            cpf
        )
            .then((token) => res.status(201).send({ message: "Cadastro realizado com sucesso", token }))
            .catch((e) => console.log(`${new Date()} - ${e.message}`))
    };

    login = async (req: Request, res: Response) => {

        const { email, senha } = req.body;

        this.userBusiness.login(res, email, senha)

            .then((token) => res.status(200).send({ message: "Login realizado com sucesso", token }))
            .catch((e) => console.log(`${new Date()} - ${e.message}`))
    };

    atualizarSenha = async (req: Request, res: Response) => {

        const token = req.headers.authorization;
        const { novaSenha } = req.body;

        this.userBusiness.atualizarSenha(res, token as string, novaSenha)
            .then(() => res.status(200).send({ message: "Senha atualizada com sucesso" }))
            .catch((e) => console.log(`${new Date()} - ${e.message}`))
    };

    atualizarDados = async (req: Request, res: Response) => {

        const token = req.headers.authorization;
        const { novoUsername, novoEmail, novoTelefone } = req.body;

        this.userBusiness.atualizarDados(res, token as string, novoUsername, novoEmail, novoTelefone)
            .then(() => res.status(200).send({ message: "Dados atualizados com sucesso" }))
            .catch((e) => console.log(`${new Date()} - ${e.message}`))


    }

    deletarUsuario = async (req: Request, res: Response) => {

        const token = req.headers.authorization;

        this.userBusiness.deletarUsuario(res, token as string)
            .then(() => res.status(204).send())
            .catch((e) => console.log(`${new Date()} - ${e.message}`))
    }
}
