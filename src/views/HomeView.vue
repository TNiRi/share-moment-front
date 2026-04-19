<template>
  <HeaderComponent></HeaderComponent>
</template>

<script>
import HeaderComponent from '@/components/HeaderComponent.vue';

// Components
import HelloWorld from '../components/HelloWorld.vue';

export default defineComponent({
  name: 'HomeView',

  components: {
    HeaderComponent
  }
}
</script>
