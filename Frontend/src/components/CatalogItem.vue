<template>
    <Item :title="title" :price="price" :description="description" :slug="slug"></Item>
    <button @click="addToCart(productId)">Add to Cart</button>
</template>
<script>
import axios from 'axios';
import Item from './Item.vue';
import { API_ADRESS } from '@/api';
export default {
    components: {
        Item: Item,
    },
    props: {
        title: {
            required: true,
            type: String
        },
        price: {
            required: true,
            type: Number
        },
        description: {
            required: false,
            default: "",
            type: String
        },
        slug: {
            required: true,
            type: String
        },
        productId: {
            required: true,
            type: Number,
        }
    },
    methods:{
        addToCart(id){
            axios.post(`${API_ADRESS}cart/add/`, {
                
            })
        }
    }
}
</script>
<style></style>