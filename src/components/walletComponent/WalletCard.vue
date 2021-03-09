<template>
    <div class="walletCard">
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
            console.log("deleted wallet " + this.wallet.id)
            axios
                .post(this.uri+"/wallets/delete", {
                    id : this.wallet.id
                }, {
                    headers : {token : toolbox.readCookie("Token")}
                })
                .then((response) => {
                if (response.status === 200) {
                    this.$router.replace({ name: 'Wallet' })
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
    min-height: 30vmin;
    min-width: 60vmin;
    max-height: 60vmin;
    max-width: 70vmin;
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    align-items: center;
    font-size: large;
}

.deleteCard{
    align-self: flex-end;
    margin-right: 5%;
    color: red;
    cursor: pointer;
    font-size: larger;
}

</style>



