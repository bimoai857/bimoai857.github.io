import { Request, Response } from "express";
import * as userService from "../service/user";

export const getBooks = async (req: Request, res: Response) => {
  const userId = req.params.userId;

  try {
    const books = await userService.getBooks(userId);

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

export const addBook = async (req: Request, res: Response) => {
  const bookDetails = req.body;

  const books = await userService.addBook(bookDetails);

    res.status(200).json({
      status: "Data Added Successfully!!",
      data: books,
    });
  
};
