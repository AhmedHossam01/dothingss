<template>
  <div>
      <todo-list :todos="sortTodos($route.params.category)"></todo-list>
    <div v-if="!sortTodos($route.params.category).length">
      <v-alert type="warning">
        No Todos In This Category
      </v-alert>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

import todoList from "../components/todoList";

export default {
  name: "SortedTodos",
  props: ["category"],
  computed: {
    ...mapGetters(["sortTodos"])
  },
  components: {
    todoList
  }
};
</script>
