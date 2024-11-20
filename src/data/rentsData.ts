import db from "../services/db";

export class RentsData {
    alugarLivros = async (idRent: string, idUser: string, idLivro: string) => {
        try {
            await db("Emprestimo").insert({ id: idRent, usuario_id: idUser, id_livro: idLivro });
            return { message: 'Empréstimo realizado com sucesso!!' };

        } catch (error: any) {
            throw new Error(error.sqlMessage || error.message);
        }
    }

    buscarLivrosDoUsuario = async (id: string) => {
        try {
            const livros = await db("Emprestimo")
            .join("Livro", "Emprestimo.livro_id", "=", "Livro.id")
            .where("Emprestimo.usuario_id", id)
            .select("Livro.id", "Livro.titulo", "Livro.genero", "Livro.autor", "Livro.sinopse", "Livro.data_publicacao");

            return livros;
        } catch (error: any) {
            throw new Error(error.sqlMessage || error.message);
        }
    }

    deletarEmprestimo = async (id: string) => {
        try {
            //
        } catch (error: any) {
            throw new Error(error.sqlMessage || error.message);
        }
    }
}
