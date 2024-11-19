import { Request, Response } from "express";
import { RentsData } from "../data/rentsData";

export class RentsBusiness {
    private rentsData: RentsData;

    constructor() {
        this.rentsData = new RentsData();
    }
}