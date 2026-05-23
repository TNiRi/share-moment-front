import { defineStore } from 'pinia'
import { useUserStore } from './userStore'
import { create_marker } from '@/api/markerApi';


export const useMarkersStore = defineStore('MarkersStore', {
    state() {
        return {
        }
    },
    actions: {
        async createMarker(marker_data) {
            const user_store = useUserStore();
            const token = user_store.token;
            if (!token) {
                return false;
            }
            const result = await create_marker(token, marker_data);
            return result;
        }
    }
})
