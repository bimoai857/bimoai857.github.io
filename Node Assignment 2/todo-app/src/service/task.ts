import { Request } from 'express';
import *  as taskModel from '../model/task'

export const getAllTasks= async()=>{
    try{
      
        const data=await taskModel.getAllTasks();
      
        return {
            data:{
                tasks:data.rows
            }
        }
    }
    catch(err){
        console.log(err);
    }
}

export const addTask= async(req:Request)=>{
    try{
        if(!req.body){
            req.body.description=''
        }
        
        const data=await taskModel.addTask(req);

        if(data){
            return data.rows;
        }
    }
    catch(err){
        console.log(err);
    }
}

export const filterTasks= async (filterId:String)=>{
    const data=await taskModel.filterTasks(filterId);

    return data?.rows;
}

export const searchTask=async(searchTerm:String)=>{
   
    const data=await taskModel.searchTask(searchTerm);

    return data.rows;

}

export const deleteTask=async(id:String)=>{
   
    const data=await taskModel.deleteTask(id);
    

}

export const toggleTaskState=async(id:String)=>{
    const status=await taskModel.toggleTaskState(id);
    return status;
}