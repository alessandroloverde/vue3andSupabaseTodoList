<script setup>
  import { ref } from "vue";
  import useAuthUser from "../composables/UseAuthUser";
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
  <div id="Register" class="h100-md">
    <h1>Register</h1>
    <div class="flex-row">
      <section class="register--formContent flex-col-lg-12 noPadding">
        <form @submit.prevent="handleSubmit">
          <fieldset>
            <label for="register-name"><i class="icon-user"></i>Name (optional)</label>
            <input v-model="form.name" id="register-name" type="text" />
          </fieldset>
          <fieldset>
            <label for="register-email"><i class="icon-envelope"></i>Email</label>
            <input v-model="form.email" id="register-email" type="email" />
          </fieldset>
          <fieldset>
            <label for="register-password"><i class="icon-bookmark"></i>Password</label>
            <input v-model="form.password" id="register-password" type="password" />
          </fieldset>
          <button class="btn btn--cta">Register</button>
        </form>
      </section>
<!--       <section class="register--illustration flex-col-lg-4">
        <img src="../assets/images/Register-bkg.jpg" class="fitImg" alt="Illustration">
      </section> -->
    </div>
  </div>
</template>
