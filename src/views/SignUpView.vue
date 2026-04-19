<template>
    <v-card
        class="mx-auto pa-5 mt-10"
        max-width="344"
        title="User Registration">
        <v-form action="">
            <v-text-field type="email" v-model="user_data.email" placeholder="email" variant="outlined" />
            <v-text-field type="text" v-model="user_data.nickname" placeholder="nickname" variant="outlined" />
            <v-text-field type="password" v-model="user_data.password" placeholder="password" variant="outlined" />
            <div class="d-flex justify-end">
                <v-btn @click="doSignUp" color="light-green-darken-3">sign up</v-btn>
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
            email: '',
            nickname: '',
            password: ''
        }
    }
  },
  methods: {
    ...mapActions(useUserStore, {
        signUp: 'signUp'
    }),
    async doSignUp(e) {
        e.preventDefault();
        console.log(this.user_data);
        await this.signUp(this.user_data);
    }
  }
}
</script>