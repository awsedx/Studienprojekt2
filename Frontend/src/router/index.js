import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import Basket from '@/views/Basket.vue'
import Catalog from '@/views/Catalog.vue'
import Product from '@/views/Product.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: 'home',
    },
    {
      path: '/home',
      name: 'home',
      component: Home,
    },
    {
      path: '/catalog',
      name: 'Catalog',
      component: Catalog,
    },
    {
      path: '/basket',
      name: 'Basket',
      component: Basket,
    },
    {
      path: '/product',
      name: 'Product',
      component: Product,
    },
    {
      path: '/product/:slug', // Add this route
      name: 'ProductSlug',
      component: Product,
      props: true
    },
  ],
})

export default router