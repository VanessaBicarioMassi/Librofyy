import { Request, Response } from "express";
import { BooksData } from "../data/booksData";

export class BooksBusiness {
    private booksData: BooksData;

    constructor() {
        this.booksData = new BooksData();
    }

    buscarLivros = async ( titulo: string, autor: string, genero: string, dataPublicacao: Date ) => {
        try {
            let books;
            if (!titulo && !autor && !genero && !dataPublicacao ) {
                 books = await this.booksData.buscarTodosLivros();
            }else{
                 books = await this.booksData.buscarLivros(titulo, autor, genero, dataPublicacao);
            }

            return books

        } catch (error: any) {
            throw new Error(error.message || "Erro ao buscar livros");
        }

    }
}