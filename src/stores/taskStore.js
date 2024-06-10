import { defineStore } from "pinia";

export const useTaskStore = defineStore("task", {
  state: () => ({
    tasks: [],
  }),
  actions: {
    addTask(task) {
      this.tasks.push({ id: Date.now(), text: task, completed: false });
    },
    removeTask(taskId) {
      const index = this.tasks.findIndex((task) => task.id === taskId);
      if (index !== -1) {
        this.tasks.splice(index, 1);
      }
    },
    toggleTaskCompletion(taskId) {
      const task = this.tasks.find((task) => task.id === taskId);
      if (task) {
        task.completed = !task.completed;
      }
    },
  },
  getters: {
    incompleteTasksCount: (state) => {
      return state.tasks.filter((task) => !task.completed).length;
    },
  },
});