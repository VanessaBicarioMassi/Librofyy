import {app} from "./App";
import { userRouter } from "./routers/userRouter";

app.post('/users/cadastro', userRouter)