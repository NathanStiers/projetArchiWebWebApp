<template>
  <Menu/>
  <div class="asset">
    <h1>Asset page</h1>
    <div v-for="asset in assetList" v-bind:key="asset.ticker">
      <AssetCard v-bind:asset="asset" />  
    </div>
      <p>informations pour chacun d'eux</p>
      <p>bouton d'alerte de prix</p>
      <p>quantité possédée de l'actif</p>
      <p>valeur de la possession</p>
  </div>
</template>

<script>

const toolbox = require("../Toolbox.js");
import Menu from '@/components/menu/Header.vue'
import AssetCard from '@/components/assetComponent/AssetCard.vue'
import axios from "axios";

export default {
  name: 'Asset',
  data(){
    return{
      uri: "http://localhost:3000",
      assetList: []
    }
  },
  components:{
    Menu,
    AssetCard
  },
  beforeMount() {
    if(!toolbox.checkIfConnected()){
      this.$router.push({ name: 'Home' })
      return;
    }
    let tmp = document.URL.split('/')
    let wallet_id = tmp[tmp.length-1]
        axios
        .post(this.uri+"/assets/"+wallet_id+"/fetch", {}, {
          headers : {token : toolbox.readCookie("Token")}
        })
        .then((response) => {
          if (response.status === 200) {
            this.assetList = response.data
            console.log(this.assetList)
          }else{
            alert("Erreur inconnue")
          }
        })
        .catch((error) => {
          if(error.response.status === 401 || error.response.status === 403){
            alert(error.response.data)
          }
        });
  }
}

</script>


