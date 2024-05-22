<script setup>
  import useAuthUser from "../composables/UseAuthUser";
  import { ref } from "vue";

const { sendPasswordResetEmail } = useAuthUser();

  const email = ref("");

  const handlePasswordReset = async () => {
    await sendPasswordResetEmail(email.value);
    alert(`Password reset email sent to: ${email.value}`);
  };
</script>

<template>
  <div id="ForgotPassword">
    <form @submit.prevent="handlePasswordReset()">
      <h1>Forgot Password?</h1>
      <label>Email <input v-model="email" type="email" /></label>
      <button>Send Reset Email</button>
    </form>
  </div>
</template>
