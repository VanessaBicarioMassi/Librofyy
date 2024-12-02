import knex from "knex";
import config from "./knexFile";

const db = knex(config);

export default db;

