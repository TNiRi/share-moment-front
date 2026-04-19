<template>
  <MapComponent />
  <RadarComponent />
</template>

<script>
import MapComponent from '@/components/MapComponent.vue';
import RadarComponent from '@/components/RadarComponent.vue';
export default {
  name: 'MapView',
  components: {
    MapComponent,
    RadarComponent
  }
};
</script>

<style scoped>
</style>