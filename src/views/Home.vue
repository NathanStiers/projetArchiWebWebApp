<template>
  <div class="home" id="homeContainer">
    <WelcomeMessage id="welcome"/>
    <SubAndLogButtons id="subAndLog"/>
  </div>
</template>

<script>

import WelcomeMessage from '@/components/homeComponent/WelcomeMessage.vue'
import SubAndLogButtons from '@/components/homeComponent/SubAndLogButtons.vue'

const toolbox = require("../Toolbox.js");

export default {
  name: 'Home',
  components: {
    WelcomeMessage,
    SubAndLogButtons
  },
  beforeMount() {
    if(toolbox.checkIfConnected()){
      this.$router.push({ name: 'Wallet' })
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
  width: 80vw;
}

#welcome{
  border: solid medium black;
  padding: 2vh 2vw;
  max-height: 50vh;
  overflow-y: auto;
}

#welcome::-webkit-scrollbar {
  display: none;
}

#subAndLog{
  width: 80vw;
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
