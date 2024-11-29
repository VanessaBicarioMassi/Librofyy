import db from "../services/db";

export class UserData {

    cadastroUsuario = async (id: string, username: string, email: string, senha: string, telefone: string, cpf: string, cargo: string) => {
        try {
            const result = await db("usuarios").insert({
                id,
                username,
                email,
                senha,
                telefone,
                cpf,
                cargo
            });

            return { message: "Usuário cadastrado com sucesso"};
        } catch (error: any) {
            console.error("Erro ao cadastrar usuário no banco de dados:", error.message);
            throw new Error("Erro ao cadastrar usuário. Tente novamente mais tarde.");
        }
    }
    
    buscarUsuarioPorEmail = async (email: string) => {
        try {
            const [user] = await db('usuarios').where({ email });
            return user;
        } catch (error: any) {
            throw new Error(error.sqlMessage || error.message);
        }
    }

    buscarUsuarioPorId = async (id: string) => {
        try {
            const [user] = await db('usuarios').where({ id });
            return user;
        } catch (error: any) {
            throw new Error(error.sqlMessage || error.message);
        }
    }

    verificarCPF = async (cpf: string) => {
        try {
            const [user] = await db('usuarios').where({ cpf });
            return user;
        } catch (error: any) {
            throw new Error(error.sqlMessage || error.message);
        }
    }

    alterarSenha = async (id: string, newPassword: string) => {
        try {
            await db('usuarios').where({id}).update({senha: newPassword})
            return { message: "Senha atualizada com sucesso" };
        } catch (error: any) {
            throw new Error(error.sqlMessage || error.message);
        }
    }

    alterarDados = async (id: string, newUsername: string, newEmail: string, newTelefone: string) => {
        try {
            await db('usuarios').where({id}).update({username: newUsername, email: newEmail, telefone: newTelefone})
            return { message: "Dados atualizados com sucesso" };
        } catch (error: any) {
            throw new Error(error.sqlMessage || error.message);
        }
    }

    deletarUsuario = async ( id: string ) => {
        try {
            await db('usuarios').where({ id }).delete();
            return { message: "Usuário deletado com sucesso"};

        } catch (error: any) {
            throw new Error(error.sqlMessage || error.message);
        }
    }
}