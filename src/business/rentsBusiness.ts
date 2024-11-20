import { RentsData } from "../data/rentsData";
import { verifyToken } from "../services/token";
import { UserData } from "../data/userData";
import { BooksData } from "../data/booksData";
import { generateId } from "../services/idGenerator";

export class RentsBusiness {
    private rentsData: RentsData;
    private userData: UserData;
    private booksData: BooksData

    constructor() {
        this.rentsData = new RentsData();
        this.userData = new UserData();
        this.booksData = new BooksData();
    }

    realizarEmprestimo = async (token: string, idLivro: string) => {
        try {
            console.log(token, idLivro)
            if (!token || !idLivro) {
                throw new Error("Token ou id do livro faltantes");
            }

            const payload = verifyToken(token);
            if (!payload) {
                throw new Error("Token inválido ou expirado");
            }

            const user = await this.userData.buscarUsuarioPorId(payload.id);
            if (!user) {
                throw new Error("Usuário inexistente");
            }

            const livro = await this.booksData.buscarLivroPorId(idLivro);
            if (!livro) {
                throw new Error("Livro inexistente");
            }

            const idRent = generateId();
            const result = await this.rentsData.realizarEmprestimo(idRent as string, payload.id, livro.id,);
            return result;
        } catch (error: any) {
            throw new Error(error.message || "Erro ao realizar empréstimo");
        }
    }

    buscarLivrosDoUsuario = async (token: string) => {
        try {
            if (!token) {
                throw new Error("Token faltante");
            }

            const payload = verifyToken(token);
            if (!payload) {
                throw new Error("Token inválido ou expirado");
            }

            const result = await this.rentsData.buscarLivrosDoUsuario(payload.id)
            return result;
        } catch (error: any) {
            throw new Error(error.message || "Erro ao realizar busca");

        }
    }

    cancelarEmprestimo = async(token: string, idRent: string) =>{
        try {
            if ( !token || !idRent ) {
                throw new Error("Campos faltantes");
            }

            const payload = verifyToken(token);
            if (!payload) {
                throw new Error("Token inválido ou expirado");
            }

            const emprestimo = await this.rentsData.buscarEmprestimo(payload.id, idRent)
            if (!emprestimo) {
                throw new Error("Empréstimo não encontrado.");
            }

            const result = await this.rentsData.cancelarEmprestimo(payload.id, idRent);
            return result;

            return result; 
        } catch (error: any) {
            throw new Error(error.message || "Erro ao cancelar empréstimo");

        }
    }
}