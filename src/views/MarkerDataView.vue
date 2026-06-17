<template>
  <div>
    <h1 style="text-align: center;" class="text-green-darken-4">{{ currentMarker?.label }}</h1>
    
    <!-- Фото (если есть) -->
    <div v-if="images.length > 0" class="photos-container">
      <h3 class="text-green-darken-4 ml-6">Photos</h3>
      <div class="photos-grid">
        <v-card 
          v-for="(image, index) in images" 
          :key="index"
          class="photo-card"
          @click="openImageDialog(index)"
        >
          <v-img
            :src="image"
            height="150"
            cover
            class="photo-image"
          ></v-img>
        </v-card>
      </div>
    </div>
    
    <v-dialog v-model="dialogVisible" max-width="800">
      <v-card>
        <v-card-title>
          <span class="text-h5">Photo view</span>
          <v-spacer></v-spacer>
          <v-btn icon @click="dialogVisible = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text>
          <div class="dialog-image-container">
            <v-img
              :src="selectedImage"
              max-height="600"
              contain
            ></v-img>
          </div>
        </v-card-text>
        <v-card-actions v-if="images.length > 1" class="justify-center">
          <v-btn @click="prevImage" icon>
            <v-icon>mdi-chevron-left</v-icon>
          </v-btn>
          <span class="mx-4">{{ currentImageIndex + 1 }} / {{ images.length }}</span>
          <v-btn @click="nextImage" icon>
            <v-icon>mdi-chevron-right</v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Description -->
    <h3 class="text-green-darken-4 ml-6 mt-4">Description</h3>
    <h4 class="ml-6">{{ currentMarker?.description }}</h4>
    <!-- + удаление -->
  </div>
</template>

<script>
import { useMarkersStore } from '@/store/markersStore';
import { mapActions, mapState } from 'pinia';

export default {
    name: 'MarkerDataMenuView',
    data() {
        return {
            images: [],
            dialogVisible: false,
            selectedImage: '',
            currentImageIndex: 0
        }
    },
    methods: {
        ...mapActions(useMarkersStore, {
            getCurrentMarker: 'getCurrentMarker',
            getImageByPath: 'getImageByPath'
        }),
        async loadImages() {
            // Проверяем, есть ли фото у маркера
            if (this.currentMarker?.photos && this.currentMarker.photos.length > 0) {
                this.images = [];
                console.log(this.currentMarker.photos)
                for (const photoPath of this.currentMarker.photos) {
                    try {
                        const imageBlob = await this.getImageByPath(photoPath.file_path);
                        const imageUrl = URL.createObjectURL(imageBlob);
                        this.images.push(imageUrl);
                        console.log(this.currentMarker)
                    } catch (error) {
                        console.error('Error loading image:', error);
                    }
                }
            }
            console.log(this.images)
        },
        openImageDialog(index) {
            this.currentImageIndex = index;
            this.selectedImage = this.images[index];
            this.dialogVisible = true;
        },
        nextImage() {
            if (this.currentImageIndex < this.images.length - 1) {
                this.currentImageIndex++;
                this.selectedImage = this.images[this.currentImageIndex];
            }
        },
        prevImage() {
            if (this.currentImageIndex > 0) {
                this.currentImageIndex--;
                this.selectedImage = this.images[this.currentImageIndex];
            }
        }
    },
    computed: {
        ...mapState(useMarkersStore, {
            currentMarker: 'currentMarker'
        }),
        markerId() {
            return this.$route.params.id;
        }
    },
    watch: {
        currentMarker(newVal) {
            if (newVal) {
                this.loadImages();
            }
        }
    },
    async mounted() {
        await this.getCurrentMarker(this.markerId);
        // Если маркер уже загружен, загружаем фото
        if (this.currentMarker) {
            await this.loadImages();
        }
    },
    beforeUnmount() {
        // Очищаем URL-объекты для предотвращения утечек памяти
        this.images.forEach(url => {
            if (url.startsWith('blob:')) {
                URL.revokeObjectURL(url);
            }
        });
    }
}
</script>

<style scoped>
.photos-container {
  margin: 20px 0;
}

.photos-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 10px;
  padding: 0 24px;
}

.photo-card {
  cursor: pointer;
  transition: transform 0.2s;
}

.photo-card:hover {
  transform: scale(1.05);
  box-shadow: 0 4px 8px rgba(0,0,0,0.2);
}

.photo-image {
  border-radius: 8px;
}

.dialog-image-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 300px;
}

h3, h4 {
  margin: 10px 0;
}
</style>