document.addEventListener("DOMContentLoaded", () => {
  
  const taskList = new TaskList();
  
  const taskForm = document.getElementById("create-task-form");
  
  const newTaskDescription = document.getElementById("new-task-description");

  const taskNewList = document.getElementById("tasks");

  const renderApp = () => (taskNewList.innerHTML = taskList.renderTasks());

  taskForm.addEventListener("submit", (e) => {
    e.preventDefault();
    taskList.createNewTask(newTaskDescription.value);
    e.target.reset();
    renderApp();
  });

  taskNewList.addEventListener("click", (e) => {
    if (e.target.nodeName === "BUTTON") {
      taskList.deleteTask(e.target.dataset.description);
      renderApp();
    }
  });
});

class Task {
  constructor(description) {
    this.description = description;
  }
  render() {
    return `
      <li>
        ${this.description}
        <button data-description="${this.description}">X</button>
      </li>
      `;
  }
}
class TaskList {
  constructor() {
    this.tasks = [];
  }

  createNewTask(description) {
    const newTask = new Task(description);
    this.tasks.push(newTask);
  }

  renderTasks() {
    return this.tasks.map((task) => task.render()).join("");
  }

  deleteTask(description) {
    this.tasks = this.tasks.filter((task) => task.description !== description);
  }
}