import {app} from "./App";
import { userRouter } from "./routers/userRouter";
import { booksRouter } from "./routers/booksRouter";
import { rentsRouter } from "./routers/rentsRouter";

app.post('/users', userRouter);

app.get('/books', booksRouter);

app.use('/rents', rentsRouter);

