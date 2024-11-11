import {app} from "./App";
import { userRouter } from "./routers/userRouter";

app.post('/users/cadastro', userRouter);

app.post('users/login', userRouter);

app.patch('/users/atualizarSenha', userRouter);

//app.put('/users/atualizarDados', userRouter)
//4
//app.post('/users/deletarUser', userRouter)
//5
//app.post('/books/buscarLivros', booksRouter)
//6
//app.post('/books/bucarTodosLivros', booksRouter)
//7
//app.post('/rent/deletarEmprestimo', rentRouter)
//8
//app.post('/rent/buscarLivros', rentRouter)
//9
//app.post('/rent/addLivros', rentRouter)
//10
//app.post('/rent/buscarLivrosCliente', rentRouter)