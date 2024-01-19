import SearchModel from '../model/search';
import { haversineDistance } from '../../utils/distance';
import { IBooksUser, ICoordinates, ISearch } from '../interface/search';


export const search=async(searchDetails:ISearch)=>{

    const booksUser:IBooksUser[]=await SearchModel.search(searchDetails['searchTerm']);
    
    const booksUserDistance=addDistance(booksUser,searchDetails.latitude,searchDetails.longitude);
    return booksUserDistance;
}

const addDistance=(booksUser:IBooksUser[],latitude:number,longitude:number)=>{
    const data=booksUser.map((bookUser: IBooksUser)=>{
     
        const coordinates1:ICoordinates={latitude,longitude};
        const coordinate2:ICoordinates={latitude:bookUser.latitude,longitude:bookUser.longitude}
        return{
            ...bookUser,
            distance:haversineDistance(coordinates1,coordinate2),
        }
    })
    return data;
}
