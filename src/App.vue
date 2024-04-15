<template>
    <AppHeader v-if="isLoggedIn()"></AppHeader>
    <main>
        <div class="appContainer">
            <router-view />
        </div>
    </main>
</template>

<script setup lang="ts">
    import AppHeader  from './components/AppHeader.vue';
    import useAuthUser from  './composables/UseAuthUser';

    const { isLoggedIn } = useAuthUser();
</script>

<style lang="scss">
    @import "./assets/_variables.scss";
    
    $textColor: $textWhite;
    $primaryColor: lightgrey;
    $secondTextColor: #1f2023;
    
    .taskName,
    .categoryName {
        display: flex;
        flex: 1 1 auto;
    }

    .categoryList > li {     
        @each $key, $name in $colors {
            &.#{$key} { 
                border-color: #{$name};

                button { 
                    background-color: #{$name};
                    border-color: darken($name, 20%);
                    color: darken($name, 40%);
                }
                span { 
                    color: #{$name};
                    margin-right: auto; 
                }
            }
        }
    } 

</style>
