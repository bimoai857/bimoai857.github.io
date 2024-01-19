import bcrypt from "bcrypt";
import { ISignUp,ILogin } from "../interface/auth";
import { ACCESS_TOKEN_EXPIRY, REFRESH_TOKEN_EXPIRY } from "../constant/jwt";
import jwt from "jsonwebtoken";
import config from "../config";
import AuthModel from "../model/auth";

const SALT_ROUNDS = 10;

export const signup = async (signupDetails: ISignUp) => {

  // Check if the user already exists in the database
  const checkUser=await AuthModel.checkUser(signupDetails.userName);

  if(checkUser) return false;

  const hashedPassword=await bcrypt.hash(signupDetails.password, SALT_ROUNDS);


  // Put the new email and it's hashed form in the user database
  await AuthModel.save(signupDetails,hashedPassword)

  // Generate access and refresh token and return to the client
  const accessToken = jwt.sign(signupDetails, config.jwt.accessTokenSecret!, {
    expiresIn: ACCESS_TOKEN_EXPIRY,
  });

  const refreshToken = jwt.sign(signupDetails, config.jwt.refreshTokenSecret!, {
    expiresIn: REFRESH_TOKEN_EXPIRY,
  });

  return {
    accessToken,
    refreshToken,
  };
};

export const login = async (credentials: ILogin ) => {
  const user = await AuthModel.checkUser(credentials.userName);
 
  if (!user || !(await bcrypt.compare(credentials.password, user.password))) {
    return false;
  }

  const accessToken = jwt.sign(user, config.jwt.accessTokenSecret!, {
    expiresIn: ACCESS_TOKEN_EXPIRY,
  });

  const refreshToken = jwt.sign(user, config.jwt.refreshTokenSecret!, {
    expiresIn: REFRESH_TOKEN_EXPIRY,
  });


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