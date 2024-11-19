import db from "../services/db";

export class RentsData {
    alugarLivros = async (idRent: string, idUser: string, idLivro: string) => {
       try {
        await db("Emprestimo").insert({id: idRent, usuario_id: idUser, id_livro: idLivro});
        return {message: 'Empréstimo realizado com sucesso!!'};

       } catch (error:any) {
          throw new Error(error.sqlMessage || error.message);
       } 
    }
}
