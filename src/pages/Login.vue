<script setup>
import { ref } from "vue";
import useAuthUser from "../composables/UseAuthUser";
import { useRouter } from "vue-router";

const router = useRouter();
const { login } = useAuthUser();

const form = ref({
  email: "",
  password: "",
});

const handleLogin = async () => {
  try {
    await login(form.value)

    router.push({ name: "Home" })
  } catch (error) {
    alert(error.message)
  }
};
</script>

<template>
  <div id="Login">
    <form @submit.prevent="handleLogin()">
      <h1>Login</h1>
      <label>Email <input v-model="form.email" type="email" /></label>
      <label>Password <input v-model="form.password" type="password" /></label>
      <button>Login</button>
      <router-link to="/forgotPassword">Forgot Password?</router-link>
      <hr>
      <p>You don't have an account yet?</p>
      <router-link to="Register">
        <h3>Register</h3>
      </router-link>
    </form>
  </div>
</template>
