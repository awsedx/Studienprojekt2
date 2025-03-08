<template>
    <h1>Item Catalog</h1>
    <button @click="fetchData">fetch data</button>
    <p id="errorText"></p>
    <div class="catalogDiv">
        <CatalogItem v-if="fetchComplete" v-for="item in items" :title="item.title" :description="item.description"
            :slug="item.slug" :price="item.price" :product-id="item.id" />
        <p v-else>Click the Button to Fetch Data</p>
    </div>
</template>

<script>
import { API_ADRESS } from "@/api.js";
import CatalogItem from "@/components/CatalogItem.vue";
import axios from 'axios';
export default {
    components: {
        CatalogItem: CatalogItem,
    },
    data() {
        return {
            fetchComplete: false,
            items: [],
        }
    },
    methods: {
        fetchData() {
            axios.get(API_ADRESS + "products/").then((response) => {
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
                            id: item.id,
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

.catalogDiv {
    display: flex;
    flex-direction: row;
    justify-content: left;
    flex-wrap: wrap;
    width: 100%;
}
</style>