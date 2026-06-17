import { defineStore } from 'pinia'
import { useUserStore } from './userStore'
import { create_marker, get_marker_by_id, get_my_markers, get_near_markers } from '@/api/markerApi';


export const useMarkersStore = defineStore('MarkersStore', {
    state() {
        return {
            own_markers: [],
            markers: [],
            currentMarker: null,
            userCoords: null
        }
    },
    actions: {
        setUserCoords(latitude, longitude) {
            this.userCoords = {latitude, longitude};
        },
        async createMarker(markerData) {
            const user_store = useUserStore();
            const token = user_store.token;
            if (!token) {
                return false;
            }
            const formData = new FormData();
            formData.append('label', markerData.label);
            formData.append('radius_km', markerData.radius_km);
            formData.append('latitude', markerData.latitude);
            formData.append('longitude', markerData.longitude);
            formData.append('description', markerData.description);
            
            // Добавляем файлы в FormData
            if (markerData.files && markerData.files.length) {
                for (let i = 0; i < markerData.files.length; i++) {
                    formData.append(`photo[${i}]`, markerData.files[i]);
                }
            }
            const result = await create_marker(token, formData);
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
        async getCurrentMarker(marker_id){
            const user_store = useUserStore();
            const token = user_store.token;
            if (!token) {
                return false;
            }
            const result = await get_marker_by_id(token, marker_id);
            this.currentMarker = result;
        }
    }
})
