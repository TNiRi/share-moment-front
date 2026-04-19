import { defineStore } from 'pinia'
import { sign_up, sign_in, me } from '@/api/userApi'

export const useUserStore = defineStore('userStore', {
    state() {
        return {
            token: null,
            user_data: null
        }
    },
    actions: {
        async signUp(user_data) {
            await sign_up(user_data);
        },
        async signIn(user_data) {
            const token = await sign_in(user_data)
            if (token) {
                this.token = token;
                this.user_data = await me(token);
                return true;
            }
            return false;
        }
    }
})

