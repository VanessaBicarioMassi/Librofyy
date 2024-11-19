import db from "../services/db";

export class BooksData {

    buscarTodosLivros = async () => {
        try {
            const result = await db("livros").select("*");
            return result; 
        } catch (error: any) {
            throw new Error(error.sqlMessage || error.message);
        }
    }

    buscarLivros = async (titulo?: string, autor?: string, genero?: string, dataPublicacao?: Date) => {
        try {
            const query = db("livros");
    
            if (titulo) query.where("titulo", "like", `%${titulo}%`);
            if (autor) query.where("autor", "like", `%${autor}%`);
            if (genero) query.where("genero", "like", `%${genero}%`);
            if (dataPublicacao) query.where("dataPublicacao", dataPublicacao);
    
            const result = await query;
            return result;
    
        } catch (error: any) {
            throw new Error(error.sqlMessage || error.message);
        }
    }
    
}