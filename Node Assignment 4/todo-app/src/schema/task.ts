import Joi from "joi";
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from "../constant/pagination";

// Validation schema for POST /tasks
export const addTaskSchema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string(),
  });


// Validation schema for GET /tasks/
export  const getAllTasksSchema = Joi.object({
  page:Joi.number().integer().min(1).default(DEFAULT_PAGE),
  
  size:Joi.number().integer().min(1).max(40).default(DEFAULT_PAGE_SIZE),

  startDate:Joi.date().iso(),

  endDate:Joi.date().iso()
});

// Validation schema for GET /tasks/filter/:filterId
export  const filterTasksSchema = Joi.object({

  filterId: Joi.string(),

  page:Joi.number().integer().min(1).default(DEFAULT_PAGE),
  
  size:Joi.number().integer().min(1).max(40).default(DEFAULT_PAGE_SIZE),

  startDate:Joi.date().iso(),

  endDate:Joi.date().iso()
});
  
  // Validation schema for GET /tasks/search
export  const searchTaskSchema = Joi.object({
    searchTerm: Joi.string().required(),
  });
