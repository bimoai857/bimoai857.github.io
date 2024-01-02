import express from 'express';
import routes from './routes';
import config from './config';

const app=express();

app.use(express.json());
app.use(routes);

console.log('Server Started at port: ',config.serverPort);

app.listen(config.serverPort);