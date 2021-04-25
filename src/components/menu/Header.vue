<template>
  <div id="appContainer">
    <router-link id="logo" to="/" exact>
      <img src="../../assets/logo.png" alt="">
    </router-link>
    <div id="linkContainer">
      <router-link class="routerlink" to="/wallets">
        Management
      </router-link> 
      <span class="routerlink separator">|</span>
      <router-link class="routerlink" to="/statistics">
        Statistics
      </router-link> 
      <span class="routerlink separator">|</span>
      <router-link class="routerlink" to="/premium">
        Premium
      </router-link>
      <span class="routerlink separator">|</span>
      <router-link class="routerlink" to="/" replace @click="onLogout()">
        Logout
      </router-link>
    </div>
  </div>
  <hr id="mobileSeparator">
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

#linkContainer{
    display: flex;
    flex-flow: row wrap;
}

#appContainer a.router-link-exact-active {
  color: #42b983;
}

.routerlink{
  margin-right: 5vmin;
  margin-bottom: 2vh;
  text-decoration: none;
}

#mobileSeparator{
    display: none;       
}

@media all and (max-width:630px){
  .routerlink{
    margin-right: 3vmin;
  }
  #appContainer a {
    font-size: 0.9em;
  }
  #linkContainer{
        flex-flow: column-reverse;
        text-align: end;
    }
    #appContainer{
        min-height: 20vh;
        max-height: 25vh;
        margin-bottom: 0vmin;
    }
    #mobileSeparator{
        display: inherit;
        margin-bottom: 12vmin;
        border: solid thin #364a5e;
        background-color: #364a5e;
        width: 80vw;
    }
    .separator{
        display: none;
    }
    #logo img{
        height: 20vmin;
        width: auto;
    }    
}
</style>