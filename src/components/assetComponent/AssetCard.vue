<template>
    <div>
        <div class="assetCard">
        <div class="infoCard" v-on:click="toggleModal()">(?)</div>
        <p>{{asset.label}} <i><small>{{asset.ticker}}</small></i> </p>
        <p v-if="!isEditingQty" v-on:click="toggleEditigingQty()">Quantité : {{asset.quantity}} unités</p>
        <div v-else>
            Quantité : <input type="text" v-bind:placeholder="asset.quantity" v-bind:value="asset.quantity" />
            <span v-on:click="sendNewValueQty($event)">(V)</span>
            <span v-on:click="toggleEditigingQty()">(X)</span>
        </div>
        <p v-if="!isEditingInvest" v-on:click="toggleEditigingInvest()">Montant investit : {{asset.invested_amount}} €</p>
        <div v-else>
            Montant investit : <input type="text" v-bind:placeholder="asset.invested_amount" v-bind:value="asset.invested_amount" />
            <span v-on:click="sendNewValueInvest($event)">(V)</span>
            <span v-on:click="toggleEditigingInvest()">(X)</span>
        </div>
        <p v-if="apiData.type=='Crypto-actifs'">Valeur actuelle : {{(asset.quantity * apiData.price).toFixed(2)}} €</p>
    </div>
        <vue-final-modal
        v-model="showModal"
        classes="modal-container"
        content-class="modal-content">
        <span class="modal__title">Deeper information</span>
        <div class="modal__content">
            <p>PRU : {{asset.invested_amount/asset.quantity}} €</p>
            <p v-if="apiData.type=='Crypto-actifs'">Max_supply : {{apiData.max_supply}} unités</p>
            <p v-if="apiData.type=='Crypto-actifs'">Total_supply : {{apiData.total_supply}} unités</p>
            <p v-if="apiData.type=='Crypto-actifs'">Market_cap : {{apiData.market_cap}} €</p>
        </div>
        <div class="modal__action">
            <button class="vfm-btn" v-on:click="deleteAsset()">Delete asset ?</button>
            <button class="vfm-btn" v-on:click="toggleModal()">Close window</button>
        </div>
        </vue-final-modal>
    </div>
</template>

<script>

import axios from "axios";

const toolbox = require("../../Toolbox.js");

export default {
    name: 'AssetCard',
    props: ['asset', 'apiData'],
    data(){
        return{
            uri: "http://localhost:3000",
            isEditingQty: false,
            isEditingInvest: false,
            showModal: false
        }
    },
    methods: {
        toggleEditigingQty(){
            this.isEditingInvest = false
            this.isEditingQty = !this.isEditingQty
        },
        toggleEditigingInvest(){
            this.isEditingQty = false
            this.isEditingInvest = !this.isEditingInvest
        },
        sendNewValueQty($event){
            this.isEditingQty = !this.isEditingQty
            let wallet_id = this.$router.currentRoute._rawValue.params.id
            let newValue = $event.target.parentNode.children[0].value
            let id = this.$props.asset.id
           axios
                .post(this.uri+"/assets/changeQty", {
                    wallet_id : wallet_id,
                    quantity : newValue,
                    aw_id : id
                }, {
                    headers: {token : toolbox.readCookie("Token")}
                })
                .then((response) => {
                    if (response.status === 200) {
                        this.$props.asset.quantity = newValue
                        alert("Le montant est mis à jour")
                    }else{
                        alert("Erreur dans l'envoi du formulaire")
                    }
                })
                .catch((error) => {
                    if(error.response.status === 401 || error.response.status === 403){
                        alert(error.response.data)
                    }
                });
        },
        sendNewValueInvest($event){
            this.isEditingInvest = !this.isEditingInvest
            let wallet_id = this.$router.currentRoute._rawValue.params.id
            let newValue = $event.target.parentNode.children[0].value
            let id = this.$props.asset.id
           axios
                .post(this.uri+"/assets/changeInvestment", {
                    wallet_id : wallet_id,
                    invested_amount : newValue,
                    aw_id : id
                }, {
                    headers: {token : toolbox.readCookie("Token")}
                })
                .then((response) => {
                    if (response.status === 200) {
                        this.$props.asset.invested_amount = newValue
                        alert("Le montant est mis à jour")
                    }else{
                        alert("Erreur dans l'envoi du formulaire")
                    }
                })
                .catch((error) => {
                    if(error.response.status === 401 || error.response.status === 403){
                        alert(error.response.data)
                    }
                });
        },
        toggleModal(){
            this.showModal = !this.showModal
        },
        deleteAsset(){
            console.log("BOUM")
        }
    }
}
</script>

<style scoped>

.assetCard{
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
    margin-bottom: 10%;
}

.infoCard{
    align-self: flex-end;
    margin-right: 2%;
    margin-top: 1%;
    cursor: pointer;
}


::v-deep .modal-container {
  display: flex;
  justify-content: center;
  align-items: center;
}
::v-deep .modal-content {
  position: relative;
  display: flex;
  flex-direction: column;
  min-height: 50%;
  max-height: 90%;
  min-width: 33%;
  max-width: 90%;
  margin: 0 1rem;
  padding: 1rem;
  border: 1px solid #e2e8f0;
  border-radius: 0.25rem;
  background: #fff;
}
.modal__title {
  font-size: larger;
  font-weight: bolder;
  margin-bottom: 10%;
}
.modal__content {
  flex-grow: 1;
  overflow-y: auto;
  display: flex;
  flex-flow: column nowrap;
}
.modal__action {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  padding: 1rem 0 0;
}
.modal__close {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
}

</style>


