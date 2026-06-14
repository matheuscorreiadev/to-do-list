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