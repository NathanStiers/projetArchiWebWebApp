<template>
  <Menu />
  <div id="statisticsContainer">
    <fieldset>
      <legend>Your investments statistics</legend>
      <div v-if="(typeof howMuchType !== 'undefined' && countUniqueAssets)">
        <p>Number of crypto-assets : {{ howMuchType["Crypto-assets"] }} </p>
        <p>Number of stocks : {{ howMuchType.Stocks }} </p>
        <p>Number of unique assets : {{ countUniqueAssets }} </p>
        <p>Total P/L (of crypto-assets) : {{ totalProfit.toFixed(2) }} €</p>
        <p>Best Unit Cost Price :  {{ pruComparison.best[0] }}  =>  {{ pruComparison.best[1].toFixed(2) }}€</p>
        <p>Worst Unit Cost Price : {{ pruComparison.worst[0] }}  =>  {{ pruComparison.worst[1].toFixed(2) }}€</p>
        <p>Best value (of crypto-assets) : {{ valueComparison.best[0] }}  =>  {{ valueComparison.best[1].toFixed(2) }}€</p>
        <p>Worst value (of crypto-assets) : {{ valueComparison.worst[0] }}  =>  {{ valueComparison.worst[1].toFixed(2) }}€</p>
      </div>
      <div v-else>
        <p>You don't have any asset for the moment</p>
      </div>
    </fieldset>
  </div>
</template>

<script>

const toolbox = require("../Toolbox.js");
import Menu from '@/components/menu/Header.vue'
import axios from "axios";

export default {
  name: 'Statistics',
  components:{
    Menu
  },
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
  },
  methods:{
    onSuccess(msg){
      this.$toast.success(msg)
      setTimeout(this.$toast.clear, 3000)
    },
    onError(msg){
      this.$toast.error(msg)
    }
  }
}

</script>

<style scoped>

legend {
    font-size: 1.5rem;
}

#statisticsContainer{
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: center;
  margin-right: auto;
  margin-left: auto;
  width: 60rem;
  max-width: 80vw;
}

p{
  font-size: 1.05rem;
}

fieldset{
  width: 60rem;
  max-width: 70vw;
  padding: 2rem;
}

</style>