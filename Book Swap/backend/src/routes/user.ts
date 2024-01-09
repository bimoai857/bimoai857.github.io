import { Router } from "express";
import {getBooks,addBook}  from "../controller/user";

const router=Router();

router.get('/getBooks/:userId',getBooks);
router.post('/addBook',addBook);
// router.get('/getNotifications',getNotifications);

export default router;