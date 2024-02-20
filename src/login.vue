<template>
    <div>
        <input v-model="email" type="email" placeholder="Email">
        <input v-model="password" type="password" placeholder="Password">
        <button @click="login">Login</button>
    </div>
</template>
  
<script setup lang="ts">
    import { ref } from 'vue';
    import { createClient } from '@supabase/supabase-js'

    const email = ref('');
    const password = ref('');
    const supabase = createClient(import.meta.env.VITE_SUPABASE_API_URL, import.meta.env.VITE_SUPABASE_API_KEY);

    const login = async () => {
    const { data, error } = await supabase.auth.signInWithPassword({
        email: email.value,
        password: password.value
    });

    if (error) console.error('Error logging in:', error.message);
        else console.log('User logged in:', data.user);
    };
  
</script>

<style lang="scss">

</style>