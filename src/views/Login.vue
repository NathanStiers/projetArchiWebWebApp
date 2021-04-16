<template>
  <Menu/>
  <div class="login">
    <h1>Login page</h1>
      <FormLogin id="formLogin" @valueMailChanged="onValueMailChanged" @valuePasswordChanged="onValuePasswordChanged"/>
      <button v-on:click="forgotPassword()">J'ai oublié mon mdp</button>
      <button v-on:click="connectUser()">Envoyer les infos</button>
  </div>
</template>

<script>

import axios from "axios";
import FormLogin from '@/components/loginComponent/FormLogin.vue'
import Menu from '@/components/menu/HeaderRestrict.vue'

const toolbox = require("../Toolbox.js");

export default {
  name: 'Login',
  data() {
    return{
      mail: "",
      password: "",
      uri: "http://localhost:3000"
    }
  },
  components: {
    FormLogin,
    Menu
  },
  methods: {
    onValueMailChanged(newValue) {
      this.mail = newValue;
    },
    onValuePasswordChanged(newValue) {
      this.password = newValue;
    },
    connectUser() {
      if(this.mail === '' || this.password === ''){
        alert('Please fill in all fields of the form')
        return;
      }
      if(!/\S+@\S+\.\S+/.test(this.mail)){
        alert('The mail does not correspond to the right format')
        return;
      }
      axios.post(this.uri+"/user/connect", {
        mail : this.mail,
        password : this.password
      }).then((response) => {
        if (response.status === 200) {
        let d = new Date();
        d.setTime(d.getTime() + 6 * 60 * 60 * 1000);
        let expires = "expires=" + d.toUTCString();
        let data_user = response.data;
        document.cookie = "Token=" + data_user.token + ";" + expires + ";path=/"
        this.$router.push({ name: 'Wallet' })
        }else{
          alert(response.data)
        }
      }).catch((error) => {
        alert(error.response.data)
      });
    },
    forgotPassword(){
      if(this.mail === ''){
        alert('Please fill in your email')
        return;
      }
      if(!/\S+@\S+\.\S+/.test(this.mail)){
        alert('The mail does not correspond to the right format')
        return;
      }
      axios.post(this.uri+"/user/forgotPwd", {
        mail : this.mail
      }).then((response) => {
        if (response.status === 200) {
          alert("Email envoyé à : " + this.mail)
        }else{
          alert(response.data)
        }
      }).catch((error) => {
        alert(error.response.data)
      });
    }
  },
  beforeMount() {
    if(toolbox.checkIfConnected()){
      this.$router.push({ name: 'Wallet' })
    }
  }
}
</script>
