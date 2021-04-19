<template>
  <!-- Asset creation invitation window -->
  <div class="addWallet" @click="toggleModal()">
    <p>+</p>
    <p>Add a new</p>
    <p>asset</p>
  </div>

  <!-- Asset creation by modal window -->
  <vue-final-modal v-model="showModal" classes="modal-container" content-class="modal-content">
    <span class="modal__title">Add a new asset</span>
    <div class="modal__content">
      <select v-model="assetName">
        <option v-for="asset in assetList" :key="asset.id">
          {{ asset.label }}
        </option>
      </select>
      <br><br>
      Quantity : <input v-model="quantity" type="number" name="quantity" step="0.000000001"> €
      <br><br>
      Amount invested : <input v-model="invested_amount" type="number" name="invested_amount" step="0.001"> units
    </div>
    <div class="modal__action">
      <button class="vfm-btn" @click="addAsset()">
        Confirm
      </button>
      <button class="vfm-btn" @click="toggleModal()">
        Cancel
      </button>
    </div>
  </vue-final-modal>
</template>

<script>

import axios from "axios";
const toolbox = require("../../Toolbox.js");

export default {
  name: 'AddWalletCard',
  props:  {
      assetList : {
        type : Array,
        default : undefined
      }
    },
    emits : ['sucess', 'error'],
  data(){
    return{
      uri: "http://localhost:3000",
      showModal: false,
      quantity: 0,
      invested_amount: 0,
      assetName: ""
    }
  },
  methods:{
    addAsset(){
      if (this.quantity === '' || this.invested_amount === '' || isNaN(this.invested_amount)) {
        this.$emit("error", 'Please fill in all fields of the form')
        return;
      }
      if (isNaN(this.quantity) || isNaN(this.invested_amount) || this.quantity < 0 || this.invested_amount < 0) {
        this.$emit("error", 'The amount and/or the quantity is invalid')
        return;
      }
      let assetId = -1;
      this.assetList.forEach(el => {
        if(el.label === this.assetName){
          assetId = el.id;
        }
      })
      axios.post(this.uri+"/assets/add", {
        quantity: this.quantity,
        invested_amount: this.invested_amount,
        asset_id: assetId,
        wallet_id: this.$router.currentRoute._rawValue.params.id
      }, {
        headers : {token : toolbox.readCookie("Token")}
      }).then((response) => {
        if (response.status === 201) {
          this.$emit('sucess', response.data, true)
          this.toggleModal()
        }
      }).catch((error) => {
        this.$emit("error", error.response.data)
      });
    },
    toggleModal(){
      this.showModal = !this.showModal
    }
  }
}
</script>

<style scoped>

.addWallet{
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



