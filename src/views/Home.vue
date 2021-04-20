<template>
  <Menu />
  <div id="homeContainer">
    <div id="welcomeContainer">
      <div id="welcomeSentence">
        <p>
          <b id="welcomeWord">Welcome</b> to your new online investment portfolio !
        </p>
      </div>
      <div id="explanationText">
        <p>Our application will allow you to monitor your different assets regardless of their type.</p>
        <p>For example :</p>
        <ul>
          <li>The Stocks</li>
          <li>The Crypto-assets</li>
          <li>The Bonds</li>
          <li>And many others</li>
        </ul>
        <p>A statistics page will give you access to more details about your profits and diversification.</p>
        <p>Don't wait any longer, registration is free. More features will be offered with a Premium account (free for the moment, enjoy it).</p>
      </div>
    </div>    
    <div id="subAndLog">
      <router-link class="button" to="/login">
        Login
      </router-link>
      <router-link class="button" to="/subscribe">
        Sign up
      </router-link>
    </div>
  </div>
</template>

<script>

import Menu from '@/components/menu/HeaderRestrict.vue'

const toolbox = require("../Toolbox.js");

export default {
  name: 'Home',
  components: {
    Menu
  },
  beforeMount() {
    if(toolbox.checkIfConnected()){
      this.$router.replace({ name: 'Wallet' })
    }
  }
}

</script>

<style scoped>

#homeContainer{
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: center;
  margin-right: auto;
  margin-left: auto;
  width: 60rem;
  max-width: 80vw;
}

#welcomeWord{
  color: #42b983;
  font-weight: bold;
}

#welcomeSentence{
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-size: 1.5rem;
}

#explanationText{
  font-size: 1.05rem;
}

#welcomeContainer{
  border: solid medium black;
  padding: 0.5rem 1rem;
  max-height: 50vh;
  overflow-y: auto;
}

#welcomeContainer::-webkit-scrollbar {
  display: none;
}

#subAndLog{
  width: 60rem;
  max-width: 80vw;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-around;
  margin-top: 7.5vh;
}

@media all and (max-width:630px){
  #subAndLog{
    flex-flow: column nowrap;
  }
}

</style>
