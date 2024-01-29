const todoTask = document.querySelector("#task-bar"); // this is the inpput
const formElement = document.querySelector("form"); // task bar + submit button
const ul = document.querySelector("ul"); // empty ul

// load pre-existing items from localStorage, if the user is new then the todo list is empty
let initialTodoList = localStorage.getItem("items")
  ? JSON.parse(localStorage.getItem("items"))
  : [];

// function for adding pre-existing li to ul
function addNewTask(text) {
  const li = document.createElement("li");
  const checkbox = document.createElement("input");
  const removeBtn = document.createElement("button");

  checkbox.type = "checkbox";
  li.textContent = text + " ";
  removeBtn.innerText = "REMOVE";

  if (text.length !== text.trimEnd().length) {
    li.classList.add("line-through-text");
    checkbox.checked = true;
  }

  li.prepend(checkbox);
  li.append(removeBtn);
  li.setAttribute("type", "checkbox");
  ul.appendChild(li);
}

if (initialTodoList.length > 0) {
  for (let i = 0; i < initialTodoList.length; i++) {
    addNewTask(initialTodoList[i]);
  }
}

// adding a todo to a the TODO list
formElement.addEventListener("submit", function (event) {
  event.preventDefault();

  const newLi = document.createElement("li");
  const checkbox = document.createElement("input");
  const removeBtn = document.createElement("button");

  checkbox.type = "checkbox";
  newLi.innerText = todoTask.value + " ";
  removeBtn.innerText = "REMOVE";

  newLi.prepend(checkbox);
  newLi.append(removeBtn);
  newLi.setAttribute("type", "checkbox");
  ul.append(newLi);
  // saving the task to the local storage
  initialTodoList.push(todoTask.value);
  localStorage.setItem("items", JSON.stringify(initialTodoList));

  todoTask.value = "";
});

// after click the remove button the local storage will delete the task from its memory
function removeTaskFromLocalStorage(task) {
  // Find the index of the task in the array
  const indexToRemove = initialTodoList.indexOf(task);

  // Remove the task if it exists in the array
  if (indexToRemove !== -1) {
    initialTodoList.splice(indexToRemove, 1);

    // Save the updated array back to local storage
    localStorage.setItem("items", JSON.stringify(initialTodoList));
  }
}

// add a space after the text if the task is completed and update the list in the local storage
function updateCompletedItemInLocalStorage(completedItem) {
  // Find the index of the task in the array
  const indexOfItemToChange = initialTodoList.indexOf(completedItem);

  // Check if the item is found in the array
  if (indexOfItemToChange !== -1) {
    // Get the item from the array
    let itemToChange = initialTodoList[indexOfItemToChange];

    // Adding a space add the end of the task if it exists in the array
    initialTodoList[indexOfItemToChange] = itemToChange + " ";

    // Save the updated array back to local storage
    localStorage.setItem("items", JSON.stringify(initialTodoList));
  }
}

// remove a space after the text if the task is turned to not completed and update the list in the local storage
function updateNotCompletedItemInLocalStorage(notCompletedItem) {
  // Find the index of the task in the array
  const indexOfItemToChange = initialTodoList.indexOf(notCompletedItem + " ");

  // Check if the item is found in the array
  if (indexOfItemToChange !== -1) {
    // Get the item from the array
    let itemToChange = initialTodoList[indexOfItemToChange];

    // Adding a space add the end of the task if it exists in the array
    initialTodoList[indexOfItemToChange] = itemToChange.slice(
      0,
      itemToChange.length - 1
    );

    // Save the updated array back to local storage
    localStorage.setItem("items", JSON.stringify(initialTodoList));
  }
}

ul.addEventListener("click", function (event) {
  // remove a todo
  if (event.target.innerText === "REMOVE") {
    event.target.parentElement.remove();
    if (
      event.target.parentElement.getAttribute("class") === "line-through-text"
    ) {
      // -6 not -7 because I want to have the extra space
      removeTaskFromLocalStorage(
        event.target.parentElement.innerText.slice(
          0,
          event.target.parentElement.innerText.length - 6
        )
      );
    } else {
      // using the slice method because when I use .innerText it will show 'REMOVE' from the remove
      removeTaskFromLocalStorage(
        event.target.parentElement.innerText.slice(
          0,
          event.target.parentElement.innerText.length - 7
        )
      );
    }
  }

  // mark a todo as completed
  if (event.target.tagName === "INPUT") {
    event.target.parentElement.classList.toggle("line-through-text");
    if (
      event.target.parentElement.getAttribute("class") === "line-through-text"
    ) {
      updateCompletedItemInLocalStorage(
        event.target.parentElement.innerText.slice(
          0,
          event.target.parentElement.innerText.length - 7
        )
      );
    } else {
      updateNotCompletedItemInLocalStorage(
        event.target.parentElement.innerText.slice(
          0,
          event.target.parentElement.innerText.length - 7
        )
      );
    }
  }
});
