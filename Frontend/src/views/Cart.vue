<!-- filepath: c:\Users\artus\OneDrive\Desktop\studieprojekt 2\Stud2\Studienprojekt2\Frontend\src\views\Cart.vue -->
<template>
    <div>
        <h1>Cart</h1>
        <div v-if="cart.length">
            <div v-for="item in cart" :key="item.id">
                <h3>{{ item.product.title }}</h3>
                <p>{{ item.quantity }} x {{ (item.product.price / 100).toFixed(2) }}€</p>
            </div>
            <button @click="createOrder">Place Order</button>
        </div>
        <p v-else>Your cart is empty</p>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
    computed: {
        ...mapGetters(['cart']),
    },
    methods: {
        ...mapActions(['fetchCart', 'createOrder']),
        async createOrder() {
            try {
                await this.createOrder()
                console.log('Order placed successfully')
            } catch (error) {
                console.error('Order placement failed:', error)
            }
        }
    },
    created() {
        this.fetchCart()
    },
}
</script>