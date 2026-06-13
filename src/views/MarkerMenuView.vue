<template>
    <h1 style="text-align: center;" class="text-green-darken-4">Marker Menu</h1>
      <v-main>
        <v-container>
          <v-row v-for="marker in own_markers" :key="marker.id" density="comfortable">
            <v-col cols="12">
              <v-card @click="goToMarker(marker.id)" class="pb-5" color="green-darken-3">
                <v-card-title class="text-headline-small">
                  {{ marker.label }}
                </v-card-title>
                <v-card-subtitle>
                  {{ marker.description }}
                </v-card-subtitle>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-main>
</template>
<script>
import { useMarkersStore } from '@/store/markersStore';
import { mapActions, mapState } from 'pinia';
export default {
    name: 'MarkerMenuView',
    methods: {
      ...mapActions(useMarkersStore, {
        getMyMarkers: 'getMyMarkers'
    }),
    goToMarker(id) {
      this.$router.push({
        name: 'markerdatamenu',
        params: { id }
      })
    }
  },
    async mounted() {
      await this.getMyMarkers();
      console.log("markers", this.own_markers)
    },
    computed: {
      ...mapState(useMarkersStore, {
        own_markers: 'own_markers'
      })
    }
}
</script>