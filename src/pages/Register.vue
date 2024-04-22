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
  <div id="Register"  class="login col-50">
    <h1>Register</h1>
    <div class="register--container">
      <section class="register--container--formContent">
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
      <section class="register--container--illustration"></section>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.register {
  &-link { margin-top: 12px }
  &--container {
    display: flex;

    &--illustration {
      width: 40%;
      opacity: 0.8;
      background-image: url("../assets/images/Register-bkg.jpg");
      background-repeat: no-repeat;
      background-size: contain;
      background-position-x: center;
      background-position-y: top;
    }
    &--formContent {
      width: 60%;

      .btn { width: 100% }
    }
  }
}
</style>

