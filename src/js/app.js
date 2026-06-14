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