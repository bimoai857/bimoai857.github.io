import BaseModel from "./baseModel";

export default class SearchModel extends BaseModel {

    static async search(searchTerm:string) {

      try{
        let books = await this.queryBuilder()
        .select('*')
        .from('book').where('title','ILIKE',`%${searchTerm}%`).orWhere('author','ILIKE',`%${searchTerm}%`);
      
        books = await Promise.all(books.map(async (book) => {
            const user = await this.queryBuilder()
              .select('*')
              .from('users')
              .where('id', '=', book.userId)
              .first();
          
            return {
              ...book,
              user: user,
            };
          }));
       
       return books;
      }
      catch(error){
        throw new Error("Error Searching For Books!!")
      }
   
    }
}