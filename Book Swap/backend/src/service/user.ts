import { IBook } from '../interface/book';
import { INotification } from '../interface/notification';
import UserModel from '../model/user'


export const getBooks=async(userId:string)=>{

    const books=await UserModel.getBooks(userId);
    return books;
}

export const addBook=async(bookDetails:IBook)=>{

    const books=await UserModel.addBook(bookDetails);
    return books;
}

export const sendNotification=async(notificationDetails:INotification)=>{

    const books=await UserModel.sendNotification(notificationDetails);
    return books;
}

export const getNotification=async(userId:number)=>{
   
    const notificationData=await UserModel.getNotification(userId);
    return notificationData;
}