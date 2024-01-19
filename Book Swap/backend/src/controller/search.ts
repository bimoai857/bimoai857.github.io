import { Request, Response } from "express";
import * as searchService from "../service/search";
import { ISearch } from "../interface/search";

export const search = async (req: Request, res: Response) => {

    const searchDetails:ISearch=req.body;

    try {
      const booksUserDistance = await searchService.search(searchDetails);
  
      res.status(200).json({
        status: "Data Retrieved Successfully!!",
        data: booksUserDistance,
      });
    } catch (error) {
      
      res.status(400).json({
        status: (error as Error).message,
      });
    }
  };