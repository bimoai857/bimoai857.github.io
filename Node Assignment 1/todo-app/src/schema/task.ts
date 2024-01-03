import Joi from "joi";

// Validation schema for POST /tasks
export const addTaskSchema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string(),
  });
  
  // Validation schema for GET /tasks/search
export  const searchTaskSchema = Joi.object({
    searchTerm: Joi.string().required(),
  });
