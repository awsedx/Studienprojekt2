<template>
  <div class="navbar">
    <div class="routes">
      <router-link v-for="route in routes" :to="route.link"
        :class="$router.currentRoute.value.path.includes(route.link) ? 'navLink navLinkActive' : 'navLink'">{{
          route.text }}
      </router-link>
    </div>
    <div class="login" v-if=loggedIn>
      <p class="navLink">Welcome, {{ userName }}</p>
      <button class="logInOutButton" @click="logOut">Log Out</button>
    </div>
    <div class="login" v-else>
      <p class="navLink">not currently logged in</p>
      <router-link :to="'/login'" class="logInOutButton">Log In</router-link>
    </div>

  </div>
  <div class="routerView">
    <router-view />
  </div>
</template>

<script>
import axios from 'axios';
import { API_AUTH } from './api';
import { authData } from './auth';

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
        {
          link: "/test",
          text: "Test"
        },
      ],
      userName: "",
    }
  },
  methods: {
    println(message) {
      console.log(message);
    },
    logOut() {
      authData.access = "";
      authData.refresh = "";
      authData.loggedIn = false;
    },
  },
  computed: {
    loggedIn() {
      return authData.loggedIn;
    }
  },
  watch:{
    loggedIn(){
      if (this.loggedIn) {
        axios.get(`${API_AUTH}user/`, {
          headers:{
            Authorization: `Bearer ${authData.access}`
          },
        }).then((response) => {
          console.log(response);
          this.userName = response.data.username;
        }).catch((error) => {
          console.log(error);
        });
      }
    }
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
  /* position: fixed; */
  left: 0px;
  top: 0px;
}

.routes {
  display: flex;
  justify-content: left;
  padding: 0.5rem;
}

.login {
  display: flex;
  flex-direction: row;
  justify-content: right;
  align-items: center;
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

.routerView {
  margin: 1rem 1rem 0rem;
}

.logInOutButton {
  color: white;
  background-color: rgb(27, 177, 0);
  border-radius: 10px;
  height: fit-content;
  margin: 5px;
  margin-right: 10px;
  font-size: medium;
  border: solid white 1px;
  padding: 5px;
  text-decoration: none;
  font-size: large;
}

.logInOutButton:active {
  border: solid gray 1px;
  background-color: rgb(18, 120, 0);
}
</style>