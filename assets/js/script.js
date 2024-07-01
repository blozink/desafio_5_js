document.addEventListener("DOMContentLoaded", () => {
  const tasks = [
    { id: 16, description: "Estudiar para Desafio Latam", completed: true },
    {
      id: 60,
      description: "Prospectar clientes grandes para Venti",
      completed: false,
    },
    { id: 24, description: "Sacar a pasear a la Cali", completed: false },
  ];

  const taskList = document.getElementById("task-list");
  const totalTasks = document.getElementById("total-tasks");
  const completedTasks = document.getElementById("completed-tasks");
  const newTaskInput = document.getElementById("new-task");
  const addTaskButton = document.getElementById("add-task");

  const updateSummary = () => {
    totalTasks.textContent = tasks.length;
    completedTasks.textContent = tasks.filter((task) => task.completed).length;
  };

  const renderTasks = () => {
    taskList.innerHTML = `
            <li class="task-header">
                <span>ID</span>
                <span>Tarea</span>
                <span></span>
            </li>
        `;
    tasks.forEach((task) => {
      const li = document.createElement("li");
      li.className = `task ${task.completed ? "completed" : ""}`;
      li.innerHTML = `
                <span>${task.id}</span>
                <span class ="task-description">${task.description}</span>
                <span>
                    <label class="checkbox">
                        <input type="checkbox" ${
                          task.completed ? "checked" : ""
                        } onclick="toggleTask(${task.id})">
                    </label>
                    <button onclick="deleteTask(${task.id})">❌</button>
                </span>
            `;
      taskList.appendChild(li);
    });
    updateSummary();
  };

  window.deleteTask = (id) => {
    const index = tasks.findIndex((task) => task.id === id);
    if (index !== -1) {
      tasks.splice(index, 1);
      renderTasks();
    }
  };

  window.toggleTask = (id) => {
    const task = tasks.find((task) => task.id === id);
    if (task) {
      task.completed = !task.completed;
      renderTasks();
    }
  };

  addTaskButton.addEventListener("click", () => {
    const description = newTaskInput.value.trim();
    if (description) {
      const newTask = {
        id: tasks.length ? tasks[tasks.length - 1].id + 1 : 1,
        description,
        completed: false,
      };
      tasks.push(newTask);
      newTaskInput.value = "";
      renderTasks();
    }
  });

  renderTasks();
});
