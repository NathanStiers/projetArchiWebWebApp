<template>
  <Menu/>
  <div class="premium">
    <h1>Premium page</h1>
      <ExplanationPremium/>
      <button v-on:click="upgradeUser()">Devenir Premium</button>
  </div>
</template>

<script>

const toolbox = require("../Toolbox.js");
import axios from "axios";
import Menu from '@/components/menu/Header.vue'
import ExplanationPremium from '@/components/premiumComponent/ExplanationPremium.vue'

export default {
  name: 'Premium',
  data() {
    return{
      uri: "http://localhost:3000"
    }
  },
  components:{
    Menu,
    ExplanationPremium
  },
  methods:{
    upgradeUser() {
      axios
        .post(this.uri+"/user/premium", {}, {
          headers: {token : toolbox.readCookie("Token")}
        })
        .then((response) => {
          if (response.status === 200) {
            alert("Félicitation, vous possédez maintenant un compte premium")
          }else{
            alert("Erreur dans l'envoi du formulaire")
          }
        })
        .catch((error) => {
          if(error.response.status === 401 || error.response.status === 403){
            alert(error.response.data)
          }
        });
    }
  },
  beforeMount() {
    if(!toolbox.checkIfConnected()){
      this.$router.push({ name: 'Home' })
    }
  }
}

</script>
