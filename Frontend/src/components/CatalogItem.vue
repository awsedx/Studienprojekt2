<template>
    <div class="itemDiv">
        <router-link :to="'/product/'+slug">
            <h3>{{ title }}</h3>
            <h4>{{ (price / 100).toFixed(2)+"€" }}</h4>
            <p> {{ description }}</p>
        </router-link>
    </div>
</template>

<script>
export default {
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
        }
    },
    data() {
        return {
        }
    },

}
</script>

<style>
.itemDiv {
    border: 2px grey solid;
    margin: 1rem;
    display: flex;
    flex-direction: column;
    align-items: left;
    padding-left: 1rem;
}
</style>