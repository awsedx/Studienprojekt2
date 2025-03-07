<!-- filepath: c:\Users\artus\OneDrive\Desktop\studieprojekt 2\Stud2\Studienprojekt2\Frontend\src\views\Login.vue -->
<template>
    <div>
        <h1>Login</h1>
        <form @submit.prevent="loginUser">
            <input v-model="username" placeholder="Username" required />
            <input v-model="password" type="password" placeholder="Password" required />
            <button type="submit">Login</button>
        </form>
    </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
    data() {
        return {
            username: '',
            password: '',
        }
    },
    methods: {
        ...mapActions(['login']),
        async loginUser() {
            try {
                await this.login({
                    username: this.username,
                    password: this.password,
                })
                this.$router.push('/home')
            } catch (error) {
                console.error('Login failed:', error.response.data)
            }
        },
    },
}
</script>