import { PaginationQuery } from "./pagination";

export interface ITask {
    title: string;
    description:string;
    status:boolean;
  }
  
  export interface GetAllTasksQuery extends PaginationQuery{
    startDate: string;
    endDate: string;
  }

  export interface FilterTasksQuery extends PaginationQuery{
    filterId:string;
    startDate: string;
    endDate: string;
  }