import { Request, Response } from "express";
import { BooksBusiness } from "../business/booksBusiness";
import { InternalServerErrorException } from "../services/exeception";

export class BooksController {
    private booksBusiness: BooksBusiness;

    constructor() {
        this.booksBusiness = new BooksBusiness();
    }

    buscarLivros = async (req: Request, res: Response) => {
        try {
            const { titulo, autor, genero, dataPublicacao } = req.query;
            const data = dataPublicacao ? new Date(dataPublicacao as string) : undefined;

            this.booksBusiness.buscarLivros(
                res,
                titulo as string,
                autor as string,
                genero as string,
                data,
            ).then((books)=> res.status(200).json({books}));

        } catch (error: any) {
            InternalServerErrorException(res, "Não foi possível realizar a busca dos livvros");
        }

    }

}