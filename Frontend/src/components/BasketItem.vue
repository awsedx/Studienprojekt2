<template>
    <div class="basketItemContainer">
        <h3>Product ID: {{ id }}</h3>
        <h3>Amount: {{ amount }}</h3>
    </div>
</template>
<script>
export default {
    props:{
        id: Number,
        amount: Number,
    }
}
</script>
<style>
.basketItemContainer{
    border: solid black 2px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 20rem;
    margin: 1rem;
}
</style>