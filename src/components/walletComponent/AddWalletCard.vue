<template>
    <div class="addWallet" v-on:click="toggleModal()">
        <p>+</p>
        <p>Ajouter un nouveau</p>
        <p>portefeuille</p>
    </div>
    <vue-final-modal v-model="showModal" classes="modal-container" content-class="modal-content">
      <span class="modal__title">Create a new wallet</span>
      <div class="modal__content">
        Label : <input v-model="label" type="text" name="" id="" maxlength="50">
        <br/><br/>
        Type : <select v-model="type" name="" id="">
            <option v-for="type in types" v-bind:key="type.id" v-bind:type="type" >{{type}}</option>
        </select>
      </div>
      <div class="modal__action">
        <button class="vfm-btn" v-on:click="createWallet()">confirm</button>
        <button class="vfm-btn" v-on:click="toggleModal()">cancel</button>
      </div>
    </vue-final-modal>
</template>

<script>

import axios from "axios";
const toolbox = require("../../Toolbox.js");

export default {
    name: 'AddWalletCard',
    props: ['types'],
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



