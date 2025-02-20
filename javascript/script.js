let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let filter = "all";

function addTask() {
  let title = prompt("Enter task title:");
  if (title) {
    tasks.push({ id: Date.now(), title, completed: false });
    localStorage.setItem("tasks", JSON.stringify(tasks));
    renderTasks();
  }
}

function editTask(id) {
  let task = tasks.find((task) => task.id === id);
  if (task) {
    let newTitle = prompt("Edit task title:", task.title);
    if (newTitle !== null) {
      task.title = newTitle;
      localStorage.setItem("tasks", JSON.stringify(tasks));
      renderTasks();
    }
  }
}

function toggleTask(id) {
  tasks = tasks.map((task) =>
    task.id === id ? { ...task, completed: !task.completed } : task
  );
  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderTasks();
}

function deleteTask(id) {
  tasks = tasks.filter((task) => task.id !== id);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderTasks();
}

function setFilter(value) {
  filter = value;
  renderTasks();
}

function renderTasks() {
  let taskList = document.getElementById("taskList");
  let noTasksMessage = document.getElementById("noTasksMessage");
  taskList.innerHTML = "";
  let filteredTasks = tasks.filter((task) => {
    if (filter === "all") return true;
    if (filter === "completed") return task.completed;
    if (filter === "pending") return !task.completed;
  });

  if (filteredTasks.length === 0) {
    noTasksMessage.style.display = "block";
  } else {
    noTasksMessage.style.display = "none";
    filteredTasks.forEach((task) => {
      let div = document.createElement("div");
      div.className = `task ${task.completed ? "completed" : ""}`;
      div.innerHTML = `
                <input type="checkbox" ${
                  task.completed ? "checked" : ""
                } onchange="toggleTask(${task.id})">
                <span>${task.title}</span>
                <div class="task-actions">
                    <button class="view" onclick="toggleTask(${
                      task.id
                    })"><i class="fas fa-eye"></i></button>
                    <button class="edit" onclick="editTask(${
                      task.id
                    })"><i class="fas fa-pen"></i></button>
                    <button class="delete" onclick="deleteTask(${
                      task.id
                    })"><i class="fas fa-trash"></i></button>
                </div>
            `;
      taskList.appendChild(div);
    });
  }
}

document.addEventListener("DOMContentLoaded", renderTasks);

