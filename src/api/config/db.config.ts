interface IDbConfig {
  DB_HOST: string;
  DB_PORT: string;
  DB_USER: string;
  DB_PASSWORD: string;
  DB: string;
  DB_URL: string;
}

export const dbConfig = {
  DB: process.env.DB,
  DB_URL: process.env.DB_URL,
  DB_HOST: process.env.DB_HOST,
  DB_PORT: process.env.DB_PORT,
  DB_USER: process.env.DB_USER,
  DB_PASSWORD: process.env.DB_PASSWORD,
} as IDbConfig;
