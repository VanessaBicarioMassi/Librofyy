import db from "../services/db";

export class UserData { 
    
    cadastroUsuario = async ( id: string, username: string, email: string, senha: string, telefone: string, cpf: string, role: string ) => {
    try {
        const result = await db("usuarios").insert({
            id,
            username,
            email,
            senha,
            telefone,
            cpf,
            role
        });

        return { idInserido: result[0] };
    } catch (error: any) {
        console.error("Erro ao cadastrar usuário no banco de dados:", error.message);
        throw new Error("Erro ao cadastrar usuário. Tente novamente mais tarde.");
    }
}
}