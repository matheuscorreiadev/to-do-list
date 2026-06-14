import { Storage } from "./storage.js";
import { generateId } from "./utils.js";

export class TaskManager {
  constructor() {
    this.tasks = Storage.getTasks();
  }

  getAllTasks() {
    return this.tasks;
  }

  addTask(title, priority) {
    const task = {
      id: generateId(),
      title: title.trim(),
      priority,
      completed: false,
      createdAt: new Date().toISOString(),
      updatedAt: null
    };

    this.tasks.push(task);

    this.save();

    return task;
  }

  removeTask(id) {
    this.tasks = this.tasks.filter(
      task => task.id !== id
    );

    this.save();
  }

  toggleTask(id) {
    const task = this.tasks.find(
      task => task.id === id
    );

    if (!task) return;

    task.completed = !task.completed;
    task.updatedAt = new Date().toISOString();

    this.save();
  }

  editTask(id, newTitle) {
    const task = this.tasks.find(
      task => task.id === id
    );

    if (!task) return;

    task.title = newTitle.trim();
    task.updatedAt = new Date().toISOString();

    this.save();
  }

  getTaskById(id) {
    return this.tasks.find(
      task => task.id === id
    );
  }

  searchTasks(searchTerm) {
    return this.tasks.filter(task =>
      task.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    );
  }

  filterTasks(filter) {
    switch (filter) {
      case "completed":
        return this.tasks.filter(
          task => task.completed
        );

      case "pending":
        return this.tasks.filter(
          task => !task.completed
        );

      default:
        return this.tasks;
    }
  }

  updateOrder(taskIds) {
    const reorderedTasks = [];

    taskIds.forEach(id => {
      const task = this.tasks.find(
        task => task.id === id
      );

      if (task) {
        reorderedTasks.push(task);
      }
    });

    this.tasks = reorderedTasks;

    this.save();
  }

  getStats() {
    const total = this.tasks.length;

    const completed =
      this.tasks.filter(
        task => task.completed
      ).length;

    const pending =
      total - completed;

    return {
      total,
      completed,
      pending
    };
  }

  save() {
    Storage.saveTasks(this.tasks);
  }
}