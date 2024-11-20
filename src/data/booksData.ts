import db from "../services/db";

export class BooksData {

    buscarTodosLivros = async (page: number = 1, limit: number = 20) => {
        try {
            const offset = (page - 1) * limit;
    
            const result = await db("livros").select("*").limit(limit).offset(offset);
            return result;

        } catch (error: any) {
            throw new Error(error.sqlMessage || error.message);
        }
    };
    

    buscarLivros = async (titulo?: string, autor?: string, genero?: string, dataPublicacao?: Date, page: number = 1, limit: number = 20) => {
        try {
            const offset = (page - 1) * limit;
    
            const query = db("livros");
    
            if (titulo) query.where("titulo", "like", `%${titulo}%`);
            if (autor) query.where("autor", "like", `%${autor}%`);
            if (genero) query.where("genero", "like", `%${genero}%`);
            if (dataPublicacao) query.where("dataPublicacao", dataPublicacao);
            const result = await query.limit(limit).offset(offset);
            return result;
            
        } catch (error: any) {
            throw new Error(error.sqlMessage || error.message);
        }
    };
    

    buscarLivroPorId = async ( id: string) => {
        try {
            const [livro] = await db('livros').where({ id });
            return livro;
        } catch (error: any) {
            throw new Error(error.sqlMessage || error.message);
        }

    }
    
    
}