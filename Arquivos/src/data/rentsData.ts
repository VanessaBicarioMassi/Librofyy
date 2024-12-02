import db from "../services/db";
import { HttpException} from "../services/exeception";
import { Response } from "express";

export class RentsData {

    realizarEmprestimo = async (res: Response, idEmprestimo: string, idUsuario: string, idLivro: string) => {
        try {
            await db("emprestimo").insert({ id: idEmprestimo, usuario_id: idUsuario, livro_id: idLivro });

            return;
        } catch (error: any) {
            HttpException(res, 500, error.sqlMessage);
        }
    }

    buscarLivrosDoUsuario = async (res: Response, id: string) => {
        try {
            const livros = await db("emprestimo")
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

            return livros;
        } catch (error: any) {
            HttpException(res, 500, error.sqlMessage);
        }

    }

    buscarEmprestimos = async (res: Response, idUsuario: string) => {
        try {
            const emprestimos = await db("emprestimo").where({ usuario_id: idUsuario }).first();

            return emprestimos;
        } catch (error: any) {
            HttpException(res, 500, error.sqlMessage);
        }
    }


    buscarEmprestimoPorID = async (res: Response, idUsuario: string, idEmprestimo: string) => {
        try {
            const emprestimo = await db("emprestimo").where({ id: idEmprestimo, usuario_id: idUsuario }).first();

            return emprestimo;
        } catch (error: any) {
            HttpException(res, 500, error.sqlMessage);
        }
    }

    cancelarEmprestimo = async (res: Response, idUsuario: string, idEmprestimo: string) => {
        try {
            await db("emprestimo").where({ id: idEmprestimo, usuario_id: idUsuario }).delete();

            return;
        } catch (error: any) {
            HttpException(res, 500, error.sqlMessage);
        }
    }
}
