<template>
  <div>
    <div class="assetCardContainer">
      <div class="infoButton" @click="toggleModal()">
        (?)
      </div>
      <p>{{ asset.label }} <i><small>{{ asset.ticker }}</small></i> </p>
      <p v-if="!isEditingQty" @click="toggleEditigingQty()">
        Quantity : {{ asset.quantity }} units
      </p>

      <!-- Change the quantity of a specific asset form -->
      <div v-else class="changeContainer">
        <input type="text" :placeholder="asset.quantity" :value="asset.quantity">
        <span class="acceptLogo" @click="sendNewValueQty($event)">(V)</span>
        <span class="abortLogo" @click="toggleEditigingQty()">(X)</span>
      </div>
      <p v-if="!isEditingInvest" @click="toggleEditigingInvest()">
        Amount invested : {{ asset.invested_amount }} €
      </p>

      <!-- Change the initial investment of a specific asset form -->
      <div v-else class="changeContainer">
        <input type="text" :placeholder="asset.invested_amount" :value="asset.invested_amount">
        <span class="acceptLogo" @click="sendNewValueInvest($event)">(V)</span>
        <span class="abortLogo" @click="toggleEditigingInvest()">(X)</span>
      </div>
      <p v-if="type=='Crypto-assets'">
        Current value : {{ (asset.quantity * apiData.price).toFixed(2) }} €
      </p>
    </div>

    <!-- Details of a specific asset -->
    <vue-final-modal v-model="showModal" classes="modalContainer" content-class="modalContent">
      <span class="modalTitle">Deeper information</span>
      <div class="modalContentForm">
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
      <div class="modalAction">
        <button class="button buttonOther" @click="deleteAsset()">
          Delete asset
        </button>
        <button class="button" @click="toggleModal()">
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
            if(newValue <= 0 || isNaN(newValue)){
                this.$emit("error", "The quantity is invalid")
            }
            axios.post(this.uri+"/assets/changeQty", {
                wallet_id : wallet_id,
                quantity : newValue,
                id : id
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
                id : id
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

.assetCardContainer{
    border: thin solid black;
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    align-items: center;
    font-size: 1rem;
    cursor: pointer;
    min-height: 15rem;
    min-width: 25rem;
    max-height: 40vh;
    max-width: 80vw;
    margin: 1rem;
    overflow: hidden;
}

.infoButton{
    align-self: flex-end;
    margin-right: 5%;
    color: black;
    font-size: larger;
}

.infoButton:hover{
    color: green;
}

.changeContainer{
    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
    align-items: center;
    height: 25%;
}

.changeContainer > input {
    height: 1.2rem;
}

@media all and (max-width:630px){
    .assetCardContainer{
        min-height: inherit;
        min-width: inherit;
        height: 15rem;
        width: 25rem;
    }
}


/*///////////*/

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



