import db from "../services/db";

export class RentsData {

    realizarEmprestimo = async (idRent: string, idUser: string, idLivro: string) => {
        try {
            await db("emprestimo").insert({ id: idRent, usuario_id: idUser, livro_id: idLivro });
            return { message: 'Empréstimo realizado com sucesso!!' };

        } catch (error: any) {
            throw new Error(error.sqlMessage || error.message);
        }
    }

    buscarLivrosDoUsuario = async (id: string) => {
        try {
            const livros = await db("emprestimo")
                .join("livros", "emprestimo.livro_id", "=", "livros.id") // Alterado para "livros"
                .where("emprestimo.usuario_id", id) // Utiliza "usuario_id" correto
                .select(
                    "livros.id", 
                    "livros.titulo", 
                    "livros.genero", 
                    "livros.autor", 
                    "livros.sinopse", 
                    "livros.data_publicacao"
                );

            return livros;
        } catch (error: any) {
            throw new Error(error.sqlMessage || error.message);
        }
        
    }

    buscarEmprestimos = async (idUser: string) => {
        try {
            const emprestimo = await db("emprestimo").where({ usuario_id: idUser }).first();
            return emprestimo;

        } catch (error: any) {
            throw new Error(error.sqlMessage || error.message);
        }
    }


    buscarEmprestimoPorID = async (idUser: string, idRent: string) => {
        try {
            const emprestimo = await db("emprestimo").where({ id: idRent, usuario_id: idUser }).first();
            return emprestimo;

        } catch (error: any) {
            throw new Error(error.sqlMessage || error.message);
        }
    }

    cancelarEmprestimo = async (idUser: string, idRent: string) => {
        try {
            await db("emprestimo").where({ id: idRent, usuario_id: idUser }).delete();

            return { message: "Empréstimo deletado com sucesso!" };
        } catch (error: any) {
            throw new Error(error.sqlMessage || error.message);
        }
    }
}
