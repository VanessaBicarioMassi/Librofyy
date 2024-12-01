import { RentsData } from "../data/rentsData";
import { verifyToken } from "../services/token";
import { UserData } from "../data/userData";
import { BooksData } from "../data/booksData";
import { generateId } from "../services/idGenerator";
import { BadRequestException, UnprocessableEntityException } from "../services/exeception";
import { Response } from "express";

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
        if (!token || !idLivro) {
            BadRequestException(res, "Token ou id do livro faltantes");
        }

        const payload = verifyToken(token);
        if (!payload) {
            BadRequestException(res, "Token inválido ou expirado");
        }

        const user = await this.userData.buscarUsuarioPorId(res, payload.id);
        if (!user) {
            UnprocessableEntityException(res, "Usuário inexistente");
        }

        const livro = await this.booksData.buscarLivroPorId(res, idLivro);
        if (!livro) {
            UnprocessableEntityException(res, "Livro inexistente");
        }

        const idRent = generateId();
        await this.rentsData.realizarEmprestimo(res, idRent as string, payload.id, livro.id,);

        return;
    }

    buscarLivrosDoUsuario = async (res: Response, token: string) => {
        if (!token) {
            BadRequestException(res, "Token faltante");
        }

        const payload = verifyToken(token);
        if (!payload) {
            BadRequestException(res, "Token inválido ou expirado");
        }

        const books = await this.rentsData.buscarLivrosDoUsuario(res, payload.id)
        return books;
    }

    buscarEmprestimos = async (res: Response, token: string) => {
        if (!token) {
            BadRequestException(res, "Token faltante");
        }

        const payload = verifyToken(token);
        if (!payload) {
            BadRequestException(res, "Token inválido ou expirado");
        }

        const rents = await this.rentsData.buscarEmprestimos(res, payload.id);

        return rents;
    }

    cancelarEmprestimo = async (res: Response, token: string, idRent: string) => {
        if (!token || !idRent) {
            BadRequestException(res, "Campos faltantes");
        }

        const payload = verifyToken(token);
        if (!payload) {
            BadRequestException(res, "Token inválido ou expirado");
        }

        const emprestimo = await this.rentsData.buscarEmprestimoPorID(res, payload.id, idRent)
        if (!emprestimo) {
            UnprocessableEntityException(res, "Empréstimo não encontrado.");
        }

        await this.rentsData.cancelarEmprestimo(res, payload.id, idRent);

        return;
    }
}