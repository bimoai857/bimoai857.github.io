import { Request } from 'express';
import TaskModel from '../model/task';
import { GetAllTasksQuery } from '../interface/task';
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

export const filterTasks = async (filterId: String) => {

    const data = await TaskModel.filterTasks(filterId);

    return data;
}

export const searchTask = async (searchTerm: String) => {

    const data = await TaskModel.searchTask(searchTerm);

    return data;

}

export const deleteTask = async (id: String) => {

    await TaskModel.deleteTask(id);

}

export const toggleTaskStatus = async (id: String) => {

    const status = await TaskModel.toggleTaskStatus(id);
    
    return status;
}