// Select elements
const todoInput = document.querySelector(".todo-input");
const submitButton = document.querySelector(".submit-btn");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");
const clearStorage = document.querySelector(".clear-storage");

// event listeners
document.addEventListener("DOMContentLoaded", getLocalTodos);
submitButton.addEventListener("click", addToDo);
todoList.addEventListener("click", deleteCheck);
filterOption.addEventListener("click", filterTodo);
clearStorage.addEventListener("click", clearLocalStorage);

function createCheckedButton() {
  // Create a Checked button
  const checkedButton = document.createElement("button");
  checkedButton.innerHTML = '<i class="fas fa-check"></i>';
  checkedButton.classList.add("checked-btn");
  return checkedButton;
}

function createDeleteButton() {
  // Create a delete button
  const deleteButton = document.createElement("button");
  deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
  deleteButton.classList.add("delete-btn");
  return deleteButton;
}

//functions
function addToDo(event) {
  // Prevent default form submitting
  event.preventDefault();

  if (todoInput.value !== "") {
    // Create a todo-item-container:
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    // Create the todo-item
    const newToDo = document.createElement("li");
    newToDo.innerText = todoInput.value;

    // Conditionally check to add to the localStorage
    if (
      localStorage.getItem("todos") === null ||
      (localStorage.getItem("todos") !== null &&
        !localStorage.getItem("todos").includes(todoInput.value))
    ) {
      // save to LocalStorage
      saveLocalTodos(todoInput.value);
    }

    // Add item to the container
    newToDo.classList.add("todo-item");
    todoDiv.appendChild(newToDo);

    // Create and append Checked button
    todoDiv.appendChild(createCheckedButton());

    // Create and append Delete Button
    todoDiv.appendChild(createDeleteButton());

    // Finally the todo-container to the todo-list
    todoList.appendChild(todoDiv);

    // clear the input field
    todoInput.value = "";
  }
}

function deleteCheck(e) {
  const item = e.target;
  // Delete Todo
  if (item.classList[0] === "delete-btn") {
    const todo = item.parentElement;
    // transition
    todo.classList.add("fade-out");
    removeLocalTodos(todo);
    todo.addEventListener("transitionend", function () {
      todo.remove();
    });
  }

  if (item.classList[0] === "checked-btn") {
    const todo = item.parentElement;
    todo.classList.toggle("completed");
  }
}

function filterTodo(e) {
  const todos = todoList.childNodes;

  todos.forEach((todo) => {
    switch (e.target.value) {
      case "all":
        todo.style.display = "flex";
        break;

      case "completed":
        if (todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
      case "not completed":
        if (!todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
    }
  });
}

// Check initially if we already have any todos
function checkForLocalStorage(todos) {
  if (localStorage.getItem("todos") === null) {
    return (todos = []);
  } else {
    return (todos = JSON.parse(localStorage.getItem("todos")));
  }
}

// save todos in LocalStorage
function saveLocalTodos(todo) {
  // Check initially if we already have any todos
  let todos;
  todos = checkForLocalStorage(todos);

  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function removeLocalTodos(todo) {
  let todos;
  todos = checkForLocalStorage(todos);

  const todoIndex = todo.children[0].innerText;
  todos.splice(todos.indexOf(todoIndex), 1);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function getLocalTodos() {
  let todos;
  todos = checkForLocalStorage(todos);

  todos.forEach((todo) => {
    if (todo !== "") {
      // Create a todo-item-container:
      const todoDiv = document.createElement("div");
      todoDiv.classList.add("todo");

      // Create the todo-item
      const newToDo = document.createElement("li");
      newToDo.innerText = todo;
      newToDo.classList.add("todo-item");
      todoDiv.appendChild(newToDo);

      // Create and append Checked button
      todoDiv.appendChild(createCheckedButton());

      // Create and append Delete Button
      todoDiv.appendChild(createDeleteButton());

      // Finally the div to the todo-list
      todoList.appendChild(todoDiv);
    }
  });
}

// Clear the localStorage object
function clearLocalStorage() {
  localStorage.clear();
}
