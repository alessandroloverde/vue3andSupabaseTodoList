<script setup lang="ts">
  import { ref } from "vue";
  import useAuthUser from "../composables/UseAuthUser";
  import { useRouter } from "vue-router";
  import { AuthError } from "@supabase/supabase-js";

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

      /**
       * TODO - Push only if !error
       */
 
      router.push({
        name: "EmailConfirmation",
        query: { email: form.value.email },
      });
    } catch (error: unknown) {
      const typedError = error as AuthError;

      alert(typedError.message);
    }
  };
</script>

<template>
  <div id="Register" class="">
    <h3>Register</h3>
    <div class="">
      <section class="register--formContent flex-col-lg-12 noPadding">
        <form @submit.prevent="handleSubmit">
          <fieldset>
            <label for="register-name"><i class="fi-rr-user"></i>Name (optional)</label>
            <input v-model="form.name" id="register-name" type="text" size="1" />
          </fieldset>
          <fieldset>
            <label for="register-email"><i class="fi-rr-envelope"></i>Email<i class="fi-rr-check-circle validation"></i></label>
            <input v-model="form.email" id="register-email" type="email" required size="1" />
          </fieldset>
          <fieldset>
            <label for="register-password"><i class="fi-rr-lock"></i>Password<i class="fi-rr-check-circle validation"></i></label>
            <input 
              v-model="form.password" 
              id="register-password" 
              type="password" 
              required 
              pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$" size="1" />
          </fieldset>
          <fieldset>
            <button class="⭐-Btn--primary">Register</button>
          </fieldset>
        </form>
      </section>
    </div>
  </div>
</template>
