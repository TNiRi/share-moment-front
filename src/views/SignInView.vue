<template>
    <v-card
        class="mx-auto pa-5 mt-10"
        max-width="344"
        title="User Sign In">
        <v-form action="">
            <v-text-field type="email" v-model="user_data.login" placeholder="email or nickname" variant="outlined" /> 
            <v-text-field type="password" v-model="user_data.password" placeholder="password" variant="outlined" />
            <div class="d-flex justify-end">
                <v-btn @click="doSignIn" color="green-darken-3">sign in</v-btn>
            </div>
        </v-form>
    </v-card>
    <div class="text-center mt-6 text-grey-darken-2">
        Ещё нет аккаунта? Зарегистрируйтесь 
        <router-link to="/signup" class="text-grey-darken-4 font-weight-bold text-decoration-none">
            здесь
        </router-link>
    </div>
    <v-snackbar v-model="snackbar" :timeout="3000">
      {{ snackbarText }}
        <template v-slot:actions>
            <v-btn color="red" variant="text" @click="snackbar = false">Close</v-btn>
        </template>
    </v-snackbar>
</template>

<script>
import { mapActions } from 'pinia';
import { useUserStore } from '@/store/userStore';
export default {
    data() {
    return {
        snackbar: false,
        snackbarText: "Неправильный логин или пароль!",
        user_data: {
            login: '',
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
        let signin_data
        if (this.user_data.login.includes('@')) {
            signin_data = {
                email: this.user_data.login,
                password: this.user_data.password
            }
        }
        else {
            signin_data = {
                nickname: this.user_data.login,
                password: this.user_data.password
            }
        }
        const result = await this.signIn(signin_data);
        if (result) {
            this.$router.push({ name: 'home'});
        }
        else{
            this.snackbar = true;
        }
    }
  }
}
</script>