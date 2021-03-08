<template>
  <div class="subscribe">
    <h1>Subscribe page</h1>
      <p>formulaire d'inscription</p>
      <p>bouton d'envoi de formulaire</p>
  </div>
</template>

<script>

const toolbox = require("../Toolbox.js");

export default {
  name: 'Subscribe',
  beforeMount() {
    if(toolbox.checkIfConnected()){
      this.$router.push({ name: 'Wallet' })
    }
  }
}
</script>
