import {app} from "./App";
import { userRouter } from "./routers/userRouter";
import { booksRouter } from "./routers/booksRouter";
import { rentsRouter } from "./routers/rentsRouter";

app.post('/users/cadastro', userRouter);

app.post('users/login', userRouter);

app.patch('/users/atualizarSenha', userRouter);

app.put('/users/atualizarDados', userRouter);

app.delete('/users/deletarUsuario', userRouter);

app.get('/books/buscarLivros', booksRouter);

app.post('/rent/adicionarLivros', rentsRouter);

//app.delete('/rent/deletarEmprestimo', rentRouter)
//8
//app.get('/rent/buscarLivros', rentRouter)
//9

