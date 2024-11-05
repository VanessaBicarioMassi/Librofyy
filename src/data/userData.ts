import db from "../services/db";

export const cadastroUsuario = async (id: string, username: string, email: string, senha: string, telefone: number, cpf: string) => {
    try {
        const result = await db("Usuarios").insert({
            id,
            username,
            email,
            senha,
            telefone,
            cpf
        });
        return {message: "Usuário cadastrado com sucesso"};
    } catch (error) {
        throw new Error("Erro ao cadastrar usuário. Tente novamente mais tarde.");
    }
};

