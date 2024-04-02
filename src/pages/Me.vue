<script setup>
  import useAuthUser from "../composables/UseAuthUser";
  import { useRouter } from "vue-router";

  const router = useRouter();
  const { user } = useAuthUser();
</script>

<template>
  <div v-if="user" id="UserPage">
    <div>Hello {{ user.user_metadata.name }}</div>
    <p>Email: {{ user.email }}</p>
    <p>Status: {{ user.role }}</p>
    <p>Registered on: {{ user.created_at }}</p>
    <router-link to="/">
      <button>Go to your home page</button>
    </router-link>
  </div>
</template>
