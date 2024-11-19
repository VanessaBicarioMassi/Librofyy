import { Request, Response } from "express";
import { RentsBusiness } from "../business/rentsBusiness";

export class RentsController {
    private rentsBusiness: RentsBusiness;

    constructor() {
        this.rentsBusiness = new RentsBusiness();
    }
}