<template>
  <Menu/>
  <div class="wallet">
    <h1>Wallet page</h1>
      <p>liste des wallets</p>
      <p>nom, type et numéro pour chacun d'eux</p>
      <p>bouton de suppression de wallet</p>
      <p>bouton d'ajout de wallet si possible</p>
  </div>
</template>

<script>

const toolbox = require("../Toolbox.js");
import Menu from '@/components/menu/Header.vue'

export default {
  name: 'Wallet',
  components:{
    Menu
  },
  beforeMount() {
    if(!toolbox.checkIfConnected()){
      this.$router.push({ name: 'Home' })
    }
  }
}

</script>
