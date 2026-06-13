import { defineStore } from 'pinia'
import { useUserStore } from './userStore'
import { create_marker, get_my_markers, get_near_markers } from '@/api/markerApi';


export const useMarkersStore = defineStore('MarkersStore', {
    state() {
        return {
            own_markers: [],
            markers: [],
            userCoords: null
        }
    },
    actions: {
        setUserCoords(latitude, longitude) {
            this.userCoords = {latitude, longitude};
        },
        async createMarker(marker_data) {
            const user_store = useUserStore();
            const token = user_store.token;
            if (!token) {
                return false;
            }
            const result = await create_marker(token, marker_data);
            return result;
        },
        async getMyMarkers(){
            const user_store = useUserStore();
            const token = user_store.token;
            if (!token) {
                return false;
            }
            const result = await get_my_markers(token);
            this.own_markers = result;
        },
        async getNearMarkers(latitude, longitude) {
            const user_store = useUserStore();
            const token = user_store.token;
            if (!token) {
                return false;
            }
            const result = await get_near_markers(token, latitude, longitude);
            console.log("Я получил эти метки: ", result);
            this.markers = result;
        },
        getMarkerById(id) {
            return (this.own_markers)? this.own_markers.find(marker => marker.id === id): null
        }
    }
})
