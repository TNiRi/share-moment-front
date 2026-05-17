<template>
  <v-sheet class="mx-auto" width="300">
    <v-form @submit.prevent>
        <h1>creating marker</h1>
        <v-text-field
        clearable
        label="title"
        id="label"
        variant="outlined">
        </v-text-field>

        <label for="radius_m">radius (m)</label>
        <v-slider id="radius_m"
            v-model="radius_m"
            :max="3000"
            :min="200"
            :step="200"
            thumb-label
        ></v-slider>

        <v-textarea
        clearable
        label="description"
        variant="outlined">
        </v-textarea>

      <v-btn class="mt-2" type="submit" block>Submit</v-btn>
    </v-form>
  </v-sheet>
</template>
<script>
export default {
    name: 'CreateMarkerView',
    data() {
        return {
            label: '',
            radius_m: 400,
            description: ''
        }
    }
}
</script>

<style scoped>
h1{
    text-align: center;
    padding: 20px 0;
}
</style>