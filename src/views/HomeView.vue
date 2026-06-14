<template>
  <MapComponent :markers="markers" />
  <RadarMenuComponent @search="handleSearch" />
</template>

<script>
import { mapActions, mapState } from 'pinia';
import { useMarkersStore } from '@/store/markersStore';
import getUserCoords from '@/utils/getUserCoords';
import MapComponent from '@/components/MapComponent.vue';
import RadarMenuComponent from '@/components/RadarMenuComponent.vue';
export default {
  name: 'MapView',
  components: {
    MapComponent,
    RadarMenuComponent
  },
  computed: {
    ...mapState(useMarkersStore, {
        markers: 'markers'
    })
  },
  methods: {
    ...mapActions(useMarkersStore, {
        setUserCoords: 'setUserCoords',
        getNearMarkers: 'getNearMarkers'
    }),
    async handleSearch(){
      const userCoords = await getUserCoords();
      this.setUserCoords(userCoords.latitude, userCoords.longitude);
      await this.getNearMarkers(userCoords.latitude, userCoords.longitude);
    }
  }
};
</script>

<style scoped>

</style>