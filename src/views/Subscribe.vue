<template>
  <Menu />
  <div id="subscribeContainer">
    <!-- Create a new account form -->
    <FormSubscribe id="formSubscribeComponent" @valueNameChanged="onValueNameChanged" @valueSurnameChanged="onValueSurnameChanged" @valueMailChanged="onValueMailChanged" @valuePasswordChanged="onValuePasswordChanged"
                   @valuePasswordConfirmChanged="onValuePasswordConfirmChanged"
    />
    <button id="createButton" class="button" @click="createUser()">
      Create my account
    </button>
  </div>
</template>

<script>

const toolbox = require("../Toolbox.js");
import axios from "axios";
import Menu from '@/components/menu/HeaderRestrict.vue'
import FormSubscribe from '@/components/subscribeComponent/FormSubscribe.vue'

export default {
  name: 'Subscribe',
  components:{
    Menu,
    FormSubscribe
  },
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
  beforeMount() {
    if(toolbox.checkIfConnected()){
      this.$router.replace({ name: 'Wallet' })
    }
  },
  methods: {
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
      if(this.mail === ''){
        this.onError('Please fill in all fields of the form')
        return;
      }
      if(!/\S+@\S+\.\S+/.test(this.mail)){
        this.onError('The mail does not correspond to the right format')
        return;
      }
      if(this.password !== this.confirmPassword){
        this.onError("Passwords do not match")
        return;
      }
      axios.post(this.uri+"/user/create", {
        name : this.name,
        surname : this.surname,
        mail : this.mail,
        password : this.password
      }).then((response) => {
        if (response.status === 201) {
          let d = new Date();
          d.setTime(d.getTime() + 6 * 60 * 60 * 1000);
          let expires = "expires=" + d.toUTCString();
          let data_user = response.data;
          document.cookie = "Token=" + data_user + ";" + expires + ";path=/"
          this.$router.replace({ name: 'Wallet' })
          this.onSuccess("Account created")
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

#subscribeContainer {
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: center;
  margin-right: auto;
  margin-left: auto;
  width: 60rem;
  max-width: 80vw;
}

#formSubscribeComponent{
  width: 60rem;
  max-width: 80vw;
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: center;
}

#createButton{
  margin-top: 7.5vh;
}

</style>