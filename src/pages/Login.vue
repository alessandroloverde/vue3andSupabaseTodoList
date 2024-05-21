<script setup lang="ts">
import { ref } from "vue";
import useAuthUser from "../composables/UseAuthUser";
import { useRouter } from "vue-router";
import { AuthError } from "@supabase/supabase-js";

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
  } catch (error: unknown) {
    const typedError = error as AuthError;

    alert(typedError.message)
  }
};
</script>

<template>
  <div id="Login" class="h100-md">
    <h1>Login</h1>
    <div class="flex-row">
<!--       <section class="login--illustration flex-col-lg-4 noPadding">
        <img src="../assets/images/Login-bkg.jpg" class="fitImg" alt="Illustration">
      </section> -->
      <section class="login--formContent flex-col-lg-12 noPadding">
        <form @submit.prevent="handleLogin()">
          <fieldset>
            <label for="login-email"><i class="icon-envelope"></i>Email</label>
            <input v-model="form.email" id="login-email" type="email" />
          </fieldset>
          <fieldset>
            <label for="login-password"><i class="icon-bookmark"></i>Password</label>
            <input v-model="form.password" id="login-password" type="password" />
          </fieldset>
          <router-link to="/forgotPassword" class="login-link">Forgot Password?</router-link>
          <button class="btn btn--cta">Login</button>

          <!-- <p>You don't have an account yet?</p>
          <router-link to="Register">
            <h3>Register</h3>
          </router-link> -->
        </form>
      </section>
    </div>
  </div>
</template>

