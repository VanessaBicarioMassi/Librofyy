import { generateId } from "../services/idGenerator";
import { UserData } from "../data/userData";
import { generateToken, payload, verifyToken } from "../services/token";
import { userRole } from "../types/user";
import { isCpfValid } from "../services/validateCpf";
import { isPhoneValid } from "../services/validatePhone";
import { hash, compare } from "../services/hashManager"
import {  HttpException } from "../services/exeception";
import { Response } from "express";
import { CustomError } from "../services/errors";

export class UserBusiness {
    private userData: UserData;

    constructor() {
        this.userData = new UserData();
    }

    cadastro = async (res: Response, username: string, email: string, senha: string, telefone: string, cpf: string) => {
        try {
            if (!username || !email || !senha || !telefone || !cpf) {
                throw new CustomError(400, "Campos faltantes.");
            }
            if (email.indexOf("@") === -1 || email.indexOf("@") === 0) {
                throw new CustomError(400, "Email inválido.");
            }
            if (senha.length < 8) {
                throw new CustomError(400, "Senha inválida.");
            }

            if (!isCpfValid(cpf)) {
                throw new CustomError(400, "CPF inválido.");
            }

            if (!isPhoneValid(telefone)) {
                throw new CustomError(400, "Telefone inválido.");
            }

            const verificarEmail = await this.userData.buscarUsuarioPorEmail(res, email);
            if (verificarEmail) {
                throw new CustomError(409, "Email já está em uso.");
            }

            const verificarCPF = await this.userData.verificarCPF(res, cpf);
            if (verificarCPF) {
                throw new CustomError(409, "CPF já está em uso.");
            }

            const senhaCriptografada = await hash(senha);
            const id = generateId();
            const cargo = "USER";

            await this.userData.cadastroUsuario(res, id as string, username, email, senhaCriptografada, telefone, cpf, cargo);

            const payload: payload = {
                id: id,
                role: cargo as userRole
            };

            return await generateToken(payload)
        } catch ({ statusCode, message }: any) {
            HttpException(res, statusCode, message);
            throw new Error(`Não foi possível cadastrar usuário.\nMotivo: ${message}`);
        }

    };


    login = async (res: Response, email: string, senha: string) => {
        try {

            if (!email || !senha) {
                throw new CustomError(400, "Campos faltantes.");
            }
            const usuario = await this.userData.buscarUsuarioPorEmail(res, email);

            const verificarSenha = await compare(senha, usuario.senha);

            if (!usuario.email) {
                throw new CustomError(400, "Email inválido.");
            }
            if (!verificarSenha) {
                throw new CustomError(400, "Senha inválida.");
            }

            const payload: payload = {
                id: usuario.id,
                role: usuario.cargo
            }

            const token = await generateToken(payload);

            return token;
        } catch ({ statusCode, message }: any) {
            HttpException(res, statusCode, message);
            throw new Error(`Não foi possível concluir o login.\nMotivo: ${message}`)
        }
    };

    atualizarSenha = async (res: Response, token: string, novaSenha: string) => {
        try {
            if (!token || !novaSenha) {
                throw new CustomError(400, "Campos faltantes.");
            }

            if (novaSenha.length < 8) {
                throw new CustomError(400, "Senha inválida.");
            }

            const payload = verifyToken(token);
            if (!payload) {
                throw new CustomError(400, "Token faltante.");
            }

            const usuario = await this.userData.buscarUsuarioPorId(res, payload.id);
            if (!usuario) {
                throw new CustomError(409, "Usuário inexistente.");
            }

            await this.userData.alterarSenha(res, usuario.id, novaSenha);

            return;
        } catch ({ statusCode, message }: any) {
            HttpException(res, statusCode, message);
            throw new Error(`Não foi possível alterar a senha.\nMotivo: ${message}`);

        }
    };

    atualizarDados = async (res: Response, token: string, novoUsername: string, novoEmail: string, novoTelefone: string) => {
        try {
            if (!token || !novoUsername || !novoEmail || !novoTelefone) {
                throw new CustomError(400, "Campos faltantes.");
            }
            if (novoEmail.indexOf("@") === -1 || novoEmail.indexOf("@") === 0) {
                throw new CustomError(400, "Email inválido.");
            }
            if (!isPhoneValid(novoTelefone)) {
                throw new CustomError(400, "Telefone inválido.");
            }

            const verificarEmail = await this.userData.buscarUsuarioPorEmail(res, novoEmail);
            if (verificarEmail) {
                throw new CustomError(409, "Email já está em uso.");
            }
            const payload = verifyToken(token);
            if (!payload) {
                throw new CustomError(400, "Token inválido ou inexistente.");
            }

            const usuario = await this.userData.buscarUsuarioPorId(res, payload.id);
            if (!usuario) {
                throw new CustomError(409, "Usuário inexistente.");
            }

            await this.userData.alterarDados(res, usuario.id, novoUsername, novoEmail, novoTelefone);

            return;
        } catch ({ statusCode, message }: any) {
            HttpException(res, statusCode, message);
            throw new Error(`Não foi possível atualizar dados do usuário.\nMotivo: ${message}`);

        }
    }

    deletarUsuario = async (res: Response, token: string) => {
        try {
            if (!token) {
                throw new CustomError(400, "Token faltante.");
            }

            const payload = verifyToken(token);
            if (!payload) {
                throw new CustomError(400, "Token inválido ou inexistente.");
            }

            const usuario = await this.userData.buscarUsuarioPorId(res, payload.id);

            if (!usuario) {
                throw new CustomError(409, "Usuário inexistente.");
            }

            await this.userData.deletarUsuario(res, usuario.id)

            return;
        } catch ({ statusCode, message }: any) {
            HttpException(res, statusCode, message);
            throw new Error(`Não foi possível excluir o usuário.\nMotivo: ${message}`);

        }
    }
}


