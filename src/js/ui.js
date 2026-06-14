import { formatDate } from "./utils.js";

export class UI {
  constructor() {
    this.taskList =
      document.getElementById("taskList");

    this.totalTasks =
      document.getElementById("totalTasks");

    this.completedTasks =
      document.getElementById("completedTasks");

    this.pendingTasks =
      document.getElementById("pendingTasks");
  }

  renderTasks(tasks) {
    this.taskList.innerHTML = "";

    if (tasks.length === 0) {
      this.renderEmptyState();
      return;
    }

    tasks.forEach(task => {
      const taskElement =
        this.createTaskElement(task);

      this.taskList.appendChild(
        taskElement
      );
    });
  }

  createTaskElement(task) {
    const li =
      document.createElement("li");

    li.className =
      `task priority-${task.priority}`;

    li.dataset.id = task.id;

    if (task.completed) {
      li.classList.add("completed");
    }

    li.innerHTML = `
    
      <div class="task-left">

        <input
          type="checkbox"
          class="toggle-task"
          ${task.completed ? "checked" : ""}
        >

        <div class="task-content">

          <span class="task-title">
            ${task.title}
          </span>

          <span class="task-date">
            Criada em:
            ${formatDate(
              new Date(task.createdAt)
            )}
          </span>

        </div>

      </div>

      <div class="task-actions">

        <button
          class="action-btn edit-btn"
          title="Editar"
        >
          ✏️
        </button>

        <button
          class="action-btn delete-btn"
          title="Excluir"
        >
          🗑️
        </button>

      </div>

    `;

    return li;
  }

  renderEmptyState() {
    this.taskList.innerHTML = `
    
      <div class="empty-state">

        <h3>
          Nenhuma tarefa encontrada
        </h3>

        <p>
          Adicione sua primeira tarefa.
        </p>

      </div>
    
    `;
  }

  updateStats(stats) {
    this.totalTasks.textContent =
      stats.total;

    this.completedTasks.textContent =
      stats.completed;

    this.pendingTasks.textContent =
      stats.pending;
  }

  setActiveFilter(filter) {
    document
      .querySelectorAll(".filter-btn")
      .forEach(btn => {
        btn.classList.remove("active");

        if (
          btn.dataset.filter === filter
        ) {
          btn.classList.add("active");
        }
      });
  }
}