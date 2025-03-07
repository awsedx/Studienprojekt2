<template>
  <div class="navbar">
    <router-link v-for="route in routes" :to="route.link"
      :class="$router.currentRoute.value.path.includes(route.link) ? 'navLink navLinkActive' : 'navLink'">{{ route.text }}
    </router-link>
    <div class="user-info" v-if="isAuthenticated">
      <span>Welcome, {{ user.username }}</span>
      <button @click="logout">Logout</button>
    </div>
    <div class="auth-links" v-else>
      <router-link to="/login" class="navLink">Login</router-link>
      <router-link to="/register" class="navLink">Register</router-link>
    </div>
  </div>
  <div class="routerView">
    <router-view />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  data() {
    return {
      routes: [
        {
          link: "/home",
          text: "Home"
        },
        {
          link: "/catalog",
          text: "Catalog"
        },
        {
          link: "/product",
          text: "Product"
        },
        {
          link: "/basket",
          text: "Basket"
        },
      ]
    }
  },
  computed: {
    ...mapGetters(['isAuthenticated', 'user']),
  },
  methods: {
    ...mapActions(['logout']),
  }
}
</script>

<style>
.navbar {
  max-height: fit-content;
  background-color: rgb(44, 44, 44);
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin: 0px;
  padding: 0.5rem;
}

.navLink {
  color: grey;
  font-size: large;
  text-decoration: none;
  margin: 5px;
}

.navLink:hover {
  color: rgb(214, 214, 214);
}

.navLinkActive {
  color: white;
}

.user-info {
  display: flex;
  align-items: center;
  color: white;
}

.user-info span {
  margin-right: 10px;
}

.auth-links {
  display: flex;
  align-items: center;
}

.auth-links .navLink {
  margin-left: 10px;
}

.routerView {
  margin: 1rem 1rem 0rem;
}
</style>