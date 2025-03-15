document.addEventListener("DOMContentLoaded", () => {
  const taskForm = document.getElementById("create-task-form");
  const taskList = document.getElementById("tasks");
  const sortButton = document.getElementById("sort-button");
  
  let ascending = true;

  taskForm.addEventListener("submit", function (e) {
    e.preventDefault();
    
    const description = document.getElementById("new-task-description").value;
    const user = document.getElementById("new-task-user").value;
    const duration = document.getElementById("new-task-duration").value;
    const dueDate = document.getElementById("new-task-due").value;
    const priority = document.getElementById("new-task-priority").value;

    if (!description.trim()) return;

    addTask(description, user, duration, dueDate, priority);
    taskForm.reset();
  });

  sortButton.addEventListener("click", () => {
    sortTasks(ascending);
    ascending = !ascending;
  });

  function addTask(description, user, duration, dueDate, priority) {
    const li = document.createElement("li");
    li.innerHTML = `
      <span class="task-text">${description} - ${user} - ${duration} hrs - Due: ${dueDate}</span>
      <span class="priority" style="display: none;">${priority}</span>
      <input type="text" class="edit-input" style="display: none;">
      <button class="edit-btn">Edit</button>
      <button class="delete-btn">X</button>
    `;

    setPriorityColor(li, priority);
    taskList.appendChild(li);

    li.querySelector(".delete-btn").addEventListener("click", () => li.remove());

    const editBtn = li.querySelector(".edit-btn");
    const editInput = li.querySelector(".edit-input");
    const taskText = li.querySelector(".task-text");

    editBtn.addEventListener("click", () => {
      if (editBtn.textContent === "Edit") {
        editInput.style.display = "inline";
        editInput.value = taskText.textContent;
        taskText.style.display = "none";
        editBtn.textContent = "Save";
      } else {
        taskText.textContent = editInput.value;
        editInput.style.display = "none";
        taskText.style.display = "inline";
        editBtn.textContent = "Edit";
      }
    });
  }

  function setPriorityColor(taskElement, priority) {
    const colors = {
      "high": "red",
      "medium": "orange",
      "low": "green"
    };
    taskElement.style.color = colors[priority] || "black";
  }

  function sortTasks(ascending) {
    const tasksArray = Array.from(taskList.children);
    const priorityOrder = { "high": 1, "medium": 2, "low": 3 };

    tasksArray.sort((a, b) => {
      const aPriority = priorityOrder[a.querySelector(".priority").textContent.trim()];
      const bPriority = priorityOrder[b.querySelector(".priority").textContent.trim()];

      return ascending ? aPriority - bPriority : bPriority - aPriority;
    });

    tasksArray.forEach(task => taskList.appendChild(task));
  }
});