import { Router } from "express";
import { addTask, deleteTask, filterTasks, getAllTasks, searchTask, toggleTaskState } from "../controller/task";

const router=Router();

router.get('/',getAllTasks);
router.post('/',addTask);
router.get('/filter/:filterId',filterTasks);
router.get('/search',searchTask);
router.delete('/:id',deleteTask);
router.patch('/:id',toggleTaskState);



export default router;