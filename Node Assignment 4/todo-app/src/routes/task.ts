import { Router } from "express";
import { addTask, deleteTask, filterTasks, getAllTasks, searchTask, toggleTaskStatus } from "../controller/task";
import { validateReqBody, validateReqParams, validateReqQuery } from "../middleware/validator";
import { addTaskSchema, filterTasksSchema, getAllTasksSchema, searchTaskSchema } from "../schema/task";

const router=Router();

router.get('/',validateReqQuery(getAllTasksSchema),getAllTasks);
router.post('/',validateReqBody(addTaskSchema),addTask);
router.get('/filter/:filterId/:page?/:size?/:startDate?/:endDate?',validateReqParams(filterTasksSchema),filterTasks);
router.get('/search',validateReqQuery(searchTaskSchema),searchTask);
router.delete('/:id',deleteTask);
router.patch('/:id',toggleTaskStatus);



export default router;