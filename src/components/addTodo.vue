<template>
  <div>
    <v-card class="pt-3 px-1 pt-sm-6 px-sm-4">
      <v-container>
        <v-row align="center">
          <v-col cols="6">
            <v-text-field
              outlined
              placeholder="New Todo Text"
              v-model="newTodoText"
              @keypress.enter="addTodo"
            />
          </v-col>

          <v-col cols="6">
            <v-select
              v-model="newTodoCategory"
              :items="categoriesName"
              label="Category"
              outlined
            ></v-select>
          </v-col>

          <v-btn class="mt-n7 ml-3" dark color="indigo" @click="addTodo">Add</v-btn>
        </v-row>
      </v-container>
    </v-card>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "addTodo",
  data: function() {
    return {
      newTodoText: "",
      newTodoCategory: ""
    };
  },
  computed: {
    ...mapGetters(["categoriesName"])
  },
  methods: {
    addTodo() {
      if (this.newTodoText.length && this.newTodoCategory.length) {
        this.$store.dispatch("addTodo", {
          text: this.newTodoText,
          category: this.newTodoCategory
        });
      } else {
        alert("please fill both todo text and category");
      }
      this.$store.commit("toggleAddingTodo");
    }
  }
};
</script>
