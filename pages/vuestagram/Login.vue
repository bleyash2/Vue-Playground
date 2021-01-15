<template>
  <div id="login">
    <section>
      <div class="col1">
        <h1>Vuestagram</h1>
      </div>
      <div class="col2">
        <form v-if="showLoginForm" @submit.prevent>
          <h1>Welcome Back</h1>
          <div>
            <label for="email1">Email</label>
            <input
              v-model.trim="loginForm.email"
              type="text"
              placeholder="you@email.com"
              id="email1"
            />
          </div>
          <div>
            <label for="password1">Password</label>
            <input
              v-model.trim="loginForm.password"
              type="password"
              placeholder="******"
              id="password1"
            />
          </div>
          <button @click="login()" class="button">Log In</button>
          <div class="extras">
            <a>Forgot Password</a>
            <button @click="toggleForm()" type="button">Create an Account</button>
          </div>
        </form>
        <form v-else @submit.prevent>
          <h1>Get Started</h1>
          <div>
            <label for="name">Name</label>
            <input v-model.trim="signupForm.name" type="text" placeholder="Savvy Apps" id="name" />
          </div>
          <div>
            <label for="title">Title</label>
            <input v-model.trim="signupForm.title" type="text" placeholder="Company" id="title" />
          </div>
          <div>
            <label for="email2">Email</label>
            <input
              v-model.trim="signupForm.email"
              type="text"
              placeholder="you@email.com"
              id="email2"
            />
          </div>
          <div>
            <label for="password2">Password</label>
            <input
              v-model.trim="signupForm.password"
              type="password"
              placeholder="min 6 characters"
              id="password2"
            />
          </div>
          <button @click="signup()" class="button">Sign Up</button>
          <div class="extras">
            <button @click="toggleForm()" type="button">Back to Log In</button>
          </div>
        </form>
      </div>
    </section>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  updated() {},

  data() {
    return {
      loginForm: {
        email: "",
        password: "",
      },
      signupForm: {
        name: "",
        title: "",
        email: "",
        password: "",
      },
      showLoginForm: false,
    };
  },
  methods: {
    login() {
      const { email, password } = this.loginForm;
      this.$store
        .dispatch("authentication/login", { email, password })
        .then(() => this.$router.replace({ path: "/vuestagram/" }));
    },
    signup() {
      this.$store.dispatch("authentication/signup", { form: { ...this.signupForm } });
    },
    toggleForm() {
      this.showLoginForm = !this.showLoginForm;
    },
  },
  middleware: ["notAuthenticated"],
  head: {
    title: "Vuestagram | Login",
  },
};
</script>

<style lang="scss" scoped></style>
