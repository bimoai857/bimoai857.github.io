import dotenv from 'dotenv';
import path from 'path';

const pathToEnv=path.resolve(__dirname,'..',".env");

dotenv.config({ path: pathToEnv });

const config={
    serverPort:process.env.SERVER_PORT || 6000,
    jwt: {
      accessTokenSecret: process.env.ACCESS_TOKEN_SECRET,
      refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET,
    },
    database: {
        charset: "utf8",
        client: process.env.DB_CLIENT,
        database: process.env.DB_NAME,
        host: process.env.DB_HOST,
        password: process.env.DB_PASSWORD,
        port: Number(process.env.DB_PORT),
        timezone: "UTC",
        user: process.env.DB_USER,
      },
}

export default config;