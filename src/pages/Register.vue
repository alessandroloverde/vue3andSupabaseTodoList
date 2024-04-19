<script setup>
  import { ref } from "vue";
  import useAuthUser from "../composables/UseAuthUser"
  import { useRouter } from "vue-router";

  const router = useRouter();
  const { register } = useAuthUser();

  const form = ref({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = async () => {
    try {
      await register(form.value);

      // Redirect to a EmailConfirmation page
      router.push({
        name: "EmailConfirmation",
        query: { email: form.value.email },
      });
    } catch (error) {
      alert(error.message);
    }
  };
</script>

<template>
  <div id="Register">
    <form @submit.prevent="handleSubmit">
      <h1>Register</h1>
      <fieldset>
        <label for="register-name">Name</label>
        <input v-model="form.name" id="register-name" type="text" />
      </fieldset>
      <fieldset>
        <label for="register-email">Email</label>
        <input v-model="form.email" id="register-email" type="email" />
      </fieldset>
      <fieldset>
        <label for="register-password">Password</label>
        <input v-model="form.password" id="register-password" type="password" />
      </fieldset>
      
      <button class="btn">Register</button>
    </form>
   <!--  <p>Already have an account?</p>
    <router-link to="Login">
      <h3>Log in</h3>
    </router-link> -->
  </div>
</template>
