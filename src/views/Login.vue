<template>
  <Menu/>
  <div class="login">
    <h1>Login page</h1>

      <!-- Login form -->
      <FormLogin id="formLogin" @valueMailChanged="onValueMailChanged" @valuePasswordChanged="onValuePasswordChanged"/>
      <button v-on:click="forgotPassword()">I forgot my password</button>
      <button v-on:click="connectUser()">Send my credentials</button>
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
        this.onError('Please fill in all fields of the form')
        return;
      }
      if(!/\S+@\S+\.\S+/.test(this.mail)){
        this.onError('The mail does not correspond to the right format')
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
          document.cookie = "Token=" + response.data + ";" + expires + ";path=/"
          this.$router.replace({ name: 'Wallet' })
        }
      }).catch((error) => {
        this.onError(error.response.data)
      });
    },
    forgotPassword(){
      if(this.mail === ''){
        this.onError('Please fill in your email')
        return;
      }
      if(!/\S+@\S+\.\S+/.test(this.mail)){
        this.onError('The mail does not correspond to the right format')
        return;
      }
      axios.post(this.uri+"/user/forgotPwd", {
        mail : this.mail
      }).then((response) => {
        if (response.status === 200) {
          this.onSuccess("Email envoyé à : " + this.mail)
        }
      }).catch((error) => {
        this.onError(error.response.data)
      });
    },
    onSuccess(msg){
      this.$toast.success(msg)
      setTimeout(this.$toast.clear, 3000)
    },
    onError(msg){
      this.$toast.error(msg)
    }
  },
  beforeMount() {
    if(toolbox.checkIfConnected()){
      this.$router.replace({ name: 'Wallet' })
    }
  }
}
</script>
