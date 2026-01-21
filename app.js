let deleteTask = document.querySelector("i");
let task1 = document.querySelector(".task");
let taskInput = document.querySelector(".addsec .inputxt");
let priority = document.querySelector(".addsec .priority");
let addBtn = document.querySelector(".addsec .add");
let container = document.querySelector(".container");
let tasks = [];

deleteTask.addEventListener("click", () => {
  task1.remove();
});

/*  Local Storage Helpers */
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

/* Render Tasks */
function renderTasks() {
  container.querySelectorAll(".task").forEach((task) => task.remove());

  tasks.forEach((t) => {
    const task = document.createElement("div");
    task.className = `task ${t.priority}`;

    task.innerHTML = `
      <div class="element">
        <input type="checkbox" ${t.completed ? "checked" : ""}>
        <label>${t.text}</label>
      </div> 
      <i class="fa-regular fa-circle-xmark delete"></i>
    `;

    container.appendChild(task);
  });

  sortTasksByPriority();
}

/* Sort by Priority */
function sortTasksByPriority() {
  const highTasks = container.querySelectorAll(".task.high");
  const mediumTasks = container.querySelectorAll(".task.medium");
  const lowTasks = container.querySelectorAll(".task.low");

  container.querySelectorAll(".task").forEach((task) => task.remove());

  highTasks.forEach((task) => container.appendChild(task));
  mediumTasks.forEach((task) => container.appendChild(task));
  lowTasks.forEach((task) => container.appendChild(task));
}

/* Add Task */
addBtn.addEventListener("click", () => {
  if (taskInput.value.trim() === "") return;

  tasks.push({
    text: taskInput.value,
    priority: priority.value,
    completed: false,
  });

  saveTasks();
  renderTasks();

  taskInput.value = "";
});

/* Delete Task */
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete")) {
    const taskDiv = e.target.closest(".task");
    const text = taskDiv.querySelector("label").textContent;

    tasks = tasks.filter((t) => t.text !== text);
    saveTasks();

    taskDiv.remove();
  }
});

/* Completed */
document.addEventListener("change", (e) => {
  if (e.target.type === "checkbox") {
    const text = e.target.nextElementSibling.textContent;

    const task = tasks.find((t) => t.text === text);
    if (task) {
      task.completed = e.target.checked;
      saveTasks();
    }
  }
});

/* Load From LocalStorage */
const savedTasks = localStorage.getItem("tasks");

if (savedTasks) {
  tasks = JSON.parse(savedTasks);
  renderTasks();
}
