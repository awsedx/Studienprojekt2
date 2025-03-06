<template>
  <div class="navbar">
    <router-link v-for="route in routes" :to="route.link"
      :class="$router.currentRoute.value.path.includes(route.link) ? 'navLink navLinkActive' : 'navLink'">{{ route.text }}
    </router-link>
  </div>
  <div class="routerView">
    <router-view />
  </div>
</template>

<script>
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
  methods: {
    println(message) {
      console.log(message);
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
  justify-content: left;
  margin: 0px;
  /* position: fixed; */
  left: 0px;
  top: 0px;
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

.routerView {
  margin: 1rem 1rem 0rem;
}
</style>