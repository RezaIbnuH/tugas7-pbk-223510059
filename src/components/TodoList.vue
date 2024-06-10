<template>
    <div class="task-list-container">
      <h1>List Tugas</h1>
      <div class="input-container">
        <input
          v-model="newTask"
          @keyup.enter="addTask"
          placeholder="Tambah tugas baru"
          class="task-input"
        />
        <button @click="addTask" class="add-button">Tambah</button>
      </div>
      <ul class="task-list">
        <li v-for="task in tasks" :key="task.id" class="task-item">
          <input
            type="checkbox"
            :checked="task.completed"
            @change="toggleTaskCompletion(task.id)"
            class="task-checkbox"
          />
          <span
            v-if="!task.editMode"
            :class="{ completed: task.completed, 'task-text': true }"
            @click="toggleEditMode(task)"
          >
            {{ task.text }}
          </span>
          <input
            v-else
            v-model="task.text"
            @keyup.enter="saveEditedTask(task)"
            @keyup.esc="cancelEdit(task)"
            class="edit-input"
          />
          <div class="task-buttons">
            <button v-if="!task.editMode" @click="removeTask(task.id)" class="delete-button">Hapus</button>
            <button v-if="task.editMode" @click="saveEditedTask(task)" class="save-button">Simpan</button>
            <button v-if="task.editMode" @click="cancelEdit(task)" class="cancel-button">Batal</button>
            <button v-if="!task.editMode" @click="toggleEditMode(task)" class="edit-button">Edit</button>
          </div>
        </li>
      </ul>
      <p class="incomplete-tasks-count">
        Tugas Yang Belum Selesai: {{ incompleteTasksCount }}
      </p>
      <p class="completed-tasks-count">
        Tugas Yang Telah Diselesaikan: {{ completedTasksCount }}
      </p>
    </div>
  </template>
  
  <script>
  import { ref, computed } from "vue";
  import { useTaskStore } from "@/stores/taskStore";
  
  export default {
    setup() {
      const taskStore = useTaskStore();
      const newTask = ref("");
  
      const addTask = () => {
        if (newTask.value.trim()) {
          taskStore.addTask(newTask.value);
          newTask.value = "";
        }
      };
  
      const removeTask = (taskId) => {
        taskStore.removeTask(taskId);
      };
  
      const toggleTaskCompletion = (taskId) => {
        taskStore.toggleTaskCompletion(taskId);
      };
  
      const toggleEditMode = (task) => {
        task.editMode = !task.editMode;
        if (task.editMode) {
          task.originalText = task.text;
        }
      };
  
      const saveEditedTask = (task) => {
        if (task.text.trim()) {
          task.editMode = false;
          taskStore.saveEditedTask(task);
        }
      };
  
      const cancelEdit = (task) => {
        task.editMode = false;
        task.text = task.originalText;
      };
  
      const incompleteTasksCount = computed(() => taskStore.incompleteTasksCount);
      const completedTasksCount = computed(() => taskStore.tasks.filter(task => task.completed).length);
  
      return {
        newTask,
        tasks: taskStore.tasks,
        incompleteTasksCount,
        completedTasksCount,
        addTask,
        removeTask,
        toggleTaskCompletion,
        toggleEditMode,
        saveEditedTask,
        cancelEdit,
      };
    },
  };
  </script>
  
  <style scoped>
  .task-list-container {
    max-width: 600px;
    width: 100%;
    margin: 0 auto;
    padding: 20px;
    border-radius: 10px;
    background-color: transparent;
    backdrop-filter: blur(5px);
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }
  
  h1 {
    text-align: center;
    color: #333;
    font-family: 'Chakra Petch', sans-serif;
  }
  
  .input-container {
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
  }
  
  .task-input {
    flex: 1;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 5px;
    margin-right: 10px;
    font-family: 'Chakra Petch', sans-serif;
  }
  
  .add-button {
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    background-color: #28a745;
    color: #fff;
    cursor: pointer;
    font-family: 'Chakra Petch', sans-serif;
  }
  
  .add-button:hover {
    background-color: #218838;
  }
  
  .task-list {
    list-style: none;
    padding: 0;
  }
  
  .task-item {
    display: flex;
    align-items: center;
    padding: 10px;
    border-bottom: 1px solid #ddd;
    font-family: 'Chakra Petch', sans-serif;
  }
  
  .task-item:last-child {
    border-bottom: none;
  }
  
  .task-checkbox {
    margin-right: 10px;
  }
  
  .task-text {
    flex: 1;
    cursor: pointer;
    font-family: 'Chakra Petch', sans-serif;
  }
  
  .task-text.completed {
    text-decoration: line-through;
    color: #888;
    font-family: 'Chakra Petch', sans-serif;
  }
  
  .edit-input {
    flex: 1;
    padding: 5px;
    border: 1px solid #ddd;
    border-radius: 5px;
    font-family: 'Chakra Petch', sans-serif;
  }
  
  .task-buttons {
    display: flex;
    gap: 5px;
  }
  
  .delete-button,
  .save-button,
  .cancel-button,
  .edit-button {
    padding: 5px 10px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    color: #fff;
    font-family: 'Chakra Petch', sans-serif;
  }
  
  .delete-button {
    background-color: #dc3545;
  }
  
  .delete-button:hover {
    background-color: #c82333;
  }
  
  .save-button {
    background-color: #007bff;
  }
  
  .save-button:hover {
    background-color: #0069d9;
  }
  
  .cancel-button {
    background-color: #6c757d;
  }
  
  .cancel-button:hover {
    background-color: #5a6268;
  }
  
  .edit-button {
    background-color: #ffc107;
  }
  
  .edit-button:hover {
    background-color: #e0a800;
  }
  
  .incomplete-tasks-count,
  .completed-tasks-count {
    text-align: center;
    margin-top: 20px;
    color: #555;
    font-family: 'Chakra Petch', sans-serif;
  }
  </style>
  