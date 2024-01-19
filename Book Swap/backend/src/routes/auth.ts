import { Router } from "express";
import {signup,login, refreshToken,checkAuth, logout}  from "../controller/auth";
import { auth } from "../middleware/auth";


const router=Router();

router.post('/signup',signup);
router.post('/login',login);
router.post('/refresh-token',refreshToken);
router.get('/logout',logout);
router.get('/me',auth,checkAuth);

export default router;