import { Request,Response } from "express";
import * as authService from "../service/auth";

export const signup =  async (req: Request, res: Response) => {
    const { body } = req;

    const tokens=await authService.signup(body);

  if(tokens){
    res.cookie('refresh_token',tokens.refreshToken,{httpOnly:true})
    return res.json({
      message: "Signed up successfully",
      data:{
        accessToken:tokens.accessToken,
        refreshToken:tokens.refreshToken
      }
    });
  }
 
  };

  export const login =  async (req: Request, res: Response) => {

    const { body } = req;

    const tokens=await authService.login(body);

    const response = tokens
    ?(
      res.cookie('refresh_token',tokens.refreshToken,{httpOnly:true}),
      {
        message: "Login successful!!",
        data: {
          accessToken: tokens.accessToken,
          refreshToken: tokens.refreshToken
        }
      }
    )
    : {
        message: "Login unsuccessful!! Email or Password Didn't Match!!"
      };
  
  return res.json(response);
 
  };

  export const refreshToken= (req: Request, res: Response)=>{

    const token=req.body.cookies.refreshToken;

    if(refreshToken===null){
      return res.status(401).json({error:"Null refresh token"});
    }

    const accessToken=authService.refreshToken(token);

    if(accessToken!){
      return res.json(
      accessToken
      );
    }
  

  }

