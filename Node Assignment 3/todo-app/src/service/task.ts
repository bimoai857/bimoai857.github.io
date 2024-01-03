import { Request } from 'express';
import TaskModel from '../model/task';

export const getAllTasks = async () => {

    const data = await TaskModel.getAllTasks();

    return data;

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