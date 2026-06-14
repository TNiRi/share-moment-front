<template>
    <h1 style="text-align: center;" class="text-green-darken-4">{{ currentMarker?.label }}</h1>
    <!-- фото (если есть) -->
    <h3 class="text-green-darken-4 ml-6">Description</h3>
    <h4 class="ml-6">{{ currentMarker?.description }}</h4>
    <!-- + изменение настроек приватности и удаление -->
</template>
<script>
import { useMarkersStore } from '@/store/markersStore';
import { mapActions, mapState } from 'pinia';
export default {
    name: 'MarkerDataMenuView',
    methods: {
        ...mapActions(useMarkersStore, {
            getCurrentMarker: 'getCurrentMarker'
        })
    },
    computed: {
        ...mapState(useMarkersStore, {
            currentMarker: 'currentMarker'
        }),
        markerId() {
            return this.$route.params.id;
        }
    },
    async mounted() {
        await this.getCurrentMarker(this.markerId)
    }
}
</script>