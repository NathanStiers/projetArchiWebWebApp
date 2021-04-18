<template>
    <div class="walletCard" v-on:click="fetchAssets($event)">
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
            if(!confirm("Are you sure you want to delete the "+this.wallet.label+" wallet and all its contents?")){
                return;
            }
            axios.post(this.uri+"/wallets/delete", {
                wallet_id : this.wallet.id
            }, {
                headers : {token : toolbox.readCookie("Token")}
            }).then((response) => {
                if (response.status === 200) {
                    this.$emit('deleted')
                }else{
                    alert(response.data)
                }
            }).catch((error) => {
                alert(error.response.data)
            });
        },
        fetchAssets(event){
            if (event.target.className !== "deleteCard"){
                this.$router.push({ name: 'Asset', params:{id:this.wallet.id} })
            }
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



