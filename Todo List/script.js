// Select Elements
const todosWrapper = document.querySelector(".todos-wrapper");
const addTodoTitleInput = document.querySelector(".add-todo-title");
const addTodoDescInput = document.querySelector(".add-todo-desc");
const addTodoForm = document.querySelector(".add-todo-wrapper form");
const searchTodoInput = document.querySelector(".search-todos");
const searchTodoForm = document.querySelector(".search-wrapper form");
const filterButtons = document.querySelectorAll(".filter");

let todos = [];

// Add Todo
function addTodo(e) {
  e.preventDefault();

  addTodoTitleInput.value?
  todos.push({
    id: Date.now(),
    title: addTodoTitleInput.value,
    description: addTodoDescInput.value,
    complete: false,
  }):null;

  renderTodos();

  addTodoTitleInput.value = "";
  addTodoDescInput.value = "";
}

// Delete Todo
function deleteTodo(id) {
  todos = todos.filter(function (todo) {
    return todo.id !== id;
  });

  renderTodos();
}

// Toggle Complete
function toggleTodo(id) {
  todos.forEach(function (todo) {
    if (todo.id == id) {
      todo.complete = !todo.complete;
    }
  });

  renderTodos();
}

// Filter Todos
function filterTodos(e) {
  const filterDropdown = document.getElementById("filterDropdown");
  const filter = filterDropdown.value;

  let filteredTodos;

  switch (filter) {
    case "all":
      filteredTodos = todos;
      break;

    case "unfinished":
      filteredTodos = todos.filter(function (todo) {
        return !todo.complete;
      });
      break;

    case "finished":
      filteredTodos = todos.filter(function (todo) {
        return todo.complete;
      });
      break;
  }

  // Re-render todos
  renderTodos(filteredTodos);
}

// Search Todos
function searchTodos(e) {
  e.preventDefault();
  const query = searchTodoInput.value.trim().toLowerCase();

  const filteredTodos = todos.filter(function (todo) {
    const title = todo.title.toLowerCase();
    const desc = todo.description.toLowerCase();

    return title.includes(query) || desc.includes(query);
  });

  // Re-render todos
  renderTodos(filteredTodos);
}

// Render Todos
function renderTodos(filteredTodos = todos) {
  todosWrapper.innerHTML = "";

  filteredTodos.forEach(function (todo) {
    const checked = todo.complete ? "checked" : "";

    const item = document.createElement("div");
    item.classList.add("todo-item");
    item.innerHTML = `
        <div class="todo-title-wrapper">
            <div class="title-checkbox">
               
                <h4 >
                    ${todo.title}
                </h4>
                <p>${todo.description}</p>
            </div>
            <div>
            <button onclick="toggleTodo(${todo.id})"
            class="${todo.complete ? 'finished' : 'unfinished'}">
            ${todo.complete ? "Finished" : "Unfinished"}
          </button>
          <button onclick="deleteTodo(${todo.id})">Delete</button>
        </div>
    `;

    todosWrapper.appendChild(item);
  });
}

// Event Listeners
addTodoForm.addEventListener("submit", addTodo);
searchTodoForm.addEventListener("submit", searchTodos);
filterButtons.forEach((btn) => btn.addEventListener("click", filterTodos));
document.getElementById("filterDropdown").addEventListener("change", filterTodos);
