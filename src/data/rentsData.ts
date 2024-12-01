import db from "../services/db";
import { InternalServerErrorException } from "../services/exeception";
import { Response } from "express";

export class RentsData {

    realizarEmprestimo = async (res:Response, idRent: string, idUser: string, idLivro: string) => {
        try {
            await db("emprestimo").insert({ id: idRent, usuario_id: idUser, livro_id: idLivro });
            return;

        } catch (error: any) {
            InternalServerErrorException(res, error.sqlMessage);
        }
    }

    buscarLivrosDoUsuario = async (res:Response, id: string) => {
        try {
            const books = await db("emprestimo")
                .join("livros", "emprestimo.livro_id", "=", "livros.id")
                .where("emprestimo.usuario_id", id)
                .select(
                    "livros.id",
                    "livros.titulo",
                    "livros.genero",
                    "livros.autor",
                    "livros.sinopse",
                    "livros.data_publicacao"
                );

            return books;
        } catch (error: any) {
            InternalServerErrorException(res, error.sqlMessage);
        }

    }

    buscarEmprestimos = async (res:Response, idUser: string) => {
        try {
            const rents = await db("emprestimo").where({ usuario_id: idUser }).first();
            return rents;

        } catch (error: any) {
            InternalServerErrorException(res, error.sqlMessage);
        }
    }


    buscarEmprestimoPorID = async (res:Response, idUser: string, idRent: string) => {
        try {
            const emprestimo = await db("emprestimo").where({ id: idRent, usuario_id: idUser }).first();
            return emprestimo;

        } catch (error: any) {
            InternalServerErrorException(res, error.sqlMessage);
        }
    }

    cancelarEmprestimo = async (res:Response, idUser: string, idRent: string) => {
        try {
            await db("emprestimo").where({ id: idRent, usuario_id: idUser }).delete();

            return;
        } catch (error: any) {
            InternalServerErrorException(res, error.sqlMessage);
        }
    }
}
