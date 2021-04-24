<template>
  <!-- Asset creation invitation window -->
  <div id="addAssetContainer" @click="toggleModal()">
    <p>+</p>
    <p>Add a new</p>
    <p>asset</p>
  </div>

  <!-- Asset creation by modal window -->
  <vue-final-modal v-model="showModal" classes="modalContainer" content-class="modalContent">
    <span class="modalTitle">Add a new asset</span>
    <div class="modalContentForm">
      <select v-model="assetName">
        <option v-for="asset in assetList" :key="asset.id">
          {{ asset.label }}
        </option>
      </select>
      <br><br>
      <label for="quantity">Quantity : </label>
      <input id="quantity" v-model="quantity" type="number" name="quantity"
                                                      step="0.000000001"
      >
      <br><br>
      <label for="invested">Amount invested : </label>
      <input id="invested" v-model="invested_amount" type="number" name="invested_amount"
                                                             step="0.001"
      >
    </div>
    <div class="modalAction">
      <button class="button" @click="addAsset()">
        Confirm
      </button>
      <button class="button buttonOther" @click="toggleModal()">
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

#addAssetContainer{
    border: thin solid black;
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    align-items: center;
    font-size: 1.3rem;
    font-weight: bold;
    cursor: pointer;
    height: 15rem;
    width: 25rem;
    max-height: 40vh;
    max-width: 80vw;
    margin: 1rem;
}

::v-deep .modalContainer {
  display: flex;
  justify-content: center;
  align-items: center;
}

::v-deep .modalContent {
  position: relative;
  display: flex;
  flex-direction: column;
  min-height: 70%;
  max-height: 90%;
  min-width: 60%;
  max-width: 90%;
  margin: 0 1rem;
  padding: 1rem;
  border: 1px solid #e2e8f0;
  border-radius: 0.25rem;
  background: #fff;
}

.modalTitle {
  font-size: larger;
  font-weight: bolder;
  margin-bottom: 15%;
  align-self: center;
}

.modalContentForm {
  flex-grow: 1;
  overflow-y: auto;
  display: flex;
  flex-flow: column nowrap;
  align-self: center;
  min-height: 35%;
  max-height: 45%;
  min-width: 30%;
  max-width: 45%;
}

.modalContentForm > input, .modalContentForm > select{
  font-size: 1.1rem;
}

.modalAction {
  display: flex;
  justify-content: space-around;
  align-items: space-around;
  flex-shrink: 0;
  padding: 1rem 0 0;
}

button {
  text-align: center;
	background-color: #42b983;
	border-radius: 30px;
	border: 1px solid #18ab29;
	cursor: pointer;
	color: #fff;
	font-size: 1.2rem;
	padding: 1rem;
	text-decoration:none;
	text-shadow:0px 1px 0px #2f6627;
  min-width : 18vw;
  min-height : 1.5vh;
}

.buttonOther {
  background-color: #364a5e !important;
  border: 1px solid #23313e !important;
  text-shadow:0px 1px 0px #1a242d !important;
}

.buttonOther:hover {
  background-color: #49647e !important;
}

.button:hover {
	background-color:#5cbf92;
}

@media all and (max-width:630px){
  .modalTitle{
    margin-bottom: 40%;
  }
  .modalAction {
    flex-direction: column;
  }
  .button{
    align-self: center;
    width : 70vw;
    margin-top : 1rem;
  }
}

</style>



