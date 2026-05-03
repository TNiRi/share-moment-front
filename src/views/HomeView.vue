<template>
  <MapComponent />
  <RadarMenuComponent />
</template>

<script>
import MapComponent from '@/components/MapComponent.vue';
import RadarMenuComponent from '@/components/RadarMenuComponent.vue';
export default {
  name: 'MapView',
  components: {
    MapComponent,
    RadarMenuComponent
  }
};
</script>

<style scoped>

</style>