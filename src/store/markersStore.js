import { defineStore } from 'pinia'
import { useUserStore } from './userStore'


export const useMarkersStore = defineStore('MarkersStore', {
    state() {
        return {
        }
    },
    actions: {
        async createMarker(marker_data) {
            const user_store = useUserStore();
            const token = user_store.token;
        }
    }
})
