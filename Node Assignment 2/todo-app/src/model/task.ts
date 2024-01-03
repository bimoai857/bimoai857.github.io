import db from '../db';
import { Request } from 'express';

import NotFoundException from '../error/notFoundException';
import NotValidException from '../error/notValidException';

export const getAllTasks=async ()=>{

    const data=await db.query('SELECT * from tasks');
   
    return data;
}

export const addTask=async (req:Request)=>{
    try{
        const data=await db.query('INSERT INTO tasks(title,description) VALUES($1,$2) RETURNING *',[req.body.title,req.body.description]);
        return data;
    }catch(err){
        console.log(err)
    }
}

export const searchTask=async (searchTerm:String)=>{
  
        console.log("model");
        const data=await db.query(`SELECT * FROM tasks WHERE title ILIKE $1 OR description ILIKE $1`, [`%${searchTerm}%`]);
        console.log(data);
        return data;
   
}

// 0 for All, 1 for Unfinished and 2 for Finished 
export const filterTasks=async (filterId:String)=>{
  
    if(filterId==='0'){
        return await db.query('SELECT * FROM tasks');
    }else if(filterId==='1'){
        return await db.query('SELECT * FROM tasks WHERE status=false');   
    }
    else if(filterId==='2'){
        return await db.query('SELECT * FROM tasks WHERE status=true');

    }
    else{
        throw new NotValidException(`The filter id ${filterId} is not valid.`);
    }
}

export const deleteTask=async (id:String)=>{

 
        const data=await db.query(`DELETE FROM tasks Where id=$1`, [id]);

        if(data && data.rowCount===0){
           throw new NotFoundException(`User with id ${id} not found!!`);
        }
    
  
}

export const toggleTaskState=async (id:String)=>{

    try{
        
        const result=await db.query(`UPDATE tasks SET 
        status= CASE
        WHEN status=true THEN false
        WHEN status=false THEN true
        END
        WHERE id=$1 RETURNING status`, [id]);
   
        return result.rows[0]?.status;
    }catch(err){
        console.log(err)
    }
}