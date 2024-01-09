import  express from 'express';
import  path from 'path';
import  config from './config'
import routes from './routes'
import cookieParser from 'cookie-parser';

const app=express();

app.use('/static',express.static(path.resolve("frontend","static")))
app.use(cookieParser());
app.use(express.json());
app.use(routes);

app.get("/*",(req,res)=>{
    res.sendFile(path.resolve("frontend","index.html"))
})

app.listen(config.serverPort ,()=>{
    console.log("Server Running at port:",config.serverPort)
});