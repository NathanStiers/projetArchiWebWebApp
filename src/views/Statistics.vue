<template>
  <div class="statistics">
    <h1>Statistics page</h1>
      <p>informations statistiques</p>
      <p>différents graphiques</p>
  </div>
</template>

<script>

const toolbox = require("../Toolbox.js");

export default {
  name: 'Statistics',
  beforeMount() {
    if(!toolbox.checkIfConnected()){
      this.$router.push({ name: 'Home' })
    }
  }
}

</script>
