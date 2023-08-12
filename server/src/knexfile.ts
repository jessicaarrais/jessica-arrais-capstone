import * as dotenv from "dotenv";
import { Knex } from "knex";

dotenv.config();

export const knexConfig: Knex.Config = {
  client: "mysql",
  connection: {
    host: "127.0.0.1",
    port: 3306,
    database: process.env.DB_NAME,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
  },
};
