import { Router } from "express";
import {signup,login,refreshToken}  from "../controller/auth";

const router=Router();


router.post('/signup',signup);
router.post('/login',login);
router.post('/refresh-token',refreshToken);

export default router;