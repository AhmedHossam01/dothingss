<template>
  <div class="todoList">

    <v-overlay :value="overlay" v-if="loading">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>

    <v-alert type="warning" v-if="requiresAlertTodos"
      >You've no todos right now, please do things.</v-alert
    >

    <todo-item v-for="item in todos" :key="item.id" :item="item"> </todo-item>

    <v-btn
      class="mx-2"
      fixed
      fab
      bottom
      right
      dark
      color="indigo"
      v-if="!addingTodo"
      @click="$store.commit('toggleAddingTodo')"
    >
      <v-icon dark>mdi-plus</v-icon>
    </v-btn>

    <add-todo class="addTodo" v-if="addingTodo"></add-todo>
  </div>
</template>

<script>
import todoItem from "./todoItem";
import addTodo from "./addTodo";
import { mapState } from "vuex";

export default {
  name: "todoList",
  data: function() {
    return {};
  },
  components: {
    todoItem,
    addTodo
  },
  computed: {
    ...mapState([
      "addingTodo",
      "loading",
      "requiresAlertTodos",
      "requiresAlertCats"
    ])
  },
  created: function() {
    this.$store.dispatch("getTodos");
    this.$store.dispatch("getCategories");
  },
  props: ["todos"]
};
</script>

<style scoped>
.addTodo {
  position: fixed;
  bottom: 1rem;
  right: 0.5rem;
}
</style>
