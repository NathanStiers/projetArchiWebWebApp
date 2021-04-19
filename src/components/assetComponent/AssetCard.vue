<template>
  <div>
    <div class="assetCard">
      <div class="infoCard" @click="toggleModal()">
        (?)
      </div>
      <p>{{ asset.label }} <i><small>{{ asset.ticker }}</small></i> </p>
      <p v-if="!isEditingQty" @click="toggleEditigingQty()">
        Quantity : {{ asset.quantity }} units
      </p>

      <!-- Change the quantity of a specific asset form -->
      <div v-else>
        Quantity : <input type="text" :placeholder="asset.quantity" :value="asset.quantity">
        <span @click="sendNewValueQty($event)">(V)</span>
        <span @click="toggleEditigingQty()">(X)</span>
      </div>
      <p v-if="!isEditingInvest" @click="toggleEditigingInvest()">
        Amount invested : {{ asset.invested_amount }} €
      </p>

      <!-- Change the initial investment of a specific asset form -->
      <div v-else>
        Amount invested : <input type="text" :placeholder="asset.invested_amount" :value="asset.invested_amount">
        <span @click="sendNewValueInvest($event)">(V)</span>
        <span @click="toggleEditigingInvest()">(X)</span>
      </div>
      <p v-if="type=='Crypto-assets'">
        Current value : {{ (asset.quantity * apiData.price).toFixed(2) }} €
      </p>
    </div>

    <!-- Details of a specific asset -->
    <vue-final-modal v-model="showModal" classes="modal-container" content-class="modal-content">
      <span class="modal__title">Deeper information</span>
      <div class="modal__content">
        <p>Unit cost price : {{ (asset.invested_amount/asset.quantity).toFixed(2) }} €</p>
        <p v-if="type=='Crypto-assets'">
          Current value : {{ (asset.quantity * apiData.price).toFixed(2) }} €
        </p>
        <p v-if="type==='Crypto-assets'">
          Max supply : {{ apiData.max_supply }} unités
        </p>
        <p v-if="type==='Crypto-assets'">
          Total supply : {{ apiData.total_supply }} unités
        </p>
        <p v-if="type==='Crypto-assets'">
          Market cap : {{ (apiData.market_cap).toFixed(2) }} €
        </p>
      </div>
      <div class="modal__action">
        <button class="vfm-btn" @click="deleteAsset()">
          Delete asset
        </button>
        <button class="vfm-btn" @click="toggleModal()">
          Close window
        </button>
      </div>
    </vue-final-modal>
  </div>
</template>

<script>

import axios from "axios";

const toolbox = require("../../Toolbox.js");

export default {
    name: 'AssetCard',
    props: {
      asset : {
        type : Object,
        default : undefined
      },
      apiData : {
        type : Object,
        default : undefined
      },
      type : {
        type : String,
        default : undefined
      }
    },
    emits : ['sucess', 'error'],
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
        sendNewValueQty(event){
            this.isEditingQty = !this.isEditingQty
            let wallet_id = this.$router.currentRoute._rawValue.params.id
            let newValue = event.target.parentNode.children[0].value
            let id = this.$props.asset.id
            console.log(newValue)
            console.log(wallet_id)
            console.log(id)
            if(newValue <= 0 || isNaN(newValue)){
                this.$emit("error", "The quantity is invalid")
            }
            axios.post(this.uri+"/assets/changeQty", {
                wallet_id : wallet_id,
                quantity : newValue,
                aw_id : id
            }, {
                headers: {token : toolbox.readCookie("Token")}
            }).then((response) => {
                if (response.status === 200) {
                    this.$props.asset.quantity = newValue
                    this.$emit("sucess", response.data, false)
                }
            }).catch((error) => {
                this.$emit("error", error.response.data)
            });
        },
        sendNewValueInvest(event){
            this.isEditingInvest = !this.isEditingInvest
            let wallet_id = this.$router.currentRoute._rawValue.params.id
            let newValue = event.target.parentNode.children[0].value
            let id = this.$props.asset.id
            if(newValue <= 0 || isNaN(newValue)){
                this.$emit("error", "The amount is invalid")
            }
            axios.post(this.uri+"/assets/changeInvestment", {
                wallet_id : wallet_id,
                invested_amount : newValue,
                aw_id : id
            }, {
                headers: {token : toolbox.readCookie("Token")}
            }).then((response) => {
                if (response.status === 200) {
                    this.$props.asset.invested_amount = newValue
                    this.$emit("sucess", response.data, false)
                }
            }).catch((error) => {
                this.$emit("error", error.response.data)
            });
        },
        toggleModal(){
            this.showModal = !this.showModal
        },
        deleteAsset(){
            if(!confirm("Are you sure you want to delete the "+this.$props.asset.label+" asset ?")){
                return;
            }
            axios.post(this.uri+"/assets/remove", {
                wallet_id : this.$props.asset.id_wallet,
                id : this.$props.asset.id
            }, {
                headers: {token : toolbox.readCookie("Token")}
            }).then((response) => {
                if (response.status === 200) {
                    this.$emit("sucess", response.data, true)
                    this.toggleModal()
                }
            }).catch((error) => {
                this.$emit("error", error.response.data)
            });
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



