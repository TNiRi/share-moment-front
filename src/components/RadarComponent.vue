<template>
    <v-container id="radar-component" class="d-flex justify-center">
        <v-btn 
            variant="elevated" 
            icon="mdi-radar" 
            width="100" 
            height="100" 
            elevation="10"
            color="light-green-darken-3"></v-btn>
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
}
</style>