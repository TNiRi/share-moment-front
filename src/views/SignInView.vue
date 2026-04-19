<template>
    <form action="">
        <input type="nickname" v-model="user_data.nickname">
        <input type="password" v-model="user_data.password">
        <button @click="doSignIn">sign in</button>
    </form>
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