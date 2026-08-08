import dotenv from "dotenv";
dotenv.config();

export const configEnv = {
  port: process.env.PORT || 8000,
  database_url: process.env.DATABASE_URL,
};
