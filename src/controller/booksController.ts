import { Request, Response } from "express";
import { BooksBusiness } from "../business/booksBusiness";

export class BooksController {
    private booksBusiness: BooksBusiness;

    constructor() {
        this.booksBusiness = new BooksBusiness();
    }

    buscarLivros = async (req: Request, res: Response) => {

        const { titulo, autor, genero, dataPublicacao } = req.query;
        const data = dataPublicacao ? new Date(dataPublicacao as string) : undefined;

        this.booksBusiness.buscarLivros(
            res,
            titulo as string,
            autor as string,
            genero as string,
            data,
        ).then((livros) => res.status(200).send({ livros }))
            .catch((e) => console.log(`${new Date()} - ${e.message}`))
    }
}