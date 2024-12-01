import db from "../services/db";
import { InternalServerErrorException } from "../services/exeception";
import { Response } from "express";

export class UserData {

    cadastroUsuario = async (res: Response, id: string, username: string, email: string, senha: string, telefone: string, cpf: string, cargo: string) => {
        try {
            await db("usuarios").insert({
                id,
                username,
                email,
                senha,
                telefone,
                cpf,
                cargo
            });

            return { message: "Usuário cadastrado com sucesso" };
        } catch (error: any) {
            InternalServerErrorException(res, error.sqlMessage)
        }
    }

    buscarUsuarioPorEmail = async (res: Response, email: string) => {
        try {
            const [user] = await db('usuarios').where({ email });
            return user;
        } catch (error: any) {
            InternalServerErrorException(res, error.sqlMessage);
        }
    }

    buscarUsuarioPorId = async (res: Response, id: string) => {
        try {
            const [user] = await db('usuarios').where({ id });
            return user;
        } catch (error: any) {
            InternalServerErrorException(res, error.sqlMessage);
        }
    }

    verificarCPF = async (res: Response, cpf: string) => {
        try {
            const [user] = await db('usuarios').where({ cpf });
            return user;
        } catch (error: any) {
            InternalServerErrorException(res, error.sqlMessage);
        }
    }

    alterarSenha = async (res:Response, id: string, newPassword: string) => {
        try {
            await db('usuarios').where({ id }).update({ senha: newPassword });
            return;
        } catch (error: any) {
            InternalServerErrorException(res, error.sqlMessage);
        }
    }

    alterarDados = async (res:Response, id: string, newUsername: string, newEmail: string, newTelefone: string) => {
        try {
            await db('usuarios').where({ id }).update({ username: newUsername, email: newEmail, telefone: newTelefone })
            return;
        } catch (error: any) {
            InternalServerErrorException(res, error.sqlMessage);
        }
    }

    deletarUsuario = async (res: Response, id: string) => {
        try {
            await db('usuarios').where({ id }).delete();
            return;

        } catch (error: any) {
            InternalServerErrorException(res, error.sqlMessage);
        }
    }
}