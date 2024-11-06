import { generateId } from "../services/idGenerator";
import { UserData } from "../data/userData";

export class UserBusiness {
    userData = new UserData
    cadastro = async ( username: string, email: string, senha: string, telefone: string, cpf: string, role: string ) => {
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
            const user = await this.userData.cadastroUsuario(id, username, email, senha, telefone, cpf, role);
            
            return { user };
        } catch (error: any) {
            console.error("Erro no cadastro do usuário:", error.message);
            throw new Error("Erro ao processar cadastro do usuário");
        }
    };
}
