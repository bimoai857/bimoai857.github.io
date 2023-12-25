//DOM Elements
const addTodoForm: HTMLDivElement | null = document.querySelector(".add-todo-wrapper form");
const filterButtons:NodeListOf<HTMLButtonElement> |null= document.querySelectorAll(".filter");
const searchTodoForm: HTMLDivElement | null = document.querySelector(".search-wrapper form");

// Imports
import Todo from "./todo";


// Todo Object
const todo=new Todo();

// Event Listeners
addTodoForm?.addEventListener("submit", todo.addTask);
searchTodoForm?.addEventListener("submit", todo.searchTask);
filterButtons?.forEach((btn) => btn.addEventListener("click", todo.filterTask));
document.getElementById("filterDropdown")?.addEventListener("change", todo.filterTask);