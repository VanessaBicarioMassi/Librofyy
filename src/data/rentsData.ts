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
            const livros = await db("Emprestimo")
                .join("Livro", "Emprestimo.livro_id", "=", "Livro.id")
                .where("Emprestimo.usuario_id", id)
                .select("Livro.id", "Livro.titulo", "Livro.genero", "Livro.autor", "Livro.sinopse", "Livro.data_publicacao");

            return livros;
        } catch (error: any) {
            throw new Error(error.sqlMessage || error.message);
        }
    }

    buscarEmprestimo = async (idUser: string, idRent: string) => {
        try {
            const emprestimo = await db("Emprestimo").where({ id: idRent, usuario_id: idUser }).first();
            return emprestimo;

        } catch (error: any) {
            throw new Error(error.sqlMessage || error.message);
        }
    }

    cancelarEmprestimo = async (idUser: string, idRent: string) => {
        try {
            await db("Emprestimo").where({ id: idRent, usuario_id: idUser }).delete();

            return { message: "Empréstimo deletado com sucesso!" };
        } catch (error: any) {
            throw new Error(error.sqlMessage || error.message);
        }
    }
}
