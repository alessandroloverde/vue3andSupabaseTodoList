<template>
    <header class="appHeader">
        <h1 class="appHeader--title">Wondertask</h1>
        <aside class="appHeader--avatar">
            <Popper :placement="'left'" arrow >
                <template #content class="flyoutMenu">
                    <div >
                        <ul>
                            <li>Welcome Supabase</li>
                            <li>Login</li>
                            <li>Logout</li>
                        </ul>
                    </div>
                </template>
                <button
                    role="button"
                    aria-label="Login options" 
                    class="btn--avatar"  
                    @click=""
                ></button>
            </Popper>
        </aside>
    </header>
</template>

<script setup>
    import Popper from "vue3-popper";
</script>

<style lang="scss">
:root {
  --popper-theme-background-color: #bebebe;
  --popper-theme-background-color-hover: #a8a5a5;
  --popper-theme-text-color: #ffffff;
  --popper-theme-border-width: 0px;
  --popper-theme-border-style: solid;
  --popper-theme-border-radius: 6px;
  --popper-theme-padding: 32px;
  --popper-theme-box-shadow: 0 6px 30px -6px rgba(0, 0, 0, 0.25);
  --popper-arrow-bg: red;
  --popper-border-color: red;
}
#app .popper #arrow::before {
  background: #bebebe ;
}
</style>
