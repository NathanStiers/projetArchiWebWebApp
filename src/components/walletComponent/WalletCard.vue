<template>
  <div class="walletCardContainer" @click="fetchAssets($event)">
    <div class="deleteButton" @click="deleteWallet()">
      X
    </div>
    <p>Wallet {{ index+1 }}</p>
    <p v-if="!isEditing" @click="toggleEditiging()">
      {{ wallet.label }}
    </p>

    <!-- Change the name of a the current wallet form -->
    <div v-else class="renameContainer">
      <input type="text" :placeholder="wallet.label" :value="wallet.label">
      <span class="acceptLogo" @click="sendNewLabel($event)">V</span>
      <span class="abortLogo" @click="toggleEditiging()">X</span>
    </div>
    <p>Type : {{ wallet.type }}</p>
  </div>
</template>

<script>

import axios from "axios";
const toolbox = require("../../Toolbox.js");

export default {
    name: 'WalletCard',
    props: {
      wallet : {
        type : Object,
        default : undefined
      },
      index : {
        type : Number,
        default : undefined
      }
    },
    emits : ['sucess', 'error'],
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
                    this.$emit("sucess", response.data, true)
                }
            }).catch((error) => {
                this.$emit("error", error.response.data)
            });
        },
        fetchAssets(event){
            if (event.target.className.indexOf("walletCardContainer") !== -1){
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

.walletCardContainer{
    border: thin solid black;
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    align-items: center;
    font-size: 1.2rem;
    cursor: pointer;
    min-height: 15rem;
    min-width: 25rem;
    max-height: 40vh;
    max-width: 80vw;
    margin: 1rem;
    overflow: hidden;
}

.deleteButton{
    align-self: flex-end;
    margin-right: 5%;
    color: black;
    font-size: larger;
}

.deleteButton:hover{
    color: red;
}

.renameContainer{
    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
    align-items: center;
    height: 25%;
}

.renameContainer > input {
    height: 1.2rem;
}

@media all and (max-width:630px){
    .walletCardContainer{
        min-height: inherit;
        min-width: inherit;
        height: 15rem;
        width: 25rem;
    }
}

</style>



