<template>
    <button @click="func1">click me</button>
    <button @click="func2">show global thingy</button>
    <button @click="func3">increment</button>
</template>
<script>
import { authData } from '@/auth';
export default {
    methods:{
        func1(){
            console.log(`
            gLoggedIn: ${this.gLoggedIn}
            gAccess: ${this.gAccess}
            gRefresh: ${this.gRefresh}
            `)
        },
    }
}
</script>