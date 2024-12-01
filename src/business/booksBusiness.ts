import { BooksData } from "../data/booksData";
import { Response } from "express";

export class BooksBusiness {
    private booksData: BooksData;

    constructor() {
        this.booksData = new BooksData();
    }

    buscarLivros = async (res: Response, titulo?: string, autor?: string, genero?: string, dataPublicacao?: Date) => {

        let books;
        if (!titulo && !autor && !genero && !dataPublicacao) {
            books = await this.booksData.buscarTodosLivros(res);
        } else {
            books = await this.booksData.buscarLivros(res, titulo, autor, genero, dataPublicacao);
        }

        return books;
    }
}
