<template>
    <v-form action="">
        <v-text-field label="Email" type="email" v-model="user_data.email"></v-text-field>
        <v-text-field label="Nickname" type="text" v-model="user_data.nickname"></v-text-field>
        <v-text-field label="Password" type="password" v-model="user_data.password"></v-text-field>
        <v-btn>Sign Up</v-btn>
    </v-form>
</template>

<script>
export default {
    data() {
    return {
        user_data: {
            email: '',
            nickname: '',
            password: ''
        }
    }
  }}
</script>