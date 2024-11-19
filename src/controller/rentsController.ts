import { Request, Response } from "express";
import { RentsBusiness } from "../business/rentsBusiness";

export class RentsController {
    private rentsBusiness: RentsBusiness;

    constructor() {
        this.rentsBusiness = new RentsBusiness();
    }

    alugarLivros = async (req: Request, res: Response) => {
        try {
            const { idLivro } = req.params;
            const token = req.headers.authorization;
            const result = await this.rentsBusiness.alugarLivros(token as string, idLivro);
            res.send(result);
        } catch (error: any) {
            const message = error.message || "Não foi possível alugar o livro desejado" 
            res.send(message);
        }
        }
}