function getCurrentTime() {
  const now = new Date();
  return now.toLocaleString();
}

function addTask() {
  const taskInput = document.getElementById("taskInput");
  const taskText = taskInput.value.trim();

  if (taskText === "") {
    alert("Please enter a task!");
    return;
  }

  const li = document.createElement("li");

  const taskInfo = document.createElement("div");
  taskInfo.className = "task-info";
  const taskTitle = document.createElement("span");
  taskTitle.textContent = taskText;
  const taskTime = document.createElement("span");
  taskTime.className = "task-time";
  taskTime.textContent = "Added: " + getCurrentTime();
  taskInfo.appendChild(taskTitle);
  taskInfo.appendChild(taskTime);

  
  const completeBtn = document.createElement("button");
  completeBtn.textContent = "Complete";
  completeBtn.className = "complete-btn";
  completeBtn.onclick = () => completeTask(li, taskTitle);

  const editBtn = document.createElement("button");
  editBtn.textContent = "Edit";
  editBtn.className = "edit-btn";
  editBtn.onclick = () => editTask(taskTitle);

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";
  deleteBtn.className = "delete-btn";
  deleteBtn.onclick = () => li.remove();

  li.appendChild(taskInfo);
  li.appendChild(completeBtn);
  li.appendChild(editBtn);
  li.appendChild(deleteBtn);

  document.getElementById("pendingList").appendChild(li);
  taskInput.value = "";
}

function completeTask(li, taskTitle) {
  
  const taskInfo = li.querySelector(".task-info");
  const taskTime = taskInfo.querySelector(".task-time");
  taskTime.textContent = "Completed: " + getCurrentTime();

  
  li.querySelector(".complete-btn").remove();

  document.getElementById("completedList").appendChild(li);
}

function editTask(taskTitle) {
  const newTask = prompt("Edit your task:", taskTitle.textContent);
  if (newTask !== null && newTask.trim() !== "") {
    taskTitle.textContent = newTask;
  }
}
