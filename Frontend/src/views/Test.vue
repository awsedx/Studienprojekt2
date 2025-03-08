<template>
    <button @click="func1">click me</button>
    <button @click="func2">show global thingy</button>
    <button @click="func3">increment</button>
</template>
<script>
import { API_ADRESS } from '@/api';
import { authData } from '@/auth';
import axios from 'axios';
export default {
    methods:{
        func1(){
            axios.get(`${API_ADRESS}cart/`)
        },
    }
}
</script>