<template>
    <form action="">
        <input type="email" v-model="user_data.email">
        <input type="text" v-model="user_data.nickname">
        <input type="password" v-model="user_data.password">
        <button>sign up</button>
    </form>
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