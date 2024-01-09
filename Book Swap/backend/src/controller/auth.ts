import { Request,Response } from "express";
import * as authService from "../service/auth";

export const signup =  async (req: Request, res: Response) => {
    const signupDetails  = req.body;
   
    const data=await authService.signup(signupDetails);
    
  if(data){
    res.cookie('refresh_token',data.refreshToken,{httpOnly:true})
    res.cookie('access_token',data.accessToken,{httpOnly:true})
    return res.json({
      message: "Signed up successfully",
      data:{
        accessToken:data.accessToken,
        refreshToken:data.refreshToken
      }
    });
  }else{
    return res.json({
      message: "This username exists. Choose another!!",
    });
  }
 
  };

  export const login =  async (req: Request, res: Response) => {

    const credentials = req.body;

    const data=await authService.login(credentials);

    const response = data
    ?(
      res.cookie('refresh_token',data.refreshToken,{httpOnly:true}),
      res.cookie('access_token',data.accessToken,{httpOnly:true}),
      {
        message: "Login successful!!",
        data: {
          accessToken: data.accessToken,
          refreshToken: data.refreshToken
        }
      }
    )
    : {
        message: "Login unsuccessful!! Username or Password Didn't Match!!"
      };
  
  return res.json(response);
 
  };

  export const refreshToken= (req: Request, res: Response)=>{

    const token=req.cookies.refresh_token;


    if(token===null){
      return res.status(401).json({error:"Null refresh token"});
    }

    const accessToken=authService.refreshToken(token);

    if(accessToken!){
      return res.json(
      accessToken
      );
    }
  

  }