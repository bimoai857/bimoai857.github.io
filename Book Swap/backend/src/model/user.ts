import { IBook } from "../interface/book";
import BaseModel from "./baseModel";

export default class UserModel extends BaseModel {

    static async getBooks(userId:string) {
      try{
        const query = await this.queryBuilder()
        .select('book.*')
        .from('users')
        .join('book', 'users.id', '=', 'book.user_id')
        .where('users.id', '=', userId);
       return query;
      }
      catch(error){
        
        throw new Error("Error Getting Books!!")
      }
   
    }
    static async addBook(bookDetails:IBook) {

      try{
        const query = this.queryBuilder().insert(bookDetails).table("book").returning('*');
        return query;
      }
      catch(error){
        throw new Error("Error Adding Book!!")
      }
    }
}