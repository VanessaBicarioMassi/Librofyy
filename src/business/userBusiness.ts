import { generateId } from "../services/idGenerator";
import { UserData } from "../data/userData";
import { generateToken, payload, verifyToken } from "../services/token";
import { userRole } from "../types/user";
import { isCpfValid } from "../services/validateCpf";
import { isPhoneValid } from "../services/validatePhone";
import { hash, compare } from "../services/hashManager"
import { BadRequestException, UnprocessableEntityException, ConflictException } from "../services/exeception";
import { Response } from "express";


export class UserBusiness {
    private userData: UserData;

    constructor() {
        this.userData = new UserData();
    }

    cadastro = async (res: Response, username: string, email: string, senha: string, telefone: string, cpf: string) => {
        if (!username || !email || !senha || !telefone || !cpf) {
            return BadRequestException(res, "Campos faltantes");
        }

        if (email.indexOf("@") === -1 || email.indexOf("@") === 0) {
            return BadRequestException(res, "Email inválido");
        }

        if (senha.length < 8) {
            return BadRequestException(res, "Senha inválida");
        }

        if (!isCpfValid(cpf)) {
            return BadRequestException(res, "CPF inválido");
        }

        if (!isPhoneValid(telefone)) {
            return BadRequestException(res, "Número de telefone inválido");
        }

        const verificarEmail = await this.userData.buscarUsuarioPorEmail(res, email);
        if (verificarEmail) {
            return ConflictException(res, "Email já está em uso.");
        }

        const verificarCPF = await this.userData.verificarCPF(res, cpf);
        if (verificarCPF) {
            return ConflictException(res, "CPF já está em uso.");
        }

        const senhaCriptografada = await hash(senha);
        const id = generateId();
        const cargo = "USER";

        await this.userData.cadastroUsuario(res, id as string, username, email, senhaCriptografada, telefone, cpf, cargo);

        const payload: payload = {
            id: id,
            role: cargo as userRole
        };

        const token = await generateToken(payload);

        return token
    };


    login = async (res: Response, email: string, password: string) => {
        if (!email || !password) {
            BadRequestException(res, "Campos faltantes");
        }

        const user = await this.userData.buscarUsuarioPorEmail(res, email) as any;
        const verificarSenha = await compare(password, user.senha);

        if (!user || !verificarSenha) {
            BadRequestException(res, "Credenciais inválidas");
        }

        const payload: payload = {
            id: user.id,
            role: user.cargo
        }

        const token = await generateToken(payload);

        return token;
    };

    atualizarSenha = async (res: Response, token: string, newPassword: string) => {
        if (!token || !newPassword) {
            BadRequestException(res, "Campos faltantes");
        }

        const payload = verifyToken(token);
        if (!payload) {
            BadRequestException(res, "Token inválido ou expirado");
        }

        const user = await this.userData.buscarUsuarioPorId(res, payload.id);
        if (!user) {
            UnprocessableEntityException(res, "Usuário inexistente");
        }

        await this.userData.alterarSenha(res, user.id, newPassword);

        return;
    };

    atualizarDados = async (res: Response, token: string, newUsername: string, newEmail: string, newTelefone: string) => {
        if (!token || !newUsername || !newEmail || !newTelefone) {
            BadRequestException(res, "Campos faltantes");
        }

        const payload = verifyToken(token);
        if (!payload) {
            BadRequestException(res, "Token inválido ou expirado");
        }

        const user = await this.userData.buscarUsuarioPorId(res, payload.id);
        if (!user) {
            UnprocessableEntityException(res, "Usuário inexistente");
        }

        await this.userData.alterarDados(res, user.id, newUsername, newEmail, newTelefone);

        return;
    }

    deletarUsuario = async (res: Response, token: string) => {
        if (!token) {
            BadRequestException(res, "Token faltante");
        }

        const payload = verifyToken(token);
        if (!payload) {
            BadRequestException(res, "Token inválido ou expirado");
        }

        const user = await this.userData.buscarUsuarioPorId(res, payload.id);

        if (!user) {
            UnprocessableEntityException(res, "Usuário inexistente");
        }

        await this.userData.deletarUsuario(res, user.id)

        return;
    }
}


