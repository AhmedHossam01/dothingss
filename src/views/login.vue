<template>
  <div class="login">
    <h2 class="display-1 mb-6">Login</h2>
    <v-alert type="error" v-if="alert"> {{ alertText }} </v-alert>
    <v-row>
      <v-col cols="6">
        <v-text-field
          @keypres.enter="login"
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
          @keypres.enter="login"
        />
      </v-col>
    </v-row>
    <v-btn class="mt-n8" color="indigo" :loading="loading" dark @click="login">Login</v-btn>
  </div>
</template>

<script>
import firebase from "firebase";

export default {
  name: "login",
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
    login: function(e) {
      this.loading = true

      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(
          () => {
            this.$router.go({ path: this.$router.path });
          },
          error => {
            this.alert = true;
            this.alertText = error.message;
            this.loading = false
          }
        );

      e.preventDefault();
    }
  }
};
</script>
