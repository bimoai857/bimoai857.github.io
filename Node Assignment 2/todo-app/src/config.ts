import dotenv from 'dotenv';

dotenv.config();

const config={
    serverPort:process.env.SERVER_PORT || 6000,
}

export default config;