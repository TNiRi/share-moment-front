<template>
  <v-sheet class="mx-auto" width="300">
    <v-form @submit.prevent>
        <h1>creating marker</h1>
        <v-text-field
        clearable
        label="title"
        id="label"
        v-model="label"
        variant="outlined">
        </v-text-field>

        <label for="radius_m">radius (m)</label>
        <v-slider id="radius_m"
            v-model="radius_m"
            :max="3000"
            :min="200"
            :step="200"
            thumb-label
        ></v-slider>

        <v-textarea
        clearable
        v-model="description"
        label="description"
        variant="outlined">
        </v-textarea>

        <!-- Поле для загрузки файлов -->
        <v-file-input
          v-model="files"
          label="Upload files"
          multiple
          clearable
          variant="outlined"
          prepend-icon="mdi-paperclip"
          accept="image/*,.pdf,.doc,.docx,.txt"
          show-size
          counter
        ></v-file-input>

      <v-btn class="mt-2" type="submit" block @click="do_create_marker">Create</v-btn>
    </v-form>
  </v-sheet>
</template>
<script>
import { mapActions } from 'pinia';
import { useMarkersStore } from '@/store/markersStore';
import getUserCoords from '@/utils/getUserCoords';
export default {
    name: 'CreateMarkerView',
    data() {
        return {
            label: '',
            radius_m: 400,
            latitude: 0,
            longitude: 0,
            description: '',
            files: [] // Массив для хранения загруженных файлов
        }
    },
    methods: {
      ...mapActions(useMarkersStore, {
        createMarker: 'createMarker'
    }),
    async do_create_marker(e) {
      e.preventDefault();
      await getUserCoords();
      
      // Подготовка данных для отправки (включая файлы)
      const marker_data = {
        label: this.label,
        radius_km: this.radius_m / 1000,
        latitude: this.latitude,
        longitude: this.longitude,
        description: this.description,
        files: this.files // Добавляем файлы в данные
      }
      
      console.log(marker_data);
      const result = await this.createMarker(marker_data);
      if (result) {
          this.$router.push({ name: 'home'})
      }
    }
  }
}
</script>

<style scoped>
h1{
    text-align: center;
    padding: 20px 0;
}
</style>