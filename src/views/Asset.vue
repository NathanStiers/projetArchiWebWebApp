<template>
  <Menu/>
  <h1>Asset page</h1>
  <div class="asset">
    <div v-for="asset in assetList" v-bind:key="asset.ticker">
      <AssetCard class="assetItem" v-bind:asset="asset" v-bind:apiData="apiData[asset.ticker]"/>  
    </div>
  </div>
  <p>bouton d'alerte de prix</p>
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
      assetList: [],
      apiData: []
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
    let wallet_id = this.$router.currentRoute._rawValue.params.id
        axios
        .post(this.uri+"/assets/"+wallet_id+"/fetch", {}, {
          headers : {token : toolbox.readCookie("Token")}
        })
        .then((response) => {
          if (response.status === 200) {
            if('apiDataCrypto' in response.data){
              this.apiData = toolbox.transformDictFromCryptoAPI(response.data.apiDataCrypto)
              this.assetList = response.data.resultSQL
            } else {
              response.data.forEach(el => {
                this.apiData[el.ticker] = {type : "null"}
              })
              this.assetList = response.data
            }
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

<style scoped>

.asset{
    display: flex;
    flex-flow: row wrap;
    justify-content: space-evenly;
}

.assetItem{
  padding: 2%;
}

</style>

