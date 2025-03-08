<template>
    <h1>Login</h1>
    <button @click="func1">output htis</button>
    <div class="center">
        <input type="text" placeholder="Username" v-model="username" class="item input">
        <input type="text" placeholder="Password" v-model="password" class="item input">
        <button class="item logInButton" @click="submitLogin(username, password)">Log In</button>
        <router-link :to="'/register'" class="item regLink">Register new Account</router-link>
        <p class="item errorMessage">{{ errmsg }}</p>
    </div>
</template>

<script>
import { API_AUTH } from '@/api';
import { authData } from '@/auth';
import axios from 'axios';
export default {
    data() {
        return {
            username: '',
            password: '',
            errmsg: '',
        }
    },
    methods: {
        submitLogin(un, pw) {
            const catchallerrmsg = "An unexpeceted error occured. Please try Again.";
            axios.post(`${API_AUTH}login/`, {
                "username": un,
                "password": pw
            }).then((response) => {
                console.log(response);
                if (!response.status) {
                    this.errmsg = catchallerrmsg;
                    return
                }
                const data = response.data;
                this.errmsg = "Login Successful!\n";
                if (data["access"]) {
                    authData.access = data["access"];
                }else{
                    authData.access = "";
                }
                if (data["refresh"]) {
                    authData.refresh = data["refresh"];
                }else{ 
                    authData.refresh = "";
                }
                if (authData.access!=="" && authData.refresh!=="") {
                    authData.loggedIn=true;
                }else{
                    authData.loggedIn=false;
                }

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
    },
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

.errorMessage {
    color: black;
    font-size: large;
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

.logInButton {
    color: white;
    background-color: rgb(27, 177, 0);
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

.logInButton:hover {
    cursor: pointer;
    background-color: rgb(41, 213, 11);
}

.logInButton:active {
    border: solid gray 1px;
    background-color: rgb(18, 120, 0);
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