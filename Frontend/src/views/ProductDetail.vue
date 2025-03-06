<template>
    <div>
      <h1>{{ product.title }}</h1>
      <p>{{ product.description }}</p>
      <p>{{ product.get_display_price }}€</p>
    </div>
  </template>
  
  <script>
  import { fetchProduct } from '../api';
  
  export default {
    props: ['slug'],
    data() {
      return {
        product: null,
      };
    },
    async created() {
      try {
        this.product = await fetchProduct(this.slug);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    }
  };
  </script>
  
  <style>
  /* Hier style einfügen */
  </style>