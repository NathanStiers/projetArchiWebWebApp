<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <ExampleComponent msg="Il y aura un message de bienvenue et les boutons de connexion et d'inscription"/>
  </div>
</template>

<script>
// @ is an alias to /src
import ExampleComponent from '@/components/ExampleComponent.vue'

export default {
  name: 'Home',
  components: {
    ExampleComponent
  }
}
</script>
