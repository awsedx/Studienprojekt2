<template>
    <div class="basketItemContainer">
        <Item :title="title" :price="price" :description="description" :slug="slug"></Item>
        <h3 style="margin: 0px;">Amount: {{ amount }}</h3>
    </div>
</template>
<script>
import Item from './Item.vue';

export default {
    components:{
        Item
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
        },
        amount: {
            required: true,
            type: Number,
        }
    },
}
</script>
<style>
.basketItemContainer{
    /* border: solid black 2px; */
    border: none;
    /* background-color: lightgray; */
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: fit-content;
    margin: 1rem;
}
</style>