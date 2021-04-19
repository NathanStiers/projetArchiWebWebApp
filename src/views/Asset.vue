<template>
  <Menu />
  <h1>Asset page</h1>

  <!-- Search an asset based on label form -->
  <input id="searchAsset" v-model="searchLabel" type="text" placeholder="Search an asset"
         @keyup="search"
  >
  <div class="asset">
    
    <!-- List of all the assets in the user's selected wallet -->
    <AssetCard v-for="asset in assetList" :key="asset.ticker" class="assetItem" :type="type"
               :asset="asset" :api-data="apiData[asset.ticker]" @sucess="onSuccess" @error="onError"
    />  
    
    <!-- Add an asset form -->
    <AddAssetCard class="assetItem" :asset-list="assetsFromTypeList" @sucess="onSuccess" @error="onError" />
  </div>
</template>

<script>

const toolbox = require("../Toolbox.js");
import Menu from '@/components/menu/Header.vue'
import AssetCard from '@/components/assetComponent/AssetCard.vue'
import AddAssetCard from '@/components/assetComponent/AddAssetCard.vue'
import axios from "axios";
var _ = require('lodash');

export default {
  name: 'Asset',
  components:{
    Menu,
    AssetCard,
    AddAssetCard
  },
  data(){
    return{
      uri: "http://localhost:3000",
      assetList: [],
      apiData: [],
      assetsFromTypeList : [],
      type: '',
      searchLabel: "",
      completeList: [],
    }
  },
  beforeMount() {
    if(!toolbox.checkIfConnected()){
      this.$router.replace({ name: 'Home' })
      return;
    }
    this.fetchAssets()
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
          this.completeList = _.cloneDeep(this.assetList)
          this.type = response.data.type
        } else if(response.status === 204) {
          this.onError(response.data)
        } 
      }).catch((error) => {
        this.onError(error.response.data)
      });
    },
    search(){
      let pattern = this.searchLabel.toUpperCase()
      this.assetList = _.cloneDeep(this.completeList)
      if(pattern === ""){
        return;
      }
      let i = this.assetList.length
      while(i--){
        if (this.assetList[i].label.toUpperCase().indexOf(pattern) == -1) {
          this.assetList.splice(i, 1); 
        }
      }
    },
    onSuccess(msg, needRefetch){
      this.$toast.success(msg)
      setTimeout(this.$toast.clear, 3000)
      if(needRefetch){
        this.fetchAssets()
      }
    },
    onError(msg){
      this.$toast.error(msg)
    }
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

