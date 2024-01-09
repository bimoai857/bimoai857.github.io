import { Router } from "express";
import auth from './auth'
import user from './user'
import search from './search'

const router=Router();

router.use('/auth',auth);
router.use('/user',user);
router.use('/search',search);

export default  router;