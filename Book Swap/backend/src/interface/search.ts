import { IBook } from "./book";

export interface ICoordinates  {
    latitude: number;
    longitude: number;
  };

export interface ISearch extends ICoordinates{
    searchTerm:string; 
  }

export interface IBooksUser extends IBook,ICoordinates{
    id:string;
    firstName:string;
    lastName:string;
    distance?:number
}