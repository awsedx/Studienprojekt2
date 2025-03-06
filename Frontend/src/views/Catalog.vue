<template>
    and this is the catalog
    <button @click="exampleAxios">le test button</button>
</template>

<script>
import axios from 'axios';
export default {
    data() {
        return {

        }
    },
    methods: {
        exampleAxios() {
            axios.get("https://api.sampleapis.com/coffee/hot").then((response) => {
                console.log(response);
            });
        }
    }
}
</script>

<style></style>