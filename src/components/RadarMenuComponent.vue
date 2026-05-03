<template>
    <v-container fluid id="radar-component" class="d-flex justify-center">
        <v-sheet class="radar-menu-side" height="75" width="50%">
            <router-link :to="{name : 'createmarker'}">Создать метку</router-link>
        </v-sheet>
        <v-btn 
            id="radar-btn"
            location="bottom center"
            variant="elevated" 
            icon="mdi-radar" 
            width="100" 
            height="100" 
            elevation="10"
            color="light-green-darken-3"></v-btn>
        <v-divider inset vertical></v-divider>
        <v-sheet class="radar-menu-side" height="75" width="50%">
            <router-link :to="{name : 'markermenu'}">Мои метки</router-link>
        </v-sheet>
    </v-container>
</template>
<script>
export default {

}
</script>
<style scoped>
#radar-component{
    /* z-index: 11; */
    position: fixed;
    bottom: 0;
    background-color: #127d17;
    height: 75px;
}
.radar-menu-side{
    background-color: #127d17;
    display: flex;
    justify-content: center;
    align-items: center;
    color: black;
}
#radar-btn{
    z-index: 11;
    position: fixed; 
    bottom: 0;
    height: 75px;
}
</style>