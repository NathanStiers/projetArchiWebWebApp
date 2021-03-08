<template>
  <div class="asset">
    <h1>Asset page</h1>
      <p>liste des actifs</p>
      <p>informations pour chacun d'eux</p>
      <p>bouton d'alerte de prix</p>
      <p>quantité possédée de l'actif</p>
      <p>valeur de la possession</p>
  </div>
</template>

<script>

const toolbox = require("../Toolbox.js");

export default {
  name: 'Asset',
  beforeMount() {
    if(!toolbox.checkIfConnected()){
      this.$router.push({ name: 'Home' })
    }
  }
}

</script>
