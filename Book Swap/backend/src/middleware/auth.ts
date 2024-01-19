import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import config from "../config";

export const auth=(req:Request,res:Response,next:NextFunction)=>{
    
    const access_token=req.cookies.access_token;
    
    if(!access_token) return res.json({
        status:400,
        error:"Access token is missing"})

    jwt.verify(access_token,config.jwt.accessTokenSecret,(err: any,decoded: any)=>{
        if(err){
            return res.json({status:true})
        }else{
            next();
        }
    })
}