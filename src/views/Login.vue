<template>
  <Menu />
  <div id="loginContainer">
    <!-- Login form -->
    <FormLogin id="formLoginComponent" @valueMailChanged="onValueMailChanged" @valuePasswordChanged="onValuePasswordChanged" />
    <div id="forgotAndConnect">
      <button class="button buttonOther" @click="forgotPassword()">
        Reset password
      </button>
      <button class="button" @click="connectUser()">
        Connect
      </button>
    </div>
  </div>
</template>

<script>

import axios from "axios";
import FormLogin from '@/components/loginComponent/FormLogin.vue'
import Menu from '@/components/menu/HeaderRestrict.vue'

const toolbox = require("../Toolbox.js");

export default {
  name: 'Login',
  components: {
    FormLogin,
    Menu
  },
  data() {
    return{
      mail: "",
      password: "",
      uri: "http://localhost:3000"
    }
  },
  beforeMount() {
    if(toolbox.checkIfConnected()){
      this.$router.replace({ name: 'Wallet' })
    }
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
          this.onSuccess("Email sent to : " + this.mail)
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
  }
}
</script>

<style scoped>

#loginContainer {
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: center;
  margin-right: auto;
  margin-left: auto;
  width: 60rem;
  max-width: 80vw;
}

#formLoginComponent{
  width: 60rem;
  max-width: 80vw;
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: center;
}

#forgotAndConnect {
  width: 60rem;
  max-width: 80vw;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-around;
  margin-top: 7.5vh;
}

@media all and (max-width:630px){
  #forgotAndConnect{
    flex-flow: column-reverse nowrap;
  }
}

</style>