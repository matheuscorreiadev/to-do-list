import { TaskManager } from "./taskManager.js";
import { UI } from "./ui.js";
import { Storage } from "./storage.js";
import {
  showToast,
  debounce
} from "./utils.js";

const taskManager = new TaskManager();
const ui = new UI();

const taskInput =
  document.getElementById("taskInput");

const prioritySelect =
  document.getElementById("priority");

const addTaskBtn =
  document.getElementById("addTaskBtn");

const searchInput =
  document.getElementById("searchInput");

const themeToggle =
  document.getElementById("themeToggle");

const taskList =
  document.getElementById("taskList");

let currentFilter = "all";

/* =========================
   RENDER
========================= */

function render() {
  let tasks =
    taskManager.getAllTasks();

  if (currentFilter !== "all") {
    tasks =
      taskManager.filterTasks(
        currentFilter
      );
  }

  const searchTerm =
    searchInput.value.trim();

  if (searchTerm) {
    tasks = tasks.filter(task =>
      task.title
        .toLowerCase()
        .includes(
          searchTerm.toLowerCase()
        )
    );
  }

  ui.renderTasks(tasks);

  ui.updateStats(
    taskManager.getStats()
  );
}

/* =========================
   ADD TASK
========================= */

function addTask() {
  const title =
    taskInput.value.trim();

  const priority =
    prioritySelect.value;

  if (!title) {
    showToast(
      "⚠️ Digite uma tarefa",
      "#f59e0b"
    );

    return;
  }

  taskManager.addTask(
    title,
    priority
  );

  taskInput.value = "";

  render();

  showToast(
    "✅ Tarefa adicionada"
  );
}

/* =========================
   DELETE
========================= */

function deleteTask(id) {
  taskManager.removeTask(id);

  render();

  showToast(
    "🗑️ Tarefa removida",
    "#ef4444"
  );
}

/* =========================
   TOGGLE
========================= */

function toggleTask(id) {
  taskManager.toggleTask(id);

  render();

  showToast(
    "✔️ Status atualizado",
    "#22c55e"
  );
}

/* =========================
   EDIT
========================= */

function editTask(id) {
  const task =
    taskManager.getTaskById(id);

  if (!task) return;

  const newTitle =
    prompt(
      "Editar tarefa:",
      task.title
    );

  if (
    newTitle === null ||
    !newTitle.trim()
  ) {
    return;
  }

  taskManager.editTask(
    id,
    newTitle
  );

  render();

  showToast(
    "✏️ Tarefa atualizada",
    "#3b82f6"
  );
}

/* =========================
   EVENTS
========================= */

addTaskBtn.addEventListener(
  "click",
  addTask
);

taskInput.addEventListener(
  "keydown",
  e => {
    if (e.key === "Enter") {
      addTask();
    }
  }
);

/* =========================
   FILTERS
========================= */

document
  .querySelectorAll(".filter-btn")
  .forEach(button => {

    button.addEventListener(
      "click",
      () => {

        currentFilter =
          button.dataset.filter;

        ui.setActiveFilter(
          currentFilter
        );

        render();

      }
    );

  });

/* =========================
   SEARCH
========================= */

searchInput.addEventListener(
  "input",
  debounce(() => {
    render();
  }, 250)
);

/* =========================
   TASK ACTIONS
========================= */

taskList.addEventListener(
  "click",
  event => {

    const taskElement =
      event.target.closest(".task");

    if (!taskElement) return;

    const id =
      taskElement.dataset.id;

    if (
      event.target.classList.contains(
        "delete-btn"
      )
    ) {
      deleteTask(id);
    }

    if (
      event.target.classList.contains(
        "edit-btn"
      )
    ) {
      editTask(id);
    }

  }
);

taskList.addEventListener(
  "change",
  event => {

    if (
      event.target.classList.contains(
        "toggle-task"
      )
    ) {

      const taskElement =
        event.target.closest(".task");

      const id =
        taskElement.dataset.id;

      toggleTask(id);
    }

  }
);

/* =========================
   THEME
========================= */

function loadTheme() {
  const theme =
    Storage.getTheme();

  if (theme === "light") {
    document.body.classList.add(
      "light"
    );

    themeToggle.textContent =
      "☀️";
  }
}

themeToggle.addEventListener(
  "click",
  () => {

    document.body.classList.toggle(
      "light"
    );

    const isLight =
      document.body.classList.contains(
        "light"
      );

    Storage.saveTheme(
      isLight
        ? "light"
        : "dark"
    );

    themeToggle.textContent =
      isLight
        ? "☀️"
        : "🌙";

  }
);