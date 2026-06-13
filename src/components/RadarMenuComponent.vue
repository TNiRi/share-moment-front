<template>
    <div class="bottom-nav">
        <router-link
            :to="{ name: 'createmarker' }"
            class="nav-item"
        >
            <v-icon size="28">mdi-map-marker-plus</v-icon>
            <span>Создать</span>
        </router-link>

        <v-btn
            class="radar-btn"
            icon
            color="light-green-darken-3"
            elevation="10"
            @click="search"
        >
            <v-icon size="36">mdi-radar</v-icon>
        </v-btn>

        <router-link
            :to="{ name: 'markermenu' }"
            class="nav-item"
        >
            <v-icon size="28">mdi-map-marker-multiple</v-icon>
            <span>Метки</span>
        </router-link>
    </div>
</template>
<script>
export default {
    name: 'RadarMenuComponent',
    methods: {
        search(){
            this.$emit('search');
        }
    }
}
</script>
<style scoped>
.bottom-nav {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 80px;
    background: white;
    display: flex;
    justify-content: space-around;
    align-items: center;
    border-radius: 24px 24px 0 0;
    box-shadow:0 -4px 20px rgba(0, 0, 0, 0.15);
    z-index: 100;
}

.nav-item {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-decoration: none;
    color: #444;
    font-size: 12px;
    font-weight: 500;
    gap: 4px;
    transition: 0.2s;
}

.nav-item:active {
    transform: scale(0.95);
}

.radar-btn {
    position: absolute !important;
    top: -30px;
    width: 72px !important;
    height: 72px !important;
    border: 4px solid white;
    box-shadow:
        0 8px 20px rgba(18, 125, 23, 0.4) !important;
}
</style>