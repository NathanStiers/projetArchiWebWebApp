<template>
    <div class="walletCard" v-on:click="$router.push({ name: 'Asset', params:{id:wallet.id} })">
        <div class="deleteCard" v-on:click="deleteWallet()">X</div>
        <p>Portefeuille {{index+1}}</p>
        <p>{{wallet.label}}</p>
        <p>Type : {{wallet.type}}</p>
    </div>
</template>

<script>

import axios from "axios";
const toolbox = require("../../Toolbox.js");

export default {
    name: 'WalletCard',
    props: ['wallet', 'index'],
    data(){
        return{
            uri: "http://localhost:3000"
        }
    },
    methods:{
        deleteWallet(){
            axios
                .post(this.uri+"/wallets/delete", {
                    id : this.wallet.id
                }, {
                    headers : {token : toolbox.readCookie("Token")}
                })
                .then((response) => {
                if (response.status === 200) {
                    this.$router.replace({ name: 'Home' })
                }else{
                    alert("Erreur inconnue")
                }
                })
                .catch((error) => {
                if(error.response.status === 401 || error.response.status === 403){
                    alert(error.response.data)
                }
            });
        }
    }
    
}
</script>

<style scoped>

.walletCard{
    border: thin solid black;
    min-height: 15.5rem;
    min-width: 60vmin;
    max-height: 15.5rem;
    max-width: 70vmin;
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    align-items: center;
    font-size: large;
    margin-bottom: 10%;
    cursor: pointer;
}

.deleteCard{
    align-self: flex-end;
    margin-right: 5%;
    color: black;
    cursor: url("../../assets/danger-cursor.png"), auto;
    font-size: larger;
}

.deleteCard:hover{
    color: red;
}

</style>



