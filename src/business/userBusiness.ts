import { generateId } from "../services/idGenerator";
import { UserData } from "../data/userData";
import { generateToken, payload } from "../services/token";
import { userRole } from "../types/user";

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
            await this.userData.cadastroUsuario(id, username, email, senha, telefone, cpf, role);

            const payload: payload = {
                id: id,
                role: role as userRole
            }

            const token = await generateToken(payload)

            return token
            
        } catch (error: any) {
            console.error("Erro no cadastro do usuário:", error.message);
            throw new Error("Erro ao processar cadastro do usuário");
        }
    };
    login = async (email: string, password: string) => {
        try {

            if (!email || !password) {
                throw new Error("Campos faltantes")
            }

            const user = this.userData.buscarUsuarioPorEmail(email) as any;
            if (!user) {
                throw new Error("Usuario inexistente");
            }

            const payload: payload = {
                id: user.id,
                role: user.role
            }

            const token = await generateToken(payload)

            return token

        } catch (error: any) {
            throw new Error("Erro ao efetuar o login do usuário")
        }
    }
}
