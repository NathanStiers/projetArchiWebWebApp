<template>
  <Menu />
  <div id="premiumContainer">
    <div id="explanationContainer">
      <p id="titleExplanation">What are the advantages of the premium mode?</p>
      <p>
        For the moment, users with a basic subscription can't create more than 3 wallets.<br>
        A premium user will have the opportunity to create up to 10 wallets!
      </p>
      <p>In addition, it will unlock certain features:</p>
      <ul>
        <li>The use of price alerts</li>
        <li>The use of more assets</li>
        <li>And many more</li>
      </ul>
      <p>As these features are not yet implemented on the site, the premium subscription is, for a limited time, free for all.</p>
    </div>
    <button @click="upgradeUser()">
      Become a Premium Member
    </button>
  </div>
</template>

<script>

const toolbox = require("../Toolbox.js");
import axios from "axios";
import Menu from '@/components/menu/Header.vue'

export default {
  name: 'Premium',
  components:{
    Menu
  },
  data() {
    return{
      uri: "http://localhost:3000"
    }
  },
  beforeMount() {
    if(!toolbox.checkIfConnected()){
      this.$router.replace({ name: 'Home' })
    }
  },
  methods:{
    upgradeUser() {
      axios.get(this.uri+"/user/premium", {
        headers: {token : toolbox.readCookie("Token")}
      }).then((response) => {
        if (response.status === 200) {
          let d = new Date();
          d.setTime(d.getTime() + 6 * 60 * 60 * 1000);
          let expires = "expires=" + d.toUTCString();
          document.cookie = "Token=" + response.data + ";" + expires + ";path=/"
          this.onSuccess("You're now a premium user")
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

#premiumContainer{
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: center;
  margin-right: auto;
  margin-left: auto;
  width: 60rem;
  max-width: 80vw;
}

#explanationContainer{
  font-size: 1.05rem;
  line-height: 1.2rem;
  margin-bottom: 6vh;
  border: black thin solid;
  padding: 1.5rem;
  max-height: 60vh;
  overflow-y: auto;
}

#explanationContainer::-webkit-scrollbar {
  display: none;
}

#titleExplanation{
  font-size: 1.2rem;
  text-align: center;
  margin-bottom: 6vh;
}

</style>
