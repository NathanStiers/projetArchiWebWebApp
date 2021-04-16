<template>
  <Menu/>
  <div class="statistics">
    <h1>Statistics page</h1>
      <p>informations statistiques</p>
      <p>différents graphiques</p>
  </div>
</template>

<script>

const toolbox = require("../Toolbox.js");
import Menu from '@/components/menu/Header.vue'

export default {
  name: 'Statistics',
  components:{
    Menu
  },
  beforeMount() {
    if(!toolbox.checkIfConnected()){
      this.$router.replace({ name: 'Home' })
    }
  }
}

</script>
