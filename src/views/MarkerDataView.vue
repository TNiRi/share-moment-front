<template>
    <h1 style="text-align: center;" class="text-green-darken-4">{{ marker?.label }}</h1>
    <!-- фото (если есть) -->
    <h3 class="text-green-darken-4 ml-6">Description</h3>
    <h4 class="ml-6">{{ marker?.description }}</h4>
    <!-- + изменение настроек приватности и удаление -->
</template>
<script>
import { useMarkersStore } from '@/store/markersStore';
import { mapActions } from 'pinia';
export default {
    name: 'MarkerDataMenuView',
    data() {
        return {
            marker: null
        };
    },
    methods: {
      ...mapActions(useMarkersStore, {
        getMarkerById: 'getMarkerById'
    }),
    async getData() {
            this.marker = await this.getMarkerById(this.markerId); 
        }
    },
    computed: {
    markerId() {
            return this.$route.params.id;
        }
    },
    async mounted() {
        await this.getData();
    }
}
</script>