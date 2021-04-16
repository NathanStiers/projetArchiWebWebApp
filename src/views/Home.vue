<template>
  <Menu/>
  <div class="home" id="homeContainer">
    <div id="welcome">
    <p>Bienvenue sur votre nouveau portefeuille d'investissements en ligne !</p>
    <p>Notre application vous permettra de surveiller vos différents actifs quels que soit leurs types.</p>
    <p>Par exemple :</p>
    <ul>
      <li>Les Actions</li>
      <li>Les Crypto-actifs</li>
      <li>Les Obligations</li>
      <li>Et bien d'autres</li>
    </ul>
    <p>Une page de statistiques vous donnera accès à plus de détails sur vos bénéfices et votre diversification.</p>
    <p>N'attendez plus, l'inscription est gratuite. Plus de fonctionnalités vous seront proposées avec un compte Premium (gratuit pout le moment, profitez-en).</p>
    </div>
    <div id="subAndLog">
      <router-link class="button" to="/login">Se connecter</router-link>
      <router-link class="button" to="/subscribe">S'inscrire</router-link>
    </div>
  </div>
</template>

<script>

import Menu from '@/components/menu/HeaderRestrict.vue'

const toolbox = require("../Toolbox.js");

export default {
  name: 'Home',
  components: {
    Menu
  },
  beforeMount() {
    if(toolbox.checkIfConnected()){
      this.$router.replace({ name: 'Wallet' })
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


.button {
  text-align: center;
	background-color: #42b983;
	border-radius: 30px;
	border: 1px solid #18ab29;
	cursor: pointer;
	color: #ffffff;
	font-size:large;
	padding: 2vh 2vw;
	text-decoration:none;
	text-shadow:0px 1px 0px #2f6627;
  width: 30vmin;
  line-height: 3vmin;
  height: 3vmin;
}

.button:hover {
	background-color:#5cbf92;
}

@media all and (max-width:630px){
  .button{
    margin-right: auto;
    margin-left: auto;
    margin-bottom: 3.5vh;
    width: 50vmin;
  }
}

</style>
