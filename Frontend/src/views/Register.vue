<template>
    <div>
      <h1>Register</h1>
      <form @submit.prevent="registerUser">
        <input v-model="username" placeholder="Username" required />
        <input v-model="email" type="email" placeholder="Email" required />
        <input v-model="password" type="password" placeholder="Password" required />
        <button type="submit">Register</button>
      </form>
    </div>
  </template>
  
  <script>
  import { mapActions } from 'vuex'
  
  export default {
    data() {
      return {
        username: '',
        email: '',
        password: '',
      }
    },
    methods: {
      ...mapActions(['register']),
      async registerUser() {
        try {
          await this.register({
            username: this.username,
            email: this.email,
            password: this.password,
          })
          this.$router.push('/home')
        } catch (error) {
          console.error('Registration failed:', error.response.data)
        }
      },
    },
  }
  </script>