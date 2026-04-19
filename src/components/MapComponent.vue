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
  
  export default {
    name: 'MapComponent',
    data() {
      return {
        map: null,
        userLocation: null,
        markers: []
      };
    },
    mounted() {
      this.initMap();
    },
    beforeUnmount() {
      if (this.map) this.map.remove();
    },
    methods: {
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
          new maplibregl.Marker({ color: '#1976D2' })
            .setLngLat(this.userLocation)
            .addTo(this.map);
        });
      },
      
      addCheckinMarker(lngLat, checkinData) {
        const marker = new maplibregl.Marker({ color: '#FF5252' })
          .setLngLat(lngLat)
          .setPopup(new maplibregl.Popup().setHTML(`
            <div class="pa-2">
              <h3>${checkinData.placeName}</h3>
              <p>${new Date(checkinData.time).toLocaleString()}</p>
              <v-btn small color="primary">View details</v-btn>
            </div>
          `))
          .addTo(this.map);
        
        this.markers.push(marker);
      },
      
      handleCheckin() {
        // Сохраняем текущую позицию
        if (this.userLocation) {
          const checkinData = {
            placeName: 'Current location',
            time: Date.now(),
            coordinates: this.userLocation
          };
          
          this.addCheckinMarker(this.userLocation, checkinData);
          this.$emit('checkin', checkinData);
        }
      }
    }
  };
  </script>
  
  <style scoped>
  .map-container {
    position: relative;
    height: 100vh;
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