<template>
  <Menu/>
  <h1>Asset page</h1>
  <div class="asset">
    <AssetCard class="assetItem" v-for="asset in assetList" v-bind:key="asset.ticker" v-bind:type="type" v-bind:asset="asset" v-bind:apiData="apiData[asset.ticker]" @deleted="fetchAssets"/>  
    <AddAssetCard class="assetItem" v-bind:assetList="assetsFromTypeList" @added="fetchAssets"/>
  </div>
</template>

<script>

const toolbox = require("../Toolbox.js");
import Menu from '@/components/menu/Header.vue'
import AssetCard from '@/components/assetComponent/AssetCard.vue'
import AddAssetCard from '@/components/assetComponent/AddAssetCard.vue'
import axios from "axios";

export default {
  name: 'Asset',
  data(){
    return{
      uri: "http://localhost:3000",
      assetList: [],
      apiData: [],
      assetsFromTypeList : [],
      type: ''
    }
  },
  components:{
    Menu,
    AssetCard,
    AddAssetCard
  },
  methods:{
    fetchAssets(){
      axios.get(this.uri+"/wallets/" + this.$router.currentRoute._rawValue.params.id, {
        headers : {token : toolbox.readCookie("Token")}
      }).then((response) => {
        if (response.status === 200) {
          this.apiData = response.data.apiInfos
          this.assetsFromTypeList = response.data.assetsFromType
          this.assetList = response.data.resultSQL
          this.type = response.data.type
        } else {
          alert(response.data)
        }
      }).catch((error) => {
        alert(error.response.data)
      });
    }
  },
  beforeMount() {
    if(!toolbox.checkIfConnected()){
      this.$router.replace({ name: 'Home' })
      return;
    }
    this.fetchAssets()
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

