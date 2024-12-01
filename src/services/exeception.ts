import { Response } from "express";

export const HttpException = (res: Response, statusCode: number, message: string) => {
        res.status(statusCode).send({ message });
    }

