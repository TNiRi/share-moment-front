<template>
    <v-container id="radar-component" class="d-flex justify-center" color="light-green-3">
        <v-btn  id="btn"
            variant="elevated" 
            icon="mdi-radar" 
            width="100" 
            height="100" 
            elevation="10"
            color="light-green-darken-3"></v-btn>
        <v-sheet :height="200" :width="200"></v-sheet>
    </v-container>
</template>
<script>
export default {

}
</script>
<style scoped>
#radar-component{
    z-index: 11;
    position: fixed;
    bottom: 0;
    background-color: lightgreen;
    height: 75px;
}
#btn{
    margin-top: -70px;
}
</style>