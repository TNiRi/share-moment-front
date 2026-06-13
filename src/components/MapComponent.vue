<template>
    <v-container fluid class="pa-0 map-container">
      <div ref="mapContainer" class="map"></div>
  
      <v-btn
        color="primary"
        fab
        absolute
        bottom
        right
        class="ma-4 checkin-btn"
        @click="handleCheckin"
      >
        <v-icon>m-map-marker</v-icon>
      </v-btn>
    </v-container>
  </template>
  
<script>
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import { mapState } from 'pinia';
import { useMarkerStore } from '@/store/markersStore';
export default {
    name: 'MapComponent',
    props: {
        markers: {
            type: Array,
            default: () => []
        }
    },
    data() {
      return {
        map: null,
        userLocation: null
      };
    },
    mounted() {
      this.initMap();
    },
    beforeUnmount() {
      if (this.map) this.map.remove();
    },
    methods: {
      ...mapState(useMarkerStore, {
          userCoords: 'userCoords',
          markers: 'markers'
      }),
      initMap() {
        const apiKey = process.env.VUE_APP_MAPLIBRE_APIKEY;
        this.map = new maplibregl.Map({
          container: this.$refs.mapContainer,
          style: `https://api.maptiler.com/maps/bright/style.json?key=${apiKey}`,
          center: [37.6173, 55.7558], // Москва, для примера
          zoom: 15
      });
        // Добавляем геолокацию
        this.map.addControl(new maplibregl.GeolocateControl({
          positionOptions: { enableHighAccuracy: true },
          trackUserLocation: true
        }));
        
        this.map.on('load', () => {
          this.getUserLocation();
        });
      },
      
      getUserLocation() {
        navigator.geolocation.getCurrentPosition(position => {
          this.userLocation = [position.coords.longitude, position.coords.latitude];
          this.map.flyTo({ center: this.userLocation, zoom: 15 });
          
          // Маркер пользователя
          this.handleCheckin();
        });
      },
      
      showMarkers(){
        console.log('Updating markers on map:', this.markers);
        this.markers.forEach(marker => {
          new maplibregl.Marker({ color: '#FF5252' })
            .setLngLat([marker.longitude, marker.latitude])
            .setPopup(new maplibregl.Popup().setHTML(`
              <div class="pa-2">
                <h3>${marker.label}</h3>
                <p>${marker.description}</p>
                <p>${marker.longitude} ${marker.latitude}</p>
              </div>
            `))
            .addTo(this.map);
            console.log(`Added marker: ${marker.label} at [${marker.longitude}, ${marker.latitude}]`);
        });
      },

      addCheckinMarker(lngLat) {
        new maplibregl.Marker({ color: '#52FF52' })
          .setLngLat(lngLat)
          .addTo(this.map);
      },
      
      handleCheckin() {
        // Сохраняем текущую позицию
        if (this.userLocation) {
          this.addCheckinMarker(this.userLocation);
          // this.$emit('checkin', checkinData);
        }
      }
    },
    watch: {
        markers: {
            handler() {
                this.showMarkers();
            },
            deep: true
        }
    }
  };
  </script>
  
  <style scoped>
  .map-container {
    position: relative;
    height: calc(100vh - 140px);
    width: 100%;
  }
  .map {
    height: 100%;
    width: 100%;
  }
  .checkin-btn {
    z-index: 10;
  }
  </style>