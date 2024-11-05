import { generateId } from "../services/idGenerator";
import {cadrastroUsuario} from "../data/userData";

export class UserBusiness {
    cadastro = async (username: string, email: string, senha: string, telefone: number, cpf: string) => {
        try {
            if (!username || !email || !senha) {
                throw new Error("Campos vazios");
            }

            if (email.indexOf("@") === -1 || email.indexOf("@") === 0) {
                throw new Error("Email inválido");
            }

            if (senha.length < 6) {
                throw new Error("Senha inválida");
            }

            const id = generateId();
            const user = await cadrastroUsuario(id,username,email,senha,telefone,cpf);
            
            return { id, username, email, telefone, cpf };
        } catch (error) {
            console.error(error);
            throw error;
        }
    };
}
