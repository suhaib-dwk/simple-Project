<template>
   <NavAdmin />
   <!-- <ChartComponent /> -->
</template>

<script>
import { useStore } from 'vuex';
import NavAdmin from '../components/NavAdmin.vue';
// import ChartComponent from '../components/ChartComponent.vue';

export default {
    name: "HomeAdmin",
    setup() {
        const store = useStore();
        store.dispatch('setRoles', 'Admin');
    },
    components: { NavAdmin }
}
</script>

<style>

</style>