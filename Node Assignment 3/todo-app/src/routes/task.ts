import { Router } from "express";
import { addTask, deleteTask, filterTasks, getAllTasks, searchTask, toggleTaskStatus } from "../controller/task";
import { validateReqBody, validateReqQuery } from "../middleware/validator";
import { addTaskSchema, searchTaskSchema } from "../schema/task";

const router=Router();

router.get('/',getAllTasks);
router.post('/',validateReqBody(addTaskSchema),addTask);
router.get('/filter/:filterId',filterTasks);
router.get('/search',validateReqQuery(searchTaskSchema),searchTask);
router.delete('/:id',deleteTask);
router.patch('/:id',toggleTaskStatus);



export default router;