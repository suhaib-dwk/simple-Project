<template>
  {{ message }}
</template>

<script>
import { onMounted, ref } from 'vue';
import { useStore } from 'vuex';

export default {
  name: 'HomeView',
  setup() {
    const message = ref('You are not logged in!');
    const store = useStore();
    console.log(store.state.accessToken);
    store.dispatch('setRoles', 'Student'); 
  }
}
</script>
