<template>
    <v-card
        class="mx-auto pa-5 mt-10"
        max-width="344"
        title="User Sign In">
        <v-form action="">
            <v-text-field type="email" v-model="user_data.email" placeholder="email" variant="outlined" /> 
            <v-text-field type="text" v-model="user_data.nickname" placeholder="nickname" variant="outlined" />
            <v-text-field type="password" v-model="user_data.password" placeholder="password" variant="outlined" />
            <div class="d-flex justify-end">
                <v-btn @click="doSignIn" color="light-green-darken-3">sign in</v-btn>
            </div>
        </v-form>
    </v-card>
</template>

<script>
import { mapActions } from 'pinia';
import { useUserStore } from '@/store/userStore';
export default {
    data() {
    return {
        user_data: {
            nickname: '',
            password: ''
        }
    }
  },
  methods: {
    ...mapActions(useUserStore, {
        signIn: 'signIn'
    }),
    async doSignIn(e) {
        e.preventDefault();
        console.log(this.user_data);
        const result = await this.signIn(this.user_data);
        if (result) {
            this.$router.push({ name: 'home'})
        }
    }
  }
}
</script>