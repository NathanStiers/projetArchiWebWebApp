<template>
  <!-- Wallet creation invitation window -->
  <div id="addWalletContainer" @click="toggleModal()">
    <p>+</p>
    <p>Add a new</p>
    <p>wallet</p>
  </div>
    
  <!-- Wallet creation by modal window -->
  <vue-final-modal v-model="showModal" classes="modalContainer" content-class="modalContent">
    <span class="modalTitle">Add a new wallet</span>
    <div class="modalContentForm">
      <label for="label">Label : </label><input id="label" v-model="label" type="text" maxlength="50">
      <br><br>
      <label for="type">Type :</label><select id="type" v-model="type">
        <option v-for="typeItem in types" :key="typeItem.id" :type="typeItem">
          {{ typeItem }}
        </option>
      </select>
    </div>
    <div class="modalAction">
      <button class="button" @click="createWallet()">
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
    props: {
      types : {
        type : Array,
        default : undefined
      }
    },
    emits : ['sucess', 'error'],
    data(){
        return{
            uri: "http://localhost:3000",
            showModal: false,
            label: "",
            type: ""
        }
    },
    methods:{
        createWallet(){
          if(this.label === "" || this.type === ""){
            this.$emit('error', 'Please fill in all fields of the form')
            return;
          }
          axios.post(this.uri+"/wallets/create", {
            label: this.label,
            type: this.type
          }, {
            headers : {token : toolbox.readCookie("Token")}
          }).then((response) => {
            if (response.status === 201) {
              this.$emit('sucess', response.data, true)
              this.toggleModal()
            }
          }).catch((error) => {
            this.$emit('error', error.response.data)
          });
        },
        toggleModal(){
          this.showModal = !this.showModal
        }
    }
}
</script>

<style scoped>

#addWalletContainer{
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



