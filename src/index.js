// This ensures that the script runs only after the HTML page has fully loaded.
document.addEventListener("DOMContentLoaded", () => {
  // taskForm: The form where users input tasks.
  // taskList: The <ul> where tasks will be displayed.
  // sortButton: The button that will trigger sorting.
  const taskForm = document.getElementById("create-task-form");
  const taskList = document.getElementById("tasks");
  const sortButton = document.getElementById("sort-button");
  // keep track of whether sorting should be in ascending or descending order.
  let ascending = true;
  // Prevent the default form submission (which refreshes the page).
  taskForm.addEventListener("submit", function (e) {
    e.preventDefault();
    // Retrieve values from the input fields.
    const description = document.getElementById("new-task-description").value;
    const user = document.getElementById("new-task-user").value;
    const duration = document.getElementById("new-task-duration").value;
    const dueDate = document.getElementById("new-task-due").value;
    const priority = document.getElementById("new-task-priority").value;
    // If the task description is empty, stop execution.
    if (!description.trim()) return;
      // Add the task.
      addTask(description, user, duration, dueDate, priority);
      // Reset the form fields.
      taskForm.reset();
  });
  // When clicked, sort tasks based on priority.
  sortButton.addEventListener("click", () => {
    sortTasks(ascending);
    // Flip ascending value for next click.
    ascending = !ascending;
  });
  // Create a new task and appends it to the task list.
  // Add "Edit" and "Delete" buttons.
  function addTask(description, user, duration, dueDate, priority) {
    const li = document.createElement("li");
    li.innerHTML = `
      <span class="task-text">${description} - ${user} - ${duration} hrs - Due: ${dueDate}</span>
      <span class="priority" style="display: none;">${priority}</span>
      <input type="text" class="edit-input" style="display: none;">
      <button class="edit-btn">Edit</button>
      <button class="delete-btn">X</button>
    `;
    // Call setPriorityColor() to color the text based on priority.
    setPriorityColor(li, priority);
    taskList.appendChild(li);
    // Add an event listener to the delete button.
    li.querySelector(".delete-btn").addEventListener("click", () => li.remove());
    // Toggle between "Edit" and "Save" mode:
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
  // Map priority levels to colors:    High → Red   Medium → Orange   Low → Green
  function setPriorityColor(taskElement, priority) {
    const colors = {
      "high": "red",
      "medium": "orange",
      "low": "green"
    };
    taskElement.style.color = colors[priority] || "black";
  }
  // Sort the tasks based on priority.
  function sortTasks(ascending) {
    // Convert the <li> elements into an array.
    const tasksArray = Array.from(taskList.children);
    // Assign a numerical value to each priority.
    const priorityOrder = { "high": 1, "medium": 2, "low": 3 };
        tasksArray.sort((a, b) => {
      const aPriority = priorityOrder[a.querySelector(".priority").textContent.trim()];
      const bPriority = priorityOrder[b.querySelector(".priority").textContent.trim()];
      // If ascending is true: Sorts from High → Medium → Low. If ascending is false: Sorts from Low → Medium → High.
      return ascending ? aPriority - bPriority : bPriority - aPriority;
    });
    // Re-append sorted tasks to the list.
    tasksArray.forEach(task => taskList.appendChild(task));
  }
});