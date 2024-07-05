let taskInput = document.querySelector(`.container form .input`);
let addTaskBtn = document.querySelector(`.container form .add`);
let tasksBox = document.querySelector(`.container .tasks-box`);
let tasksList = document.querySelector(`.container .tasks-box .tasks-list`);
let noTasksMsg = document.querySelector(`.container .tasks-box h4`);

window.onload = () => taskInput.focus();

if (localStorage.tasks) {
  noTasksMsg.style.display = "none";
  let tasks = JSON.parse(localStorage.getItem("tasks"));
  tasks.forEach((taskText) => {
    addTaskToDOM(taskText);
  });
}

addTaskBtn.addEventListener("click", function (e) {
  e.preventDefault();
  if (taskInput.value) {
    noTasksMsg.style.display = "none";
    let taskText = taskInput.value;
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push(taskText);
    localStorage.setItem("tasks", JSON.stringify(tasks));

    addTaskToDOM(taskText);
    taskInput.value = "";
    taskInput.focus();
  }
});

function addTaskToDOM(taskText) {
  let task = document.createElement("li");
  task.className = "task";
  
  let taskTextElement = document.createElement("p");
  taskTextElement.className = "task-text";
  taskTextElement.textContent = taskText;
  
  let dltBtn = document.createElement("button");
  dltBtn.className = "dlt-btn";
  dltBtn.textContent = "Delete";
  dltBtn.addEventListener("click", dltTask);

  task.appendChild(taskTextElement);
  task.appendChild(dltBtn);
  tasksList.appendChild(task);
}

function dltTask() {
  let task = this.parentElement;
  let taskText = task.querySelector(".task-text").textContent;
  let tasks = JSON.parse(localStorage.getItem("tasks"));
  tasks = tasks.filter(t => t !== taskText);
  if (tasks.length === 0) {
    localStorage.removeItem("tasks");
    noTasksMsg.style.display = "block";
  } else {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }
  task.remove();
}