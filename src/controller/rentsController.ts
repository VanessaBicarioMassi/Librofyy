import { Request, Response } from "express";
import { RentsBusiness } from "../business/rentsBusiness";
import { InternalServerErrorException } from "../services/exeception";

export class RentsController {
    private rentsBusiness: RentsBusiness;

    constructor() {
        this.rentsBusiness = new RentsBusiness();
    }

    realizarEmprestimo = async (req: Request, res: Response) => {
        try {
            const idLivro = req.params.id;
            const token = req.headers.authorization;

            this.rentsBusiness.realizarEmprestimo(res, token as string, idLivro as string)
            .then(() => res.status(201).json({message:"Empréstimo realizado com sucesso"}));

        } catch (error: any) {
            InternalServerErrorException(res, "Não foi possível realizar o empréstimo");
        }
    }

    buscarLivrosDoUsuario = async (req: Request, res: Response) => {
        try {
            const token = req.headers.authorization;

            this.rentsBusiness.buscarLivrosDoUsuario(res, token as string)
            .then((books)=> res.status(200).json({books}));
        } catch (error: any) {
            InternalServerErrorException(res, "Não foi possível realizar a busca dos livros");
        }
    }

    buscarEmprestimos = async (req: Request, res: Response) => {
        try {
            const token = req.headers.authorization;
            this.rentsBusiness.buscarEmprestimos(res, token as string)
            .then((rents)=> res.status(200).json({rents}));

        } catch (error: any) {
            InternalServerErrorException(res, "Não foi possível realizar a busca do empréstimo");
        }
    }

    cancelarEmprestimo = async (req: Request, res: Response) => {
        try {
            const token = req.headers.authorization;
            const idRent = req.params.id;
            const result = await this.rentsBusiness.cancelarEmprestimo(res, token as string, idRent)
            .then(()=> res.status(204).send());
        } catch (error: any) {
            InternalServerErrorException(res, "Não foi possível realizar o cancelamento do empréstimo");
        }
    }
}