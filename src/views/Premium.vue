<template>
  <div class="premium">
    <h1>Premium page</h1>
      <p>explication du compte premium</p>
      <p>bouton pour devenir premium</p>
  </div>
</template>

<script>

const toolbox = require("../Toolbox.js");

export default {
  name: 'Premium',
  beforeMount() {
    if(!toolbox.checkIfConnected()){
      this.$router.push({ name: 'Home' })
    }
  }
}

</script>
