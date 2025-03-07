import { createStore } from 'vuex'
import axios from 'axios'
import { API_AUTH, API_ADRESS } from '@/api.js'

export default createStore({
  state: {
    token: localStorage.getItem('token') || '',
    user: {},
    products: [],
    cart: [],
  },
  mutations: {
    setToken(state, token) {
      state.token = token
      localStorage.setItem('token', token)
    },
    setUser(state, user) {
      state.user = user
    },
    setProducts(state, products) {
      state.products = products
    },
    setCart(state, cart) {
      state.cart = cart
    },
    logout(state) {
      state.token = ''
      state.user = {}
      localStorage.removeItem('token')
    },
  },
  actions: {
    async register({ commit }, user) {
      try {
        const response = await axios.post(API_AUTH + 'register/', user)
        commit('setToken', response.data.token)
        commit('setUser', response.data.user)
      } catch (error) {
        console.error('Registration failed:', error.response.data)
      }
    },
    async login({ commit }, user) {
      try {
        const response = await axios.post(API_AUTH + 'login/', user)
        commit('setToken', response.data.access)
        const userResponse = await axios.get(API_AUTH + 'user/', {
          headers: {
            Authorization: `Bearer ${response.data.access}`
          }
        })
        commit('setUser', userResponse.data)
      } catch (error) {
        console.error('Login failed:', error.response.data)
      }
    },
    async getProducts({ commit }) {
      try {
        const response = await axios.get(API_ADRESS + 'products/')
        commit('setProducts', response.data)
      } catch (error) {
        console.error('Fetching products failed:', error.response.data)
      }
    },
    async addToCart({ commit }, { product_id, quantity }) {
      try {
        const response = await axios.post(API_ADRESS + 'cart/add/', { product_id, quantity }, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        })
        if (response.status === 200) {
          console.log('Product added to cart')
        }
      } catch (error) {
        console.error('Adding to cart failed:', error.response.data)
      }
    },
    async fetchCart({ commit }) {
      try {
        const response = await axios.get(API_ADRESS + 'cart/', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        })
        commit('setCart', response.data)
      } catch (error) {
        console.error('Fetching cart failed:', error.response.data)
      }
    },
    async createOrder({ commit }) {
      try {
        const response = await axios.post(API_ADRESS + 'order/create/', {}, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        })
        if (response.status === 201) {
          console.log('Order created')
          commit('setCart', [])
        }
      } catch (error) {
        console.error('Creating order failed:', error.response.data)
      }
    },
    logout({ commit }) {
      commit('logout')
    },
  },
  getters: {
    isAuthenticated: state => !!state.token,
    user: state => state.user,
    products: state => state.products,
    cart: state => state.cart,
  },
})