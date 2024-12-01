import db from "../services/db";
import { Response } from "express";
import { HttpException } from "../services/exeception";

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

            return;
        } catch (error: any) {
            HttpException(res, 500, error.sqlMessage);
        }
    }

    buscarUsuarioPorEmail = async (res: Response, email: string) => {
        try {
            const [usuario] = await db('usuarios').where({ email });

            return usuario;
        } catch (error: any) {
            HttpException(res, 500, error.sqlMessage);
        }
    }

    buscarUsuarioPorId = async (res: Response, id: string) => {
        try {
            const [usuario] = await db('usuarios').where({ id });

            return usuario;
        } catch (error: any) {
            HttpException(res, 500, error.sqlMessage);
        }
    }

    verificarCPF = async (res: Response, cpf: string) => {
        try {
            const [usuario] = await db('usuarios').where({ cpf });

            return usuario;
        } catch (error: any) {
            HttpException(res, 500, error.sqlMessage);
        }
    }

    alterarSenha = async (res: Response, id: string, novaSenha: string) => {
        try {
            await db('usuarios').where({ id }).update({ senha: novaSenha });

            return;
        } catch (error: any) {
            HttpException(res, 500, error.sqlMessage);
        }
    }

    alterarDados = async (res: Response, id: string, novoUsername: string, novoEmail: string, novoTelefone: string) => {
        try {
            await db('usuarios').where({ id }).update({ username: novoUsername, email: novoEmail, telefone: novoTelefone })

            return;
        } catch (error: any) {
            HttpException(res, 500, error.sqlMessage);
        }
    }

    deletarUsuario = async (res: Response, id: string) => {
        try {
            await db('usuarios').where({ id }).delete();

            return;
        } catch (error: any) {
            HttpException(res, 500, error.sqlMessage);
        }
    }
}