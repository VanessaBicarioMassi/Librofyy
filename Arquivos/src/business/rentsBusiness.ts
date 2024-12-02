import { RentsData } from "../data/rentsData";
import { verifyToken } from "../services/token";
import { UserData } from "../data/userData";
import { BooksData } from "../data/booksData";
import { generateId } from "../services/idGenerator";
import { Response } from "express";
import { HttpException } from "../services/exeception";
import { CustomError } from "../services/errors";

export class RentsBusiness {
    private rentsData: RentsData;
    private userData: UserData;
    private booksData: BooksData

    constructor() {
        this.rentsData = new RentsData();
        this.userData = new UserData();
        this.booksData = new BooksData();
    }

    realizarEmprestimo = async (res: Response, token: string, idLivro: string) => {
        try {
            if (!token || !idLivro) {
                throw new CustomError(400, "Token ou id do livro faltantes");
            }

            const payload = verifyToken(token);
            if (!payload) {
                throw new CustomError(400, "Token inválido ou expirado");
            }

            const usuario = await this.userData.buscarUsuarioPorId(res, payload.id);
            if (!usuario) {
                throw new CustomError(409, "Usuário inexistente");
            }

            const livro = await this.booksData.buscarLivroPorId(res, idLivro);
            if (!livro) {
                throw new CustomError(409, "Livro inexistente");
            }

            const idEmprestimo = generateId();
            await this.rentsData.realizarEmprestimo(res, idEmprestimo as string, payload.id, livro.id,);
            return;
        } catch ({ statusCode, message }: any) {
            HttpException(res, statusCode, message);
            throw new Error(`Não foi possível realizar o empréstimo.\nMotivo: ${message}`)
        }

    }

    buscarLivrosDoUsuario = async (res: Response, token: string) => {
        try {
            if (!token) {
                throw new CustomError(400, "Token faltante");
            }

            const payload = verifyToken(token);
            if (!payload) {
                throw new CustomError(400, "Token inválido ou expirado");
            }

            const livros = await this.rentsData.buscarLivrosDoUsuario(res, payload.id)
            return livros;
        } catch ({ statusCode, message }: any) {
            HttpException(res, statusCode, message);
            throw new Error(`Não foi possível concluir a busca de livros.\nMotivo: ${message}`)
        }
    }

    buscarEmprestimos = async (res: Response, token: string) => {
        try {
            if (!token) {
                throw new CustomError(400, "Token faltante");
            }

            const payload = verifyToken(token);
            if (!payload) {
                throw new CustomError(400, "Token inválido ou expirado");
            }

            const emprestimos = await this.rentsData.buscarEmprestimos(res, payload.id);

            return emprestimos;
        } catch ({ statusCode, message }: any) {
            HttpException(res, statusCode, message);
            throw new Error(`Não foi possível concluir a busca por empréstimo.\nMotivo: ${message}`)
        }
    }

    cancelarEmprestimo = async (res: Response, token: string, idEmprestimo: string) => {
        try {
            if (!token || !idEmprestimo) {
                throw new CustomError(400, "Campos faltantes");
            }

            const payload = verifyToken(token);
            if (!payload) {
                throw new CustomError(400, "Token inválido ou expirado");
            }

            const emprestimo = await this.rentsData.buscarEmprestimoPorID(res, payload.id, idEmprestimo)
            if (!emprestimo) {
                throw new CustomError(409, "Empréstimo não encontrado.");
            }

            await this.rentsData.cancelarEmprestimo(res, payload.id, idEmprestimo);

            return;
        } catch ({ statusCode, message }: any) {
            HttpException(res, statusCode, message);
            throw new Error(`Não foi possível concluir o cancelamento do empréstimo.\nMotivo: ${message}`)
        }
    }
}