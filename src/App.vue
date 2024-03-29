<template>
    <AppHeader></AppHeader>
    <main>
        <div class="appContainer">
            <router-view />
        </div>
    </main>
</template>

<script setup lang="ts">
    import type { Ref } from 'vue';
    import type { TASK, CAT } from './api/apiSupabase';

    import { ref, onMounted } from 'vue';
    import { fetchTable } from './api/apiSupabase';

    import AppHeader from './components/AppHeader.vue';


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
        display: flex;
        justify-content: flex-end;
        
        @each $key, $name in $colors {
            &.#{$key} { 
                border-color: #{$name};

                button { 
                    background-color: #{$name};
                    border-color: darken($name, 20%);
                    color: darken($name, 40%);
                    margin: $standardMargin/4;

                    &:not(:only-child):last-child { margin-right: 0 }
                }
                span { 
                    color: #{$name};
                    margin-right: auto; 
                }
            }
        }
    } 

</style>
