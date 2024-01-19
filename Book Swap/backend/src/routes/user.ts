import { Router } from "express";
import {getBooks,addBook,sendNotification, getNotification}  from "../controller/user";
import { auth } from "../middleware/auth";

const router=Router();

router.get('/getBooks',auth,getBooks);
router.post('/addBook',addBook);
router.post('/sendNotification',sendNotification);
router.get('/getNotification',getNotification)

export default router;