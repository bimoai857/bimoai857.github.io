import { Request,Response } from "express";
import * as authService from "../service/auth";
import { decodeJwt } from "../../utils/auth";

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
    console.log(credentials);
    const data=await authService.login(credentials);
    console.log(data);
    const response = data
    ?(
      res.cookie('refresh_token',data.refreshToken,{httpOnly:true}),
      res.cookie('access_token',data.accessToken,{httpOnly:true}),
      {
        status:200,
        message: "Login successful!!",
        data: {
          accessToken: data.accessToken,
          refreshToken: data.refreshToken,
          user:decodeJwt(data.accessToken)
        }
      }
    )
    : {
        status:401,
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
  export const checkAuth=(req:Request,res:Response)=>{
   
      return res.json( {
        status:200,
        success:"Authenticated User"})
  }

  export const logout=(req:Request,res:Response)=>{
    res.clearCookie('refresh_token');
    res.clearCookie('access_token');
    res.json({
      status:200,
      success:"Cookie cleared"
    })
  }