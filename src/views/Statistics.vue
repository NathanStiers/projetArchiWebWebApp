<template>
  <Menu/>
  <div class="statistics">
    <h1>Statistics page</h1>
    <div v-if="(typeof howMuchType !== 'undefined' && countUniqueAssets)">
            <p>Number of crypto-assets : {{howMuchType["Crypto-assets"]}} </p>
            <p>Number of stocks : {{howMuchType.Stocks}} </p>
            <p>Number of unique assets : {{countUniqueAssets}} </p>
            <p>Total P/L (of crypto-assets) : {{totalProfit.toFixed(2)}} €</p>
            <p>Best Unit Cost Price :  {{pruComparison.best[0]}}  =>  {{pruComparison.best[1].toFixed(2)}}€</p>
            <p>Worst Unit Cost Price : {{pruComparison.worst[0]}}  =>  {{pruComparison.worst[1].toFixed(2)}}€</p>
            <p>Best value (of crypto-assets) : {{valueComparison.best[0]}}  =>  {{valueComparison.best[1].toFixed(2)}}€</p>
            <p>Worst value (of crypto-assets) : {{valueComparison.worst[0]}}  =>  {{valueComparison.worst[1].toFixed(2)}}€</p>
    </div>
    <div v-else>
      <p>You don't have any asset for the moment</p>
    </div>
  </div>
</template>

<script>

const toolbox = require("../Toolbox.js");
import Menu from '@/components/menu/Header.vue'
import axios from "axios";

export default {
  name: 'Statistics',
  data() {
    return{
      howMuchType: undefined,
      countUniqueAssets: 0,
      totalProfit: 0,
      pruComparison: {},
      valueComparison: {},
      uri: "http://localhost:3000"
    }
  },
  components:{
    Menu
  },
  methods:{
    onSuccess(msg){
      this.$toast.success(msg)
      setTimeout(this.$toast.clear, 3000)
    },
    onError(msg){
      this.$toast.error(msg)
    }
  },
  beforeMount() {
    if(!toolbox.checkIfConnected()){
      this.$router.replace({ name: 'Home' })
    }else{
      axios.get(this.uri+"/statistics", {
        headers : {token : toolbox.readCookie("Token")}
      }).then((response) => {
        if (response.status === 200) {
          this.howMuchType = response.data.howMuchType
          this.countUniqueAssets = response.data.countUniqueAssets
          this.totalProfit = response.data.totalProfit
          this.pruComparison = response.data.pruComparison
          this.valueComparison = response.data.valueComparison
          this.onSuccess("Only crypto-assets are taken into account in the statistics")
        }
      }).catch((error) => {
        this.onError(error.response.data)
      });
    }
  }
}

</script>
