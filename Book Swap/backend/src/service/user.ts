import { IBook } from '../interface/book';
import UserModel from '../model/user'


export const getBooks=async(userId:string)=>{

    const books=await UserModel.getBooks(userId);
    return books;
}
export const addBook=async(bookDetails:IBook)=>{

    const books=await UserModel.addBook(bookDetails);
    return books;
}