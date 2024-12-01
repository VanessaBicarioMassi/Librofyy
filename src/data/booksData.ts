import db from "../services/db";
import { InternalServerErrorException } from "../services/exeception";
import { Response } from "express";

export class BooksData {

    buscarTodosLivros = async (res: Response, page: number = 1, limit: number = 20) => {
        try {
            const offset = (page - 1) * limit;

            const books = await db("livros").select("*").limit(limit).offset(offset);
            return books;

        } catch (error: any) {
            InternalServerErrorException(res, error.sqlMessage);
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
            const result = await query.limit(limit).offset(offset);
            return result;

        } catch (error: any) {
            InternalServerErrorException(res, error.sqlMessage);
        }
    };


    buscarLivroPorId = async (res: Response, id: string) => {
        try {
            const [livro] = await db('livros').where({ id });
            return livro;
        } catch (error: any) {
            InternalServerErrorException(res, error.sqlMessage);
        }

    }

}