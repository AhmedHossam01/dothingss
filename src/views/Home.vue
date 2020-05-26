<template>
  <div class="home">
    <todo-list :todos="todos"></todo-list>
  </div>
</template>

<script>
import todoList from "../components/todoList";
import { mapState } from "vuex";

export default {
  name: "home",
  components: {
    todoList
  },
  computed: {
    ...mapState(["todos"])
  }
};
</script>
