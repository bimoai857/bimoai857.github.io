import { ITask } from "../interface/task";
import BaseModel from "./baseModel";


export default class TaskModel extends BaseModel {

  static async getAllTasks() {
    
    return this.queryBuilder()
      .select({
        id: "id",
        title: "title",
        description: "description",
        status: "status"
      })
      .from("tasks");
  }

  static async addTask(task: ITask) {

    return this.queryBuilder().insert(task).table("tasks");
  }

  static async filterTasks(filterId: String) {

    if (filterId === '0') {
      return this.getAllTasks();
    }

    const status = filterId === '1' ? false : true;

    return this.queryBuilder()
      .select({
        id: "id",
        title: "title",
        description: "description",
        status: "status"
      })
      .from("tasks")
      .where({ status: status })
  }

  static async searchTask(searchTerm: String) {

    return this.queryBuilder()
      .select({
        id: "id",
        title: "title",
        description: "description",
        status: "status"
      })
      .from("tasks")
      .where('title', 'ILIKE', `%${searchTerm}%`).orWhere('description', 'ILIKE', `%${searchTerm}%`)
      .first();
  }



  static async deleteTask(id: String) {

    return this.queryBuilder().table("tasks").where({ id }).del();
  }

  static async toggleTaskStatus(id: String) {

    const currentTask = await this.queryBuilder().table('tasks').where({ id }).first();

    const newStatus = !currentTask.status;

    return this.queryBuilder().table('tasks')
      .where({ id })
      .update({
        status: newStatus,
      })
      .returning('status');

  }
}

