import { BooksData } from "../data/booksData";
import { Response } from "express";
import { HttpException } from "../services/exeception";

export class BooksBusiness {
    private booksData: BooksData;

    constructor() {
        this.booksData = new BooksData();
    }

    buscarLivros = async (res: Response, titulo?: string, autor?: string, genero?: string, dataPublicacao?: Date) => {
        try {
            let livros;
            if (!titulo && !autor && !genero && !dataPublicacao) {
                livros = await this.booksData.buscarTodosLivros(res);
            } else {
                livros = await this.booksData.buscarLivros(res, titulo, autor, genero, dataPublicacao);
            }

            return livros;
        }
        catch (e: any) {
            HttpException(res, 500, "Não foi possivel buscar os livros");
            throw new Error();

        }
    }
}
