<template>
    <h1>Item Catalog</h1>
    <button @click="fetchData">reload data</button>
    <p id="errorText"></p>
    <catalogItem v-if="fetchComplete" v-for="item in items" :title="item.title" :description="item.description"
        :slug="item.slug" :price="item.price" />
    <p v-else>Click the Button to Fetch Data</p>
</template>

<script>
import { API_ADRESS } from "@/api.js";
import CatalogItem from '@/components/CatalogItem.vue';
import axios from 'axios';
export default {
    components: {
        catalogItem: CatalogItem,
    },
    data() {
        return {
            fetchComplete: false,
            items: [],
        }
    },
    methods: {
        fetchData() {
            axios.get(API_ADRESS+"products/").then((response) => {
                console.log(response);
                if (response.status === 200) {
                    document.getElementById("errorText").innerText = "";
                    this.items = [];
                    for (const item of response.data) {
                        this.items.push({
                            title: item.title,
                            slug: item.slug,
                            description: item.description,
                            price: item.price,
                        });
                    }
                    this.fetchComplete = true;
                } else {
                    let text = "An Error occured fetching Data: ";
                    text += response.status.toString();
                    text += response.statusText;
                    document.getElementById("errorText").innerText = text;
                    this.fetchComplete = false;
                }
            });
        }
    },
    created() {
        this.fetchData();
    }
}
</script>

<style>
#errorText {
    color: red;
}
</style>