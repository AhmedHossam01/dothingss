<template>
  <div class="register">
    <h2 class="display-1 mb-6">Register</h2>
    <v-alert type="error" v-if="alert"> {{ alertText }} </v-alert>
    <v-row>
      <v-col cols="6">
        <v-text-field
          @keypres.enter="register"
          outlined
          type="email"
          v-model="email"
          placeholder="Email"
        />
      </v-col>
      <v-col cols="6">
        <v-text-field
          outlined
          type="password"
          v-model="password"
          placeholder="Type Your Password"
          @keypres.enter="register"
        />
      </v-col>
    </v-row>
    <v-btn class="mt-n8" color="indigo" :loading="loading" dark @click="register">Register</v-btn>
  </div>
</template>

<script>
import firebase from "firebase";
import db from "../../firebase";

export default {
  name: "register",
  data: function() {
    return {
      email: "",
      password: "",
      alert: false,
      alertText: "",
      loading: false
    };
  },
  methods: {
    register: function(e) {
      this.loading = true

      firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then(user => {
          let uid = user.user.uid
          
            db.collection("categories")
            .add({
              name: "Today",
              authorID: uid
            })
            this.$router.go({ path: this.$router.path });
          },
          error => {
            this.alert = true
            this.alertText = error.message
            this.loading = false
          }
        );

      e.preventDefault();
    }
  }
};
</script>
