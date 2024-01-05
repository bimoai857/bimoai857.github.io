import bcrypt from "bcrypt";
import { ISignUp } from "../interface/auth";
import { ACCESS_TOKEN_EXPIRY, REFRESH_TOKEN_EXPIRY } from "../constant/jwt";
import jwt from "jsonwebtoken";
import config from "../config";
import {users} from '../model/users'

const SALT_ROUNDS = 10;

export const signup = async (body: ISignUp) => {

  // Check if the user already exists in the database
   
  const hashedPassword=await bcrypt.hash(body.password, SALT_ROUNDS);


  // Put the new email and it's hashed form in the user database

  // Generate access and refresh token and return to the client
  const accessToken = jwt.sign(body, config.jwt.accessTokenSecret!, {
    expiresIn: ACCESS_TOKEN_EXPIRY,
  });

  const refreshToken = jwt.sign(body, config.jwt.refreshTokenSecret!, {
    expiresIn: REFRESH_TOKEN_EXPIRY,
  });

  return {
    accessToken,
    refreshToken,
  };
};

export const login = async (body: ISignUp) => {
  const user = users.find(({ email }) => email === body.email)!;

  if (!user || !(await bcrypt.compare(body.password, user.password))) {
    return false;
  }

  const accessToken = jwt.sign(user, config.jwt.accessTokenSecret!, {
    expiresIn: ACCESS_TOKEN_EXPIRY,
  });

  const refreshToken = jwt.sign(user, config.jwt.refreshTokenSecret!, {
    expiresIn: REFRESH_TOKEN_EXPIRY,
  });

  console.log({ accessToken, refreshToken });

  return {
    accessToken,
    refreshToken,
  };
};

export const refreshToken= (refreshToken:String)=>{

  
   
    const accessToken=jwt.verify(refreshToken as string,config.jwt.refreshTokenSecret!,(error,user)=>{
      

        const decodedToken = jwt.decode(refreshToken as string, { complete: true });

        const accessToken = jwt.sign({ data: decodedToken?.payload }, config.jwt.accessTokenSecret!, {
          expiresIn: ACCESS_TOKEN_EXPIRY,
        });
        
        return accessToken;
    })
    return {accessToken}
}

