// import { ITask } from "../interface/task";
import { ISignUp } from "../interface/auth";
import BaseModel from "./baseModel";


export default class AuthModel extends BaseModel {

  static async checkUser(userName:string) {

    const query= await this.queryBuilder()
      .select('*').from("users").where("user_name",userName).first();
    console.log(query);
    return query;
  }
  static async save(signupDetails:ISignUp,hashedPassword:string) {
    
    await this.queryBuilder()
      .insert({
        first_name:signupDetails.firstName,
        last_name:signupDetails.lastName,
        user_name:signupDetails.userName,
        password:hashedPassword,
      }).into("users");

  }
}
// //   static async addTask(task: ITask) {

// //     return this.queryBuilder().insert(task).table("tasks");
// //   }

// //   static countAll(params: any) {
// //     const query = this.queryBuilder()
// //       .table("tasks")
// //       .count({ count: "id" })
// //       .first();

// //     if (params.startDate && params.endDate) {
// //       query
// //         .where("startDate", "<=", params.endDate)
// //         .where("endDate", ">=", params.startDate);
// //     }

// //     return query;
// //   }

// //   static async filterTasks(params: any) {

// //     if (params.filterId === '0') {
// //       return this.getAllTasks(params);
// //     }
// //     console.log(params);
// //     const status = params.filterId === '1' ? false : true;

// //       const query= this.queryBuilder()
// //       .select({
// //         id: "id",
// //         title: "title",
// //         description: "description",
// //         status: "status"
// //       })
// //       .from("tasks").where({status:status});

// //       query.offset(params.offset).limit(params.limit);

    
// //       if(params.startDate && params.endDate){
// //         query
// //         .where("startDate", "<=", params.endDate)
// //         .where("endDate", ">=", params.startDate);
// //       }

// //       return query;
// //   }

// //   static async searchTask(params: any) {

// //     const query= this.queryBuilder()
// //     .select({
// //       id: "id",
// //       title: "title",
// //       description: "description",
// //       status: "status"
// //     })
// //     .from("tasks").where('title', 'ILIKE', `%${params.searchTerm}%`).orWhere('description', 'ILIKE', `%${params.searchTerm}%`);

// //     query.offset(params.offset).limit(params.limit);
  
// //     if(params.startDate && params.endDate){
// //       query
// //       .where("startDate", "<=", params.endDate)
// //       .where("endDate", ">=", params.startDate);
// //     }

// //     return query;

// //   }



// //   static async deleteTask(id: String) {

// //     return this.queryBuilder().table("tasks").where({ id }).del();
// //   }

// //   static async toggleTaskStatus(id: String) {

// //     const currentTask = await this.queryBuilder().table('tasks').where({ id }).first();

// //     const newStatus = !currentTask.status;

// //     return this.queryBuilder().table('tasks')
// //       .where({ id })
// //       .update({
// //         status: newStatus,
// //       })
// //       .returning('status');

// //   }
// // }