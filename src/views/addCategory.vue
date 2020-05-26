<template>
  <div>
    <v-alert type="error" v-if="alert">
      Category name can't be empty!
    </v-alert>

    <v-text-field
      outlined
      label="Category Name"
      placeholder="i.e. study"
      v-model="newCategoryText"
      @keypress.enter="newCategory"
    />

    <v-btn color="indigo" dark @click="newCategory">Add Category</v-btn>
  </div>
</template>

<script>
export default {
  name: "addCategory",
  data() {
    return {
      newCategoryText: "",
      alert: false
    };
  },
  methods: {
    newCategory() {
      if (this.newCategoryText.length) {
        this.$store.dispatch("addCategory", this.newCategoryText);
        this.$router.push("/");
        this.newCategoryText = "";
        this.alert = false;
      } else {
        this.alert = true;
      }
    }
  }
};
</script>
