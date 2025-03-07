import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import Basket from '@/views/Basket.vue'
import Catalog from '@/views/Catalog.vue'
import Product from '@/views/Product.vue'
import Register from '@/views/Register.vue'
import Login from '@/views/Login.vue'
import Cart from '@/views/Cart.vue'

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
      path: '/product/:slug',
      name: 'ProductSlug',
      component: Product,
      props: true
    },
    {
      path: '/register',
      name: 'Register',
      component: Register,
  },
  {
      path: '/login',
      name: 'Login',
      component: Login,
  },
  {
    path: '/cart',
    name: 'Cart',
    component: Cart,
},
  ],
})

export default router