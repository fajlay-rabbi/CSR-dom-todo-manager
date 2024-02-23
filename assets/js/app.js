const root = document.getElementById("root");
const container = document.createElement("div");
container.classList.add("container");

// Navbar
const header = document.createElement("header");
const navbar = document.createElement("nav");
navbar.classList.add("navbar");

const navDiv1 = document.createElement("div");
navDiv1.classList.add("nav-logo");
const logo = document.createElement("p");
logo.classList.add("logo");
logo.innerText = "DOM";

const navDiv2 = document.createElement("div");
navDiv2.classList.add("nav-links");
const links = document.createElement("ul");
links.classList.add("nav-link-list");
const navLink1 = document.createElement("li");
const navLink2 = document.createElement("li");
navLink1.innerText = "Home";
navLink2.innerText = "TODO";

navDiv1.appendChild(logo);
links.appendChild(navLink1);
links.appendChild(navLink2);
navDiv2.appendChild(links);
navbar.appendChild(navDiv1);
navbar.appendChild(navDiv2);
header.appendChild(navbar);

// Main
const main = document.createElement("main");

const todoContainer = document.createElement("div");
todoContainer.classList.add("todo-container");
const title = document.createElement("h3");
title.classList.add("todo-title");
title.innerText = "Add Your Task 👻";
const todoForm = document.createElement("div");
todoForm.classList.add("todo-form");
const input = document.createElement("input");
input.setAttribute("type", "text");
input.setAttribute("name", "todo");
input.setAttribute("placeholder", "Enter your todo...");
input.classList.add("todo-input");
const btn = document.createElement("button");
btn.innerText = "ADD";
btn.setAttribute("type", "submit");
btn.classList.add("todo-btn");
const todoList = document.createElement("div");
todoList.classList.add("todo");
const todoUl = document.createElement("ul");
todoUl.classList.add("todo-list");
todoList.appendChild(todoUl);

todoContainer.appendChild(title);
todoForm.appendChild(input);
todoForm.appendChild(btn);
todoContainer.appendChild(todoForm);
todoContainer.appendChild(todoList);
main.appendChild(todoContainer);

//Creating app
container.appendChild(header);
container.appendChild(main);

root.appendChild(container);


// Logic Buildings and Event Listeners
const completed = JSON.parse(localStorage.getItem('completedTodos')) || [];
const completedTodos = completed;

const renderTodoList = () => {
    todoUl.innerHTML = "";

    todoArray.forEach((task, index) => { 
        const todoItem = document.createElement("li");
        todoItem.setAttribute("data-key", index);
        todoItem.classList.add("todo-item");
        todoItem.classList.add(completedTodos.includes(task) ? "faded" : "ok");
        const todoText = document.createElement("input");
        todoText.setAttribute("name", task);
        todoText.classList.add(completedTodos.includes(task) ? "completed" : "ok");
        todoText.setAttribute("type", "text");
        todoText.setAttribute("value", task);
        todoText.setAttribute("readonly", "true");

        const todoItemIcon = document.createElement("div"); 
        todoItemIcon.classList.add("todo-icon");

        const editBtn = document.createElement("i");
        editBtn.classList.add("fa-regular", "fa-pen-to-square");

        const todoDelBtn = document.createElement("i");
        todoDelBtn.classList.add("fa-regular", "fa-trash-can");

        const checkBtn = document.createElement("i");
        checkBtn.classList.add("fa-regular", completedTodos.includes(task) ? "fa-square-check" : "fa-square");


        todoItem.appendChild(todoText);
        todoItemIcon.appendChild(editBtn);
        todoItemIcon.appendChild(todoDelBtn);
        todoItemIcon.appendChild(checkBtn);
        todoItem.appendChild(todoItemIcon);
        todoUl.appendChild(todoItem);
    });

};


const savedTodo = JSON.parse(localStorage.getItem("todoArray")) || [];
const todoArray = savedTodo;

if (todoArray.length > 0) {
    renderTodoList();
} else {
    todoUl.innerHTML = "<li class='noTodo'>🦉 No Pending Task!</li>";
}


btn.addEventListener("click", () => {
  if (input.value) {
    todoArray.push(input.value);
    localStorage.setItem('todoArray', JSON.stringify(todoArray));
    renderTodoList();
    input.value = "";
  }
});


todoUl.addEventListener('click', (event) => {
    const deleteBtn = event.target.closest('.fa-trash-can');
    const editBtn = event.target.closest('.fa-pen-to-square');
    const saveBtn = event.target.closest('.fa-check');
    const checkBtn = event.target.closest('.fa-square') || event.target.closest('.fa-square-check');
    if (deleteBtn) {
        const todoItem = deleteBtn.closest('.todo-item');
        const todoIndex = todoItem.getAttribute('data-key');
        if (todoIndex !== null) {
            const index = parseInt(todoIndex, 10);
            completedTodos.splice(completedTodos.indexOf(todoArray[index]), 1);
            localStorage.setItem('completedTodos', JSON.stringify(completedTodos));
            todoArray.splice(index, 1);
            localStorage.setItem('todoArray', JSON.stringify(todoArray));
            renderTodoList();
        }
    }
    if (editBtn) {
        const todoText = event.target.closest('.todo-item').querySelector('input[type=text]');
        const icon = event.target.closest('.todo-item').querySelector('i');
        icon.classList.remove("fa-regular", "fa-pen-to-square");
        icon.classList.add("fa-solid", "fa-check");
        todoText.removeAttribute("readonly");
        const currentValue = todoText.value;
        todoText.focus();
        todoText.setSelectionRange(currentValue.length, currentValue.length);
    }

    if (saveBtn) { 
        const todoText = event.target.closest('.todo-item').querySelector('input[type=text]');
        const icon = event.target.closest('.todo-item').querySelector('i');
        icon.classList.remove("fa-solid", "fa-check");
        icon.classList.add("fa-regular", "fa-pen-to-square");
        todoText.setAttribute("readonly", "true");

        const todoIndex = todoText.closest('.todo-item').getAttribute('data-key');
        if (todoIndex !== null) {
            const index = parseInt(todoIndex, 10);
            if (completedTodos.includes(todoArray[index])) {
                const inOfCom = completedTodos.indexOf(todoArray[index]);
                completedTodos[inOfCom] = todoText.value;
                localStorage.setItem('completedTodos', JSON.stringify(completedTodos));
            }
            todoArray[index] = todoText.value;
            localStorage.setItem('todoArray', JSON.stringify(todoArray));
            renderTodoList();
        }

    }

    if (checkBtn) {
        const todoItem = event.target.closest('.todo-item');
        const todoIndex = todoItem.getAttribute('data-key');
        const index = parseInt(todoIndex, 10);

        if (completedTodos.includes(todoArray[index])) {
            completedTodos.splice(completedTodos.indexOf(todoArray[index]), 1);
            localStorage.setItem('completedTodos', JSON.stringify(completedTodos));
            renderTodoList();
            
        } else {
            completedTodos.push(todoArray[index]);
            localStorage.setItem('completedTodos', JSON.stringify(completedTodos));
            renderTodoList();
        }

        const input = todoItem.querySelector('input[type=text]');
        input.classList.toggle("completed");
        todoItem.classList.toggle("faded");
    }
});
