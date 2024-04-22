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
  <div id="Login" class="login col-50">
    <h1>Login</h1>
    <div class="login--container">
      <section class="login--container--illustration"></section>
      <section class="login--container--formContent">
        <form @submit.prevent="handleLogin()">
          <fieldset>
            <label for="login-email"><i class="icon-envelope"></i>Email</label>
            <input v-model="form.email" id="login-email" type="email" />
          </fieldset>
          <fieldset>
            <label for="login-password"><i class="icon-bookmark"></i>Password</label>
            <input v-model="form.password" id="login-password" type="password" />
          </fieldset>
          <button class="btn btn--cta">Login</button>
          <router-link to="/forgotPassword" class="login-link">Forgot Password?</router-link>
          <!-- <p>You don't have an account yet?</p>
          <router-link to="Register">
            <h3>Register</h3>
          </router-link> -->
        </form>
      </section>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.login {
  &-link { margin-top: 12px }
  &--container {
    display: flex;

    &--illustration {
      width: 40%;
      opacity: 0.8;
      background-image: url("../assets/images/Login-bkg.jpg");
      background-repeat: no-repeat;
      background-size: contain;
      background-position-x: -20px;
      background-position-y: top;
    }
    &--formContent {
      width: 60%;

      .btn { width: 100% }
    }
  }
}
</style>
