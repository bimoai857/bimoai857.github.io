import SearchModel from '../model/search';

export const search=async(searchTerm:string)=>{

    let books:Object=await SearchModel.search(searchTerm);
    books=addDistance(books);
    return books;
}

const addDistance=(books:any)=>{
    const data=books.map((bookWithUser: any)=>{
        return{
            ...bookWithUser,
            distance:null
        }
    })
    return data;
}