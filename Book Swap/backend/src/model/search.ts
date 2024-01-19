import BaseModel from "./baseModel";

export default class SearchModel extends BaseModel {

    static async search(searchTerm:string) {
    
      try{
        let booksUser = await this.queryBuilder()
        .select('book.*', 'users.first_name', 'users.last_name', 'users.user_name', 'users.latitude', 'users.longitude')
        .from('book')
        .leftJoin('users', 'book.userId', 'users.id')
        .where('title', 'ILIKE', `%${searchTerm}%`)
        .orWhere('author', 'ILIKE', `%${searchTerm}%`);
       
       return booksUser;
      }
      catch(error){
        throw new Error("Error Searching For Books!!")
      }
   
    }
}