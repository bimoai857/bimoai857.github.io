import { Request, Response } from "express";
import * as userService from "../service/user";
import { decodeJwt } from "../../utils/auth";

export const getBooks = async (req: Request, res: Response) => {
  const userId = decodeJwt(req.cookies.access_token).id;
  try {
    const books = await userService.getBooks(userId);

    res.status(200).json({
      status: "Data Retrieved Successfully!!",
      books
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

export const sendNotification = async (req: Request, res: Response) => {
  const notificationDetails = req.body;

  const books = await userService.sendNotification(notificationDetails);

    res.status(200).json({
      status: "Data Added Successfully!!",
      data: books,
    });
  
};

export const getNotification = async (req: Request, res: Response) => {
  const userId = decodeJwt(req.cookies.access_token).id;
  
  try {
    const notificationData = await userService.getNotification(userId);

    res.status(200).json({
      status: "Data Retrieved Successfully!!",
      notificationData
    });
  } catch (error) {
    
    res.status(400).json({
      status: (error as Error).message,
    });
  }
 
};