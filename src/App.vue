<template>
  <div id="app">
    <TaskList />
  </div>
</template>

<script>
import TaskList from "./components/TodoList.vue";

export default {
  name: "App",
  components: {
    TaskList,
  },
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Chakra+Petch:wght@400;700&display=swap');

body, html, #app {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  font-family: 'Chakra Petch', sans-serif;
}

body {
  background-image: url('./assets/A.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  display: flex;
  justify-content: center;
  align-items: center;
}

#app {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
}
</style>
