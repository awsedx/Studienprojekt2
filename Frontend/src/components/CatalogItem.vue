<template>
    <div class="catalogitemContainer">
        <Item :title="title" :price="price" :description="description" :slug="slug"></Item>
        <button @click="addToCart(productId)" class="add2cartbutton">Add to Cart</button>
    </div>
</template>
<script>
import axios from 'axios';
import Item from './Item.vue';
import { API_ADRESS } from '@/api';
import { authData } from '@/auth';
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
    methods: {
        addToCart(id) {
            if (!authData.loggedIn) {
                alert("You need to be logged in to add items to the shopping basket!");
                return;
            }
            axios.post(`${API_ADRESS}cart/add/`, {
                "quantity": 1,
                "product_id": id,
            }, {
                headers: {
                    Authorization: `Bearer ${authData.access}`
                }
            }).then((response) => {
                console.log(response);
                alert(`succesfully added 1 ${this.title} to the shopping basket!`)
            }).catch((error) => {
                console.log(error);
                alert(`something went wrong while adding product ${this.title} to the shopping basket.`);
            });
        }
    }
}
</script>
<style>
.add2cartbutton {
    color: white;
    background-color: dodgerblue;
    font-size: larger;
    border-radius: 20px;
    padding: 5px;
    /* margin-left: 1rem; */
}

.add2cartbutton:hover {
    background-color: rgb(64, 158, 252);
    cursor: pointer;
}

.add2cartbutton:active {
    background-color: dodgerblue;
}

.catalogitemContainer {
    /* border: 1px dashed grey; */
    background-color: white;
    border-radius: 20px;
    padding: 1rem;
    margin-bottom: 2rem;
    width: fit-content;
    display: flex;
    flex-direction: column;
    align-items: center;
}
</style>