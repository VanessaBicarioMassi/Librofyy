import db from "../services/db";
import { HttpException } from "../services/exeception";
import { Response } from "express";

export class BooksData {

    buscarTodosLivros = async (res: Response, page: number = 1, limit: number = 20) => {
        try {
            const offset = (page - 1) * limit;

            const livros = await db("livros").select("*").limit(limit).offset(offset);

            return livros;
        } catch (error: any) {
            HttpException(res, 500, error.sqlMessage);
        }
    };


    buscarLivros = async (res: Response, titulo?: string, autor?: string, genero?: string, dataPublicacao?: Date, page: number = 1, limit: number = 20) => {
        try {
            const offset = (page - 1) * limit;
            const query = db("livros");

            if (titulo) query.where("titulo", "like", `%${titulo}%`);
            if (autor) query.where("autor", "like", `%${autor}%`);
            if (genero) query.where("genero", "like", `%${genero}%`);
            if (dataPublicacao) query.where("dataPublicacao", dataPublicacao);

            const livros = await query.limit(limit).offset(offset);

            return livros;
        } catch (error: any) {
            HttpException(res, 500, error.sqlMessage);
        }
    };


    buscarLivroPorId = async (res: Response, id: string) => {
        try {
            const [livro] = await db('livros').where({ id });

            return livro;
        } catch (error: any) {
            HttpException(res, 500, error.sqlMessage);
        }

    }

}