<template>
    <h1>Register</h1>
    <div class="center">
        <input type="text" placeholder="Username" v-model="username" class="item input">
        <input type="text" placeholder="Password" v-model="password" class="item input">
        <input type="text" placeholder="Email@Adress.com" v-model="email" class="item input">
        <button class="item regButton" @click="submitRegister(username, password, email)">Register</button>
        <router-link :to="'/login'" class="item regLink">Log into existing Account</router-link>
        <p class="item message">{{ errmsg }}</p>
    </div>
</template>

<script>
import { API_AUTH } from '@/api';
import axios from 'axios';
export default {
    data() {
        return {
            username: '',
            password: '',
            email: '',
            errmsg: "",
        }
    },
    methods: {
        submitRegister(un, pw, email) {
            if (!(un && pw && email)) {
                this.errmsg = "Incomplete Inputs.";
                return
            }
            const catchallerrmsg = "An unexpeceted error occured, please try Again.";
            axios.post(`${API_AUTH}register/`, {
                "username": un,
                "password": pw,
                "email": email
            }).then((response) => {
                this.errmsg = "Account successfully created! Click above to login now!";
                console.log(response);
                alert("Account successfully created!");
                this.$router.push("/login");
            }).catch((error) => {
                try {
                    for (const property in error.response.data) {
                        for (const element of error.response.data[property]) {
                            this.errmsg += element;
                            this.errmsg += "\n";
                        }
                    }
                } catch (error2) {
                    this.errmsg = catchallerrmsg;
                }
                console.log(error);
            });
        }

    }
}
</script>

<style>
.center {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
}

.message {
    color: black;
    font-size: large;
    white-space: pre-wrap;
}

.item {
    margin-bottom: 0.5rem;
}

.input {
    width: 20%;
    font-size: large;
    border-radius: 10px;
    height: 5%;
    padding: 0.5%;
}

.regButton {
    color: white;
    background-color: rgb(53, 0, 151);
    border-radius: 10px;
    height: fit-content;
    margin: 5px;
    margin-right: 10px;
    font-size: medium;
    border: solid white 1px;
    padding: 5px;
    text-decoration: none;
    font-size: large;
    width: 10%;
}

.regButton:hover {
    cursor: pointer;
    background-color: rgb(98, 23, 236);
}

.regButton:active {
    border: solid gray 1px;
    background-color: rgb(50, 2, 139);
}

.regLink {
    text-decoration: none;
    margin-top: 1rem;
    /* font-style: italic; */
    color: blue;
    font-size: large;
}

.regLink:hover {
    text-decoration: underline;
    color: rgb(59, 59, 248);
}
</style>