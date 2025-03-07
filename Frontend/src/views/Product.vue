<!-- filepath: c:\Users\artus\OneDrive\Desktop\studieprojekt 2\Stud2\Studienprojekt2\Frontend\src\views\Product.vue -->
<template>
  <h1>Product</h1>
  <div class="devStuff">
    <input type="text" placeholder="slug goes here" v-model="product">
    <button @click="fetchItem(product)">Fetch item</button>
  </div>
  <div v-if="fetchedItem">
    <h4 class="grey">Title of Item:</h4>
    <h3 class="black">{{ title }}</h3>
    <h4 class="grey">Description</h4>
    <h3 class="black">{{ description }}</h3>
    <h4 class="grey">Price</h4>
    <h3 class="black">{{ price }}</h3>
    <button @click="addToCart">Zur Bestellung hinzufügen</button>
  </div>
  <div v-else>
    <h3 style="color: red;">Item not Found</h3>
  </div>
</template>

<script>
import { API_ADRESS } from "@/api.js";
import axios from "axios";
import { mapActions } from 'vuex'

export default {
  props: {
    slug: {
      type: String,
      default: "",
    }
  },
  data() {
    return {
      product: this.slug,
      fetchedItem: false,
      title: "",
      description: "",
      price: "",
      productId: null,
    }
  },
  methods: {
    ...mapActions(['addToCart']),
    fetchItem(slug) {
      try {
        axios.get(API_ADRESS + "product/" + slug + "/").then((response) => {
          if (response.status === 200) {
            this.fetchedItem = true;
            console.log(response);
            const data = response.data;
            this.title = data.title;
            this.description = data.description;
            this.price = (data.price / 100).toFixed(2) + "€";
            this.productId = data.id;
          } else {
            this.fetchedItem = false;
            console.log(response);
          }
        });
      } catch (error) {
        console.log(error);
        this.fetchedItem = false;
      }
    },
    async addToCart() {
      try {
        await this.addToCart({ product_id: this.productId, quantity: 1 })
        console.log('Product added to cart')
      } catch (error) {
        console.error('Adding to cart failed:', error.response.data)
      }
    }
  },
  mounted() {
    if (this.slug !== "") {
      this.fetchItem(this.slug);
    }
  }
};
</script>

<style>
.devStuff {
  display: flex;
  flex-direction: row;
}

.grey {
  color: grey;
  margin: 0px;
}

.black {
  margin-top: 0px;
}
</style>