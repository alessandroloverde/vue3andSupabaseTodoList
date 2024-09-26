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

const topo = ref(null)

const validationErrors = ref<string[]>([]);

const handleLogin = async () => {
  const topoElement = topo.value as unknown as HTMLInputElement | null;

  try {
    await login(form.value);


    router.push({ name: "Home" });
  } catch (error: unknown) {
    if (error instanceof Error) {
      validationErrors.value.push(error.message);

      console.error("Login error:", AuthError);
      console.log("topo:", topoElement);
    } else {
      alert("An unknown error occurred.");
    }
  }
};

</script>

<template>
  <div id="Login" class="">
    <h3>Login</h3>
    <div class="">
      <section class="login--formContent flex-col-lg-12 noPadding">
        <form @submit.prevent="handleLogin()">
          <fieldset>
            <label for="login-email"><i class="fi-rr-envelope"></i>Email</label>
            <input v-model="form.email" id="login-email" type="email" required size="1" />
          </fieldset>
          <fieldset>
            <label for="login-password"><i class="fi-rr-lock"></i>Password</label>
            <input ref="topo" v-model="form.password" id="login-password" type="password" required size="1" />
          </fieldset>
          <div v-if="validationErrors.length > 0">
            <ul>
              <li v-for="error in validationErrors" :key="error">{{ error }}</li>
            </ul>
          </div>
          <fieldset>
            <router-link to="/forgotPassword" class="login-link">Forgot Password?</router-link>
            <button class="⭐-Btn--primary">Login</button>
          </fieldset>
        </form>
      </section>
    </div>
  </div>
</template>

