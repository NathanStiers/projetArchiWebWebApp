<template>
  <div id="appContainer">
      <router-link id="logo" to="/" exact>
        <img src="../../assets/logo.png" alt="" >
      </router-link>
      <router-link class="routerlink" to="/wallets">Gestion</router-link> 
      <span class="routerlink">|</span>
      <router-link class="routerlink" to="/statistics">Statistics</router-link> 
      <span class="routerlink">|</span>
      <router-link class="routerlink" to="/premium">Premium</router-link>
      <span class="routerlink">|</span>
      <router-link class="routerlink" v-on:click="onLogout()" to="/">Logout</router-link>
    </div>
</template>

<script>
export default {
  name: 'Menu',
  methods: {
    onLogout(){
      let d = new Date();
      d.setTime(d.getTime() - 1);
      let expires = "expires=" + d.toUTCString();
      document.cookie = "Token=" + ";" + expires + ";path=/"
    }
  }
}

</script>

<style scoped>

#appContainer a {
  font-weight: bold;
  color: #2c3e50;
}

#appContainer a.router-link-exact-active {
  color: #42b983;
}

#appContainer{
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  height: 13vmin;
  margin-bottom: 7vmin;
}

#logo{
  margin-right: auto;
}

#logo img{
  height: 13vmin;
  width: auto;
  margin-left: 1vmin;
  margin-right: auto;
}

.routerlink{
  margin-right: 5vmin;
}

@media all and (max-width:630px){
  .routerlink{
    margin-right: 3vmin;
  }
  #appContainer a {
    font-size: 0.9em;
  }
}
</style>