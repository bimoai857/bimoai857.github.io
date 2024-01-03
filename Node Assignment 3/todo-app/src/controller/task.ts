import { Request, Response, NextFunction } from "express";
import * as taskService from '../service/task';


export const getAllTasks = async (req: Request, res: Response) => {

    const data = await taskService.getAllTasks();

    return res.status(200).json({
        data: {
            tasks: data
        }
    });
}

export const addTask = async (req: Request, res: Response) => {

    const data = await taskService.addTask(req);

    if (data) {
        return res.status(200).json({
            status: 'Record Added Successfully!!!',
            data: {
                tasks: data
            }
        });
    }

}

export const filterTasks = async (req: Request, res: Response, next: NextFunction) => {

    const filterId = req.params.filterId;

    try {
        const data = await taskService.filterTasks(filterId);
        return res.status(200).json({
            data
        })
    }
    catch (error) {
        next(error);
    }



}

export const searchTask = async (req: Request, res: Response, next: NextFunction) => {

    const searchTerm: any = req.query.searchTerm;


    try {
        const data = await taskService.searchTask(searchTerm);

        return res.status(200).json({
            data
        })

    }
    catch (error) {
        next(error);
    }

}


export const deleteTask = async (req: Request, res: Response, next: NextFunction) => {
    
    const id = req.params.id;

    try {
        await taskService.deleteTask(id);

        return res.status(200).json({
            status: "Record Deleted Successfully!!"
        })
    }
    catch (error) {
        next(error)
    }


}

export const toggleTaskStatus = async (req: Request, res: Response) => {

    const id = req.params.id;

    const status = await taskService.toggleTaskStatus(id);

    return res.status(200).json({
        data: {
            status: status
        }
    })


}

