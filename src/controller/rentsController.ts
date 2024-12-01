import { Request, Response } from "express";
import { RentsBusiness } from "../business/rentsBusiness";

export class RentsController {
    private rentsBusiness: RentsBusiness;

    constructor() {
        this.rentsBusiness = new RentsBusiness();
    }

    realizarEmprestimo = async (req: Request, res: Response) => {

        const idLivro = req.params.id;
        const token = req.headers.authorization;

        this.rentsBusiness.realizarEmprestimo(res, token as string, idLivro as string)
            .then(() => res.status(200).send({ message: "Emprestimo realizado com sucesso" }))
            .catch((e) => console.log(`${new Date()} - ${e.message}`))
    }

    buscarLivrosDoUsuario = async (req: Request, res: Response) => {

        const token = req.headers.authorization;

        this.rentsBusiness.buscarLivrosDoUsuario(res, token as string)
            .then((books) => res.status(200).send({ message: "Busca realizada com sucesso", books }))
            .catch((e) => console.log(`${new Date()} - ${e.message}`))
    }

    buscarEmprestimos = async (req: Request, res: Response) => {

        const token = req.headers.authorization;

        this.rentsBusiness.buscarEmprestimos(res, token as string)
            .then((rents) => res.status(200).send({ message: "Busca realizada com sucesso", rents }))
            .catch((e) => console.log(`${new Date()} - ${e.message}`))
    }

    cancelarEmprestimo = async (req: Request, res: Response) => {

        const token = req.headers.authorization;
        const idRent = req.params.id;

        await this.rentsBusiness.cancelarEmprestimo(res, token as string, idRent)
            .then(() => res.status(204).send())
            .catch((e) => console.log(`${new Date()} - ${e.message}`))
    }
}