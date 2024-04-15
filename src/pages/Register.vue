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
      <label>Name <input v-model="form.name" type="text" /></label>
      <label>Email <input v-model="form.email" type="email" /></label>
      <label>Password <input v-model="form.password" type="password" /></label>
      <button>Register</button>
    </form>
    <p>Already have an account?</p>
    <router-link to="Login">
      <h3>Log in</h3>
    </router-link>
  </div>
</template>
