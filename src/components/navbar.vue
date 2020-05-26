<template>
  <div class="navbar">
    <v-navigation-drawer v-model="drawer" app v-if="isLoggedIn">
      <v-list dense>
        <v-list-item link to="/">
          <v-list-item-action>
            <v-icon>mdi-home</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <v-list dense>
        <v-list-item
          link
          v-for="category in categories"
          :key="category.name"
          :to="{
            name: 'sorted',
            params: { category: category.name, id: category.id }
          }"
        >
          <v-list-item-action>
            <v-icon>mdi-checkbox-blank-outline</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title> {{ category.name }} </v-list-item-title>
          </v-list-item-content>
          <v-btn icon color="error" @click="removeCategory(category.id)">
            <v-icon>mdi-delete-forever</v-icon>
          </v-btn>
        </v-list-item>
      </v-list>

      <v-spacer></v-spacer>

      <v-list dense>
        <v-list-item link to="/addcategory">
          <v-list-item-action>
            <v-icon>mdi-plus-circle</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Add Category</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar app color="indigo" dark>
      <v-app-bar-nav-icon v-if="isLoggedIn" @click.stop="drawer = !drawer" />
      <v-toolbar-title>Do Things</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn @click="logout" v-if="isLoggedIn">
        <v-icon left>mdi-logout</v-icon>
        Logout
      </v-btn>

      <v-btn to="/login" v-if="!isLoggedIn" color="primary" class="mr-4">
        <v-icon left>mdi-login</v-icon>
        Login
      </v-btn>

      <v-btn outlined to="/register" v-if="!isLoggedIn">
        <v-icon left>mdi-account</v-icon>
        register
      </v-btn>
    </v-app-bar>
  </div>
</template>

<script>
import { mapState } from "vuex";
import firebase from "firebase";

export default {
  name: "navbar",
  computed: {
    ...mapState(["categories"])
  },
  data() {
    return {
      isLoggedIn: false,
      currentUser: false,
      drawer: null
    };
  },
  created() {
    if (firebase.auth().currentUser) {
      this.isLoggedIn = true;
      this.currentUser = firebase.auth().currentUser.email;
    }
  },
  methods: {
    logout() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.go({ path: this.$router.path });
        });
    },
    removeCategory(id) {
      this.$store.dispatch("removeCategory", id);
      this.$router.push("/");
    }
  }
};
</script>
