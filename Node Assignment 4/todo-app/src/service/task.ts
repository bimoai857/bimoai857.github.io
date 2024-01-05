import { Request } from 'express';
import TaskModel from '../model/task';
import { FilterTasksQuery, GetAllTasksQuery, SearchTaskQuery } from '../interface/task';
import { buildMeta, getPaginationOptions } from '../util/pagination';

export const getAllTasks = async (query:GetAllTasksQuery) => {

    const {page,size}=query;

    const pageDetails=getPaginationOptions({page,size});
   
    const tasksPromise=TaskModel.getAllTasks({...pageDetails,...query});
    const countPromise=TaskModel.countAll(query);


    const [tasks,count] = await Promise.all([tasksPromise, countPromise]);

    const total = count.count;
    const meta = buildMeta(total, size, page);
  
    return {
      data: tasks,
      meta,
    };

}

export const addTask = async (req: Request) => {

    if (!req.body) {
        req.body.description = ''
    }

    const data = await TaskModel.addTask(req.body);
    return data;

}

export const filterTasks = async (params:FilterTasksQuery) => {

    const {page,size}=params;

    const pageDetails=getPaginationOptions({page,size});
   
    const tasksPromise=TaskModel.filterTasks({...pageDetails,...params});
    const countPromise=TaskModel.countAll(params);


    const [tasks,count] = await Promise.all([tasksPromise, countPromise]);

    const total = count.count;
    const meta = buildMeta(total, size, page);
  
    return {
      data: tasks,
      meta,
    };

   
}

export const searchTask = async (query: SearchTaskQuery) => {

    const {page,size}=query;

    const pageDetails=getPaginationOptions({page,size});
   
    const tasksPromise=TaskModel.searchTask({...pageDetails,...query});
    const countPromise=TaskModel.countAll(query);


    const [tasks,count] = await Promise.all([tasksPromise, countPromise]);

    const total = count.count;
    const meta = buildMeta(total, size, page);
  
    return {
      data: tasks,
      meta,
    };

}

export const deleteTask = async (id: String) => {

    await TaskModel.deleteTask(id);

}

export const toggleTaskStatus = async (id: String) => {

    const status = await TaskModel.toggleTaskStatus(id);
    
    return status;
}