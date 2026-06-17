<template>
    <v-app-bar :elevation="2" color="green-darken-3">
      <router-link to="{name : 'home'}">
        <v-app-bar-title>Share Moment</v-app-bar-title>
      </router-link>
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
    },
    mounted() {
        if(!this.user_data){
            this.$router.push({
                name: 'signin'
            })
        }
    }
}
</script>
<style>
</style>