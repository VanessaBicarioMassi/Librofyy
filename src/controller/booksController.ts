import { Request, Response } from "express";
import { BooksBusiness } from "../business/booksBusiness";

export class BooksController {
    private booksBusiness: BooksBusiness;

    constructor() {
        this.booksBusiness = new BooksBusiness();
    }
    
    buscarLivros = async ( req: Request, res: Response) => {
        try {
            const { titulo, autor, genero, dataPublicacao } = req.query;
            const data = dataPublicacao ? new Date(dataPublicacao as string) : undefined;

            const result = await this.booksBusiness.buscarLivros(
                titulo as string,
                autor as string,
                genero as string,
                data,
            );
            
            res.send(result);
        } catch (error: any) {
            const message = error.message || "Não foi possível realizar o cadastro";
            res.send(message);
            
        }

    }

}