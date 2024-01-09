import { Router } from "express";
import {search}  from "../controller/search";

const router=Router();

router.post('/',search);

export default router;