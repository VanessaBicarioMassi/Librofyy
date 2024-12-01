import { Response } from "express";

export const HttpException = (res: Response, statusCode: number, message: string) => {
        res.status(statusCode).send({ message });
    }

export const BadRequestException = (res: Response, message: string) =>
    HttpException(res, 400, message);

export const ConflictException = (res: Response, message: string) =>
    HttpException(res, 409, message);

export const UnprocessableEntityException = (res: Response, message: string) =>
    HttpException(res, 422, message);

export const InternalServerErrorException = (res: Response, message: string) =>
    HttpException(res, 500, message);
