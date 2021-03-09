<template>
  <Menu/>
  <div class="subscribe">
    <h1>Subscribe page</h1>
      <FormSubscribe @valueNameChanged="onValueNameChanged" @valueSurnameChanged="onValueSurnameChanged" @valueMailChanged="onValueMailChanged" @valuePasswordChanged="onValuePasswordChanged" @valuePasswordConfirmChanged="onValuePasswordConfirmChanged"/>
      <button v-on:click="createUser()">Envoyer les infos</button>
  </div>
</template>

<script>

const toolbox = require("../Toolbox.js");
import axios from "axios";
import Menu from '@/components/menu/HeaderRestrict.vue'
import FormSubscribe from '@/components/subscribeComponent/FormSubscribe.vue'

export default {
  name: 'Subscribe',
  data() {
    return{
      name: "",
      surname: "",
      mail: "",
      password: "",
      confirmPassword: "",
      uri: "http://localhost:3000"
    }
  },
  components:{
    Menu,
    FormSubscribe
  },methods: {
    onValueNameChanged(newValue) {
      this.name = newValue;
    },
    onValueSurnameChanged(newValue) {
      this.surname = newValue;
    },
    onValueMailChanged(newValue) {
      this.mail = newValue;
    },
    onValuePasswordChanged(newValue) {
      this.password = newValue;
    },
    onValuePasswordConfirmChanged(newValue) {
      this.confirmPassword = newValue;
    },
    createUser() {
      if(this.password !== this.confirmPassword){
        alert("Les deux mots de passe ne correspondent pas")
        return;
      }
      axios
        .post(this.uri+"/user/create", {
          name : this.name,
          surname : this.surname,
          mail : this.mail,
          password : this.password
        })
        .then((response) => {
          if (response.status === 201) {
            let d = new Date();
            d.setTime(d.getTime() + 6 * 60 * 60 * 1000);
            let expires = "expires=" + d.toUTCString();
            let data_user = response.data;
            document.cookie = "Token=" + data_user.token + ";" + expires + ";path=/"
            this.$router.push({ name: 'Wallet' })
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
  },
  beforeMount() {
    if(toolbox.checkIfConnected()){
      this.$router.push({ name: 'Wallet' })
    }
  }
}
</script>
