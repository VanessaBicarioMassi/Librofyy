import { Request, Response } from "express";
import { RentsBusiness } from "../business/rentsBusiness";

export class RentsController {
    private rentsBusiness: RentsBusiness;

    constructor() {
        this.rentsBusiness = new RentsBusiness();
    }

    realizarEmprestimo = async (req: Request, res: Response) => {
        try {
            const  idLivro  = req.params.id;
            const token = req.headers.authorization;

            const result = await this.rentsBusiness.realizarEmprestimo(token as string, idLivro as string);
            res.send(result);
        } catch (error: any) {
            const message = error.message || "Não foi possível alugar o livro desejado"
            res.send(message);
        }
    }

    buscarLivrosDoUsuario = async (req: Request, res: Response) => {
        try {
            const token = req.headers.authorization;

            const result = await this.rentsBusiness.buscarLivrosDoUsuario(token as string);
            res.send(result);
        } catch (error:any) {
            const message = error.message || "Não foi possível buscar os livros";
            res.send(message);
        }
    }

    buscarEmprestimos = async (req: Request, res: Response) => {
        try {
            const token = req.headers.authorization;
            const result = await this.rentsBusiness.buscarEmprestimos(token as string);
            res.send(result);
        } catch (error:any) {
            const message = error.message || "Não foi possível buscar os livros";
            res.send(message);
        }
    }
    

    cancelarEmprestimo = async (req: Request, res: Response) => {
        try {
            const token = req.headers.authorization;
            const idRent = req.params.id;
            const result = await this.rentsBusiness.cancelarEmprestimo(token as string, idRent );
            res.send(result);
        } catch (error: any) {
            const message = error.message || "Não foi possível cancelar o emprestimo do livro";
            //if()
                // fazer verificacao de qual status com if else
            // trocar o nome de deletar pra cancelar
            // retirar os consoles
            // no index escrever igual o github do Flavio back1 2024-2 arq1
            res.send(message);
        }
    }
}