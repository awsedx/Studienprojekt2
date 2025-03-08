<template>
  <div>

  </div>
  <h1>Basket & Checkout</h1>
  <button @click="fetchData">fetch data</button>
  <!-- <Item v-if="fetchComplete" v-for="item in items" :title="item.title" :description="item.description" :slug="item.slug"
    :price="item.price" /> -->
  <!-- <p v-else>Click the Button to Fetch Data</p> -->
  <div v-if="loggedIn">
    <!-- <BasketItem v-for="item in contents" :id="item.id" :amount="item.amount"></BasketItem>
    <button @click="checkOut" class="checkOutButton">Checkout</button> -->
    <div class="catalogDiv">
      <BasketItem v-if="fetchComplete" v-for="item in items" :title="item.title" :description="item.description"
        :slug="item.slug" :price="item.price" :product-id="item.id" :amount="item.amount" />
      <p v-else>Click the Button to Fetch Data</p>
    </div>
    <button v-if="items.length>0" @click="checkOut" class="checkOutButton">Checkout</button>
    <p v-else>No items in Basket</p>
  </div>

</template>

<script>
import { API_ADRESS } from '@/api';
import { authData } from '@/auth';
import BasketItem from '@/components/BasketItem.vue';
import CatalogItem from '@/components/CatalogItem.vue';
import axios from 'axios';
export default {
  components: {
    BasketItem: BasketItem,
    CatalogItem: CatalogItem,
  },
  data() {
    return {
      fetchComplete: false,
      items: [],
      contents: [],
    }
  },
  methods: {
    fetchData() {
      if (!authData.loggedIn) {
        alert("You need to be logged in to view the shopping basket!");
        return;
      }

      axios.get(API_ADRESS + "cart/", {
        headers: {
          Authorization: `Bearer ${authData.access}`
        },
      }).then((response) => {
        console.log(response);
        this.items = [];
        for (const item of response.data) {
          console.log(item)
          this.items.push({
            amount: item.quantity,
            title: item.product.title,
            slug: item.product.slug,
            description: item.product.description,
            price: item.product.price,
            id: item.product.id,
          });
        }
        this.fetchComplete = true;
      }).catch((error) => {
        console.log(error);
        return;
      });

      // let products = [];
      // axios.get(API_ADRESS + "products/").then((response) => {
      // });
      // for (const item of this.contents) {
      //   this.items.push
      // }
    },

    checkOut() {
      axios.post(`${API_ADRESS}order/create/`, {},
        {
          headers: {
            Authorization: `Bearer ${authData.access}`
          }
        }
      ).then((response) => {
        console.log(response);
        alert("checkout successful!");
        this.$router.push("/catalog");
      }).catch((error) => {
        console.log(error);
        alert("error while checking out!");
      });
    },
  },
  mounted() {
    this.fetchData();
  },
  computed: {
    loggedIn() {
      return authData.loggedIn;
    }
  }
}
</script>

<style>
.checkOutButton {
  background-color: cornflowerblue;
  color: white;
  width: 20rem;
  font-size: xx-large;
  padding: 0.2rem;
  border-radius: 20px;
}

.checkOutButton:hover {
  background-color: rgb(141, 176, 239);
  cursor: pointer;
}

.checkOutButton:active {
  background-color: cornflowerblue;
}

.catalogDiv {
  display: flex;
  flex-direction: row;
  justify-content: left;
  flex-wrap: wrap;
  width: 100%;
}
</style>