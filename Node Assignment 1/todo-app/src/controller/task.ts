import { Request, Response } from "express";
import * as taskService from '../service/task';


export const getAllTasks= async (req:Request,res:Response)=>{

   const data=await taskService.getAllTasks();
 
   return res.status(200).json(data);
}

export const addTask=async (req:Request,res:Response)=>{
    
    const data=await taskService.addTask(req);

    if(data){
        return res.status(200).json({
            status:'Record Added Successfully!!!',
            data:{
                tasks:data
            }
        });
    }
   
}

export const filterTasks=async (req:Request,res:Response)=>{
    const filterId=req.params.filterId;

    const data=await taskService.filterTasks(filterId);
    console.log(data);

    return res.status(200).json({
        data
    })
}

export const searchTask=async (req:Request,res:Response)=>{

    const searchTerm:any=req.query.searchTerm;

    if(!searchTerm){
        return res.status(200).json({
            status:'Null search term!!'
        })
    }
    const data=await taskService.searchTask(searchTerm);

    if(data && data.length>0){
       return res.status(200).json({
            data
        })
    }

    return res.status(200).json({
        status:"Records Not found!!"
    })
}


export const deleteTask=async (req:Request,res:Response)=>{
    const id=req.params.id;

    const data=await taskService.deleteTask(id);
    if(data){
        return res.status(200).json({
            status:"Record Deleted Successfully!!"
        })
    }
    return res.status(200).json({
        status:"No record found!!"
    })
    
}

export const toggleTaskState=async (req:Request,res:Response)=>{

    const id=req.params.id;
    
    const status=await taskService.toggleTaskState(id);

    return res.status(200).json({
            data:{
                status:status
            }
        })
    

}

