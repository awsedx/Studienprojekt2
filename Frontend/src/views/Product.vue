<template>
  <div>
    <h1>Produkte</h1>
    <div class="product-grid">
      <div class="product" v-for="product in products" :key="product.id">
        <router-link :to="{ name: 'ProductDetail', params: { slug: product.slug } }">
          <h2>{{ product.title }}</h2>
          <p>{{ product.get_display_price }}€</p>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { fetchProducts } from '../api';

export default {
  data() {
    return {
      products: []
    };
  },
  async created() {
    try {
      this.products = await fetchProducts();
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  }
};
</script>

<style>
.product-grid {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
}
.product {
  background-color: #ecf0f1;
  border: 1px solid #bdc3c7;
  border-radius: 10px;
  padding: 20px;
  width: 30%;
  box-sizing: border-box;
}
.product h2 {
  color: #2c3e50;
}
.product p {
  color: #7f8c8d;
}
</style>