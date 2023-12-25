//Dom Elements
const todosWrapper: HTMLDivElement | null = document.querySelector(".todos-wrapper");
const addTodoTitleInput: HTMLInputElement | null = document.querySelector(".add-todo-title");
const addTodoDescInput: HTMLInputElement | null = document.querySelector(".add-todo-desc");
const searchTodoInput: HTMLInputElement | null = document.querySelector(".search-todos");
const filterDropdown: HTMLSelectElement | null = document.getElementById("filterDropdown")as HTMLSelectElement;

// Imports
import { Task } from "./utility";

// Todo Class definition
export default class Todo{

    currentTodoList:Task[]=[];

    // Adds task
    addTask=(addTaskEvent:Event):void=>{
      
        addTaskEvent.preventDefault();

        if(addTodoTitleInput && addTodoDescInput && addTodoTitleInput.value){
            this.currentTodoList.push({
                id:Date.now(),
                title:addTodoTitleInput.value,
                description:addTodoDescInput.value?addTodoDescInput.value:'',
                complete:false
            }
            )
            this.renderTodoList();
            addTodoTitleInput.value="";
            addTodoDescInput.value=""
        }  
    }

    // Delete Task
    deleteTask=(taskId:number):void=>{
        this.currentTodoList=this.currentTodoList.filter((task:Task)=>{
            return task.id!==taskId
        })
        this.renderTodoList()
    }

    // Toggle Task Completion
    toggleTaskComplete=(taskId:number):void=>{
        this.currentTodoList.forEach((task:Task)=>{
            if(task.id==taskId){
                task.complete=!task.complete
            }
        })
        this.renderTodoList()
    }

    // Filters Tasks
    filterTask=():void=>{
        const filter = filterDropdown?.value;

        let filteredTodos;
      
        switch (filter) {
          case "all":
            filteredTodos = this.currentTodoList;
            break;
      
          case "unfinished":
            filteredTodos = this.currentTodoList.filter(function (task:Task) {
              return !task.complete;
            });
            break;
      
          case "finished":
            filteredTodos = this.currentTodoList.filter(function (task:Task) {
              return task.complete;
            });
            break;
        }
      
        // Re-render todos
        this.renderTodoList(filteredTodos);
    }

    // Search Tasks
    searchTask=(searchTaskEvent:Event): void=>{
        searchTaskEvent.preventDefault();
        const query = searchTodoInput?.value.trim().toLowerCase();
      
        const filteredTodos = this.currentTodoList.filter(function (task) {
          const title = task.title.toLowerCase();
          const desc = task.description.toLowerCase();

        if(query){
            return title.includes(query) || desc.includes(query);
        }
         
        });
      
        // Re-render todos
        this.renderTodoList(filteredTodos);
    }

    // Renders Tasks
    renderTodoList = (filteredTodoList: Task[] = this.currentTodoList): void => {
        todosWrapper ? (todosWrapper.innerHTML = '') : null;
    
        filteredTodoList.forEach((task: Task):void => {
            const taskDivElement: HTMLDivElement = document.createElement('div');
            taskDivElement.classList.add('todo-item');
            taskDivElement.innerHTML = `
                <div class="todo-title-wrapper">
                    <div class="title-checkbox">
                        <h4>${task.title}</h4>
                        <p>${task.description}</p>
                    </div>
                    <div>
                        <button class="${task.complete ? 'finished' : 'unfinished'}">
                            ${task.complete ? 'Finished' : 'Unfinished'}
                        </button>
                        <button>Delete</button>
                    </div>
                </div>
            `;
            todosWrapper?.appendChild(taskDivElement);
    
            // Bind the methods to the buttons
            const buttons = taskDivElement.querySelectorAll('button');
            buttons[0].addEventListener('click', () => this.toggleTaskComplete(task.id));
            buttons[1].addEventListener('click', () => this.deleteTask(task.id));
        });
    };
    
    
}
