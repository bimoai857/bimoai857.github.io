import { Request, Response } from "express";
import * as searchService from "../service/search";

export const search = async (req: Request, res: Response) => {
    const searchTerm = req.params.searchTerm;
  
    try {
      const books = await searchService.search(searchTerm);
  
      res.status(200).json({
        status: "Data Retrieved Successfully!!",
        data: books,
      });
    } catch (error) {
      
      res.status(400).json({
        status: (error as Error).message,
      });
    }
  };