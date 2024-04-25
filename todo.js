let todoItemsContainer = document.getElementById("todoItemsContainer");
let addTodoEl = document.getElementById("addTodo");
let saveTodoEl = document.getElementById("saveTodo");
let userInputEl = document.getElementById("todoUserInput");
let saveTodoBtnEl = document.getElementById("saveTodoBtn");


function getTodoItemsFromStorage() {
    let storedItem = localStorage.getItem("todoItems");
    let parsedItem = JSON.parse(storedItem);

    if (parsedItem === null) {
        return []
    } else {
        return parsedItem
    }
}
let todoItems = getTodoItemsFromStorage();
let todoCount = todoItems.length;

saveTodoBtnEl.onclick = function() {
    localStorage.setItem("todoItems", JSON.stringify(todoItems));
}

function todoStatusChange(checkboxId, labelId, todoId) {
    let labelEl = document.getElementById(labelId);
    let checkboxEl = document.getElementById(checkboxId);

    labelEl.classList.toggle("checked");

    let todoitemIndex = todoItems.findIndex(function(eachTodo) {
        let eachTodoId = "todo" + eachTodo.uniqueNo
        if (eachTodoId === todoId) {
            return true
        } else {
            return false
        }
    })
    let todoObject = todoItems[todoitemIndex]

    if (todoObject.ischecked === true) {
        todoObject.ischecked = false
    } else {
        todoObject.ischecked = true
    }

}

function ondeleteTodo(todoId) {
    let todoEl = document.getElementById(todoId);
    todoItemsContainer.removeChild(todoEl);

    let deleteTodoIndex = todoItems.findIndex(function(eachTodo) {
        let eachTodoId = "todo" + eachTodo.uniqueNo;
        if (eachTodoId === todoId) {
            return true
        } else {
            return false
        }
    })
    todoItems.splice(deleteTodoIndex, 1);
}

function createTodoList(todoItem) {
    let todoId = "todo" + todoItem.uniqueNo;
    let checkboxId = "checkbox" + todoItem.uniqueNo;
    let labelId = "label" + todoItem.uniqueNo;

    let todoElement = document.createElement("li");
    todoElement.classList.add("todo-item-container", "d-flex", "flex-row");
    todoElement.id = todoId;
    todoItemsContainer.appendChild(todoElement);

    let inputElement = document.createElement("input");
    inputElement.type = "checkbox";
    inputElement.id = checkboxId;
    inputElement.classList.add("checkbox-input");
    inputElement.onclick = function() {
        todoStatusChange(checkboxId, labelId, todoId)
    }
    todoElement.appendChild(inputElement);

    let labelContainer = document.createElement("div");
    labelContainer.classList.add("label-container", "d-flex", "flex-row");
    todoElement.appendChild(labelContainer);

    let labelElement = document.createElement("label");
    labelElement.setAttribute("for", checkboxId);
    labelElement.classList.add("checkbox-label");
    labelElement.id = labelId;
    labelElement.textContent = todoItem.text;
    if (todoItem.ischecked === true) {
        labelElement.classList.add("checked")
    }
    labelContainer.appendChild(labelElement);

    let deleteIconContainer = document.createElement("div");
    deleteIconContainer.classList.add("delete-icon-container");
    labelContainer.appendChild(deleteIconContainer);

    let deleteIcon = document.createElement("i");
    deleteIcon.classList.add("far", "fa-trash-alt", "delete-icon");
    deleteIcon.onclick = function() {
        ondeleteTodo(todoId)
    }
    deleteIconContainer.appendChild(deleteIcon);
}


for (let Item of todoItems) {
    createTodoList(Item)
}

function addTodo() {
    let userInput = userInputEl.value;

    if (userInput === null) {
        alert("Enter Valid Text")
        return
    }
    todoCount = todoCount + 1;

    let newTodo = {
        text: userInput,
        uniqueNo: todoCount,
        ischecked: false
    };
    todoItems.push(newTodo);
    createTodoList(newTodo);
    userInputEl.value = "";
}

addTodoEl.onclick = function() {
    addTodo()
}