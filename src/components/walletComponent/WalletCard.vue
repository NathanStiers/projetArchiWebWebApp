<template>
    <div class="walletCard" v-on:click="fetchAssets($event)">
        <div class="deleteCard" v-on:click="deleteWallet()">X</div>
        <p>Wallet {{index+1}}</p>
        <p v-if="!isEditing" v-on:click="toggleEditiging()" class="renameCard">{{wallet.label}}</p>

        <!-- Change the name of a the current wallet form -->
        <div v-else class="renameCard">
            <input type="text" v-bind:placeholder="wallet.label" v-bind:value="wallet.label" class="renameCard"/>
            <span v-on:click="sendNewLabel($event)" class="renameCard">(V)</span>
            <span v-on:click="toggleEditiging()" class="renameCard">(X)</span>
        </div>
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
            uri: "http://localhost:3000",
            isEditing: false,
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
                    this.$emit('sucess', response.data, true)
                }
            }).catch((error) => {
                this.$emit('error', error.response.data)
            });
        },
        sendNewLabel(event){
            this.isEditing = !this.isEditing
            let wallet_id = this.$props.wallet.id
            console.log(event.target.parentNode.children)
            let newValue = event.target.parentNode.children[0].value
            if(newValue === ""){
                this.$emit("error", "The label is invalid")
                return;
            }
            axios.post(this.uri+"/wallets/rename", {
                wallet_id : wallet_id,
                label : newValue,
            }, {
                headers: {token : toolbox.readCookie("Token")}
            }).then((response) => {
                if (response.status === 200) {
                    this.$props.wallet.label = newValue
                    this.$emit("sucess", response.data, false)
                }
            }).catch((error) => {
                this.$emit("error", error.response.data)
            });
        },
        fetchAssets(event){
            if (event.target.className !== "deleteCard" && event.target.className !== "renameCard"){
                this.$router.push({ name: 'Asset', params:{id:this.wallet.id} })
            }
        },
        toggleEditiging(){
            this.isEditing = !this.isEditing
        },
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



