<template>
    <v-app-bar :elevation="2" color="light-green-darken-3">
      <v-app-bar-title>Share Moment</v-app-bar-title>
      <template v-slot:append>
          <p v-if="user_data">{{ user_data.nickname }}</p>
        </template>
    </v-app-bar>
</template>
<script>
import { mapState } from 'pinia';
import { useUserStore } from '@/store/userStore';
export default {
computed: {
    ...mapState(useUserStore, {
        user_data: 'user_data'
    })
}
}
</script>
<style>
</style>