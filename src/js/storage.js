const STORAGE_KEY = "taskflow_tasks";
const THEME_KEY = "taskflow_theme";

export const Storage = {
  saveTasks(tasks) {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(tasks)
    );
  },

  getTasks() {
    const tasks = localStorage.getItem(STORAGE_KEY);

    return tasks ? JSON.parse(tasks) : [];
  },

  saveTheme(theme) {
    localStorage.setItem(
      THEME_KEY,
      theme
    );
  },

  getTheme() {
    return (
      localStorage.getItem(THEME_KEY) ||
      "dark"
    );
  }
};