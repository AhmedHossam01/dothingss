<template>
  <v-card class="mb-2 px-2" dark flat color="deep-purple accent-4">
    <v-row :class="{ completedOverall: item.completed }">
      <v-text-field
        v-if="item.editing"
        solo
        @blur="updateTodo($event, item.id, item.category)"
        :value="item.text"
        autofocus
        hide-details
        class="pa-3"
        light
      />

      <v-card-title
        :class="{ completed: item.completed }"
        v-if="!item.editing"
        @click="item.editing = !item.editing"
      >
        {{ item.text }}
      </v-card-title>

      <v-spacer></v-spacer>

      <v-checkbox
        v-model="item.completed"
        @change="checkTodo(item.completed, item.id, item.text, item.category)"
      />

      <v-btn icon large fab @click="removeItem(item.id)">
        <v-icon>mdi-delete-forever</v-icon>
      </v-btn>
    </v-row>
  </v-card>
</template>

<script>
export default {
  name: "todoItem",
  props: ["item"],
  methods: {
    removeItem(id) {
      this.$store.dispatch("removeItem", id);
    },
    updateTodo(e, id, category) {
      this.item.editing = !this.item.editing;
      this.$store.dispatch("updateTodo", {
        newValue: e.target.value,
        id: id,
        category: category
      });
    },
    checkTodo(state, id, text, category) {
      this.$store.dispatch("checkTodo", {
        newValue: state,
        id: id,
        text: text,
        category: category
      });
      this.$store.commit("checkTodo", id, text);
    }
  }
};
</script>

<style scoped>
.completed {
  text-decoration: line-through !important;
}
.completedOverall {
  opacity: 0.2;
}
</style>
