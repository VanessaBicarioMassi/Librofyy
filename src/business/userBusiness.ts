import { generateId } from "../services/idGenerator";
import { UserData } from "../data/userData";
import { generateToken, payload, verifyToken } from "../services/token";
import { userRole } from "../types/user";
import { isCpfValid } from "../services/validateCPF";
import { isPhoneValid } from "../services/validatePhone";


export class UserBusiness {
    private userData: UserData;

    constructor() {
        this.userData = new UserData();
    }
    
    cadastro = async (username: string, email: string, senha: string, telefone: string, cpf: string) => {
        try {
            if (!username || !email || !senha || !telefone || !cpf ) {
                throw new Error("Campos vazios");
            }

            if (email.indexOf("@") === -1 || email.indexOf("@") === 0) {
                throw new Error("Email inválido");
            }

            if (senha.length < 8) {
                throw new Error("Senha inválida");
            }

            if (!isCpfValid(cpf)) {
                throw new Error("CPF inválido");
            }

            if (!isPhoneValid(telefone)) {
                throw new Error("Número de telefone inválido");
            }
            
            const verificarEmail = await this.userData.buscarUsuarioPorEmail(email);
            if (verificarEmail) {
                throw new Error("Email já está em uso.");
            }

            const verificarCPF = await this.userData.verificarCPF(cpf);
            if (verificarCPF) {
                throw new Error("Email já está em uso.");
            }

            const id = generateId();
            const cargo = "USER"
            await this.userData.cadastroUsuario(id as string, username, email, senha, telefone, cpf, cargo);

            const payload: payload = {
                id: id,
                role: cargo as userRole
            }

            const token = await generateToken(payload)

            return token

        } catch (error: any) {
            console.error("Erro no cadastro do usuário:", error.message);
            throw new Error(error.message);
        }
    };
    
    login = async (email: string, password: string) => {
        try {

            if (!email || !password) {
                throw new Error("Campos faltantes")
            }

            const user = await this.userData.buscarUsuarioPorEmail(email) as any;
            if (!user) {
                throw new Error("Usuario inexistente");
            }

            if (password != user.password) {
                throw new Error("Senha incorreta");
            }

            const payload: payload = {
                id: user.id,
                role: user.cargo
            }

            const token = await generateToken(payload)

            return token

        } catch (error: any) {
            throw new Error(error.message || "Erro ao efetuar o login do usuário");
        }
    };
    
    atualizarSenha = async (token: string, newPassword: string) => {
        try {
            if (!token || !newPassword) {
                throw new Error("Token ou senha faltantes");
            }

            const payload = verifyToken(token); 
            if (!payload) {
                throw new Error("Token inválido ou expirado");
            }

            const user = await this.userData.buscarUsuarioPorId(payload.id);
            if (!user) {
                throw new Error("Usuário inexistente");
            }

            const result = await this.userData.alterarSenha(user.id, newPassword);

            return result
        } catch (error: any) {
            console.error("Erro ao alterar a senha:", error.message);
            throw new Error("Erro ao processar atualização de senha");
        }
    };

    atualizarDados = async (token: string, newUsername: string, newEmail: string, newTelefone:string) => {
        try {
            if (!token || !newUsername || !newEmail || !newTelefone ) {
                throw new Error("Token ou campos faltantes");
            }

            const payload = verifyToken(token); 
            if (!payload) {
                throw new Error("Token inválido ou expirado");
            }

            const user = await this.userData.buscarUsuarioPorId(payload.id);
            if (!user) {
                throw new Error("Usuário inexistente");
            }

            const result = await this.userData.alterarDados(user.id, newUsername, newEmail, newTelefone);

            return result

        } catch (error: any) {
            console.error("Erro ao alterar a senha:", error.message);
            throw new Error("Erro ao processar atualização de senha");
        }
    }

    deletarUsuario = async ( token: string ) => {
        try {
            if (!token ) {
                throw new Error("Token faltante");
            }

            const payload = verifyToken(token); 
            if (!payload) {
                throw new Error("Token inválido ou expirado");
            }

            const user = await this.userData.buscarUsuarioPorId(payload.id);
            if (!user) {
                throw new Error("Usuário inexistente");
            }

            const result =await this.userData.deletarUsuario(user.id);
            return result;
            
        } catch (error: any) {
            console.error("Erro ao alterar a senha:", error.message);
            throw new Error("Erro ao processar atualização de senha");
        }
    }
}


