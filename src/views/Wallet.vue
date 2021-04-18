<template>
  <Menu/>

  <!-- Search form -->
  <input type="text" id="searchWallet" v-model="searchLabel" v-on:keyup="search" placeholder="Search a wallet">
  <div class="wallet">

    <!-- Shows all the user's wallets -->
    <WalletCard v-for="(wallet, index) in walletList" v-bind:key="wallet.id" class="walletItem" v-bind:wallet="wallet" v-bind:index="index" @sucess="onSuccess" @error="onError"/>  
    
    <!-- Add wallet form -->
    <AddWalletCard class="walletItem" v-if="!maxReached" v-bind:types="types" @sucess="onSuccess" @error="onError"/>
  </div>
</template>

<script>

const toolbox = require("../Toolbox.js");
import Menu from '@/components/menu/Header.vue'
import WalletCard from '@/components/walletComponent/WalletCard.vue'
import AddWalletCard from '@/components/walletComponent/AddWalletCard.vue'
import axios from "axios";
var _ = require('lodash');

export default {
  name: 'Wallet',
  data() {
    return{
      walletList: [],
      maxReached: true,
      types: [],
      searchLabel: "",
      completeList: [],
      uri: "http://localhost:3000"
    }
  },
  components:{
    Menu,
    WalletCard,
    AddWalletCard
  },
  methods:{
    fetchWallets(){
      axios.get(this.uri+"/wallets/fetch", {
        headers : {token : toolbox.readCookie("Token")}
      }).then((response) => {
        if (response.status === 200) {
          this.walletList = response.data.user.wallet_list
          this.completeList = _.cloneDeep(this.walletList)
          this.maxReached = response.data.max_reached
          this.types = response.data.types
        }
      }).catch((error) => {
        this.onError(error.response.data)
      });
    },
    search(){
      let pattern = this.searchLabel.toUpperCase()
      this.walletList = _.cloneDeep(this.completeList)
      if(pattern === ""){
        return;
      }
      let i = this.walletList.length
      while(i--){
        if (this.walletList[i].label.toUpperCase().indexOf(pattern) == -1) {
          this.walletList.splice(i, 1); 
        }
      }
    },
    onSuccess(msg, needRefetch){
      this.$toast.success(msg)
      setTimeout(this.$toast.clear, 3000)
      if(needRefetch){
        this.fetchWallets()
      }
    },
    onError(msg){
      this.$toast.error(msg)
    }
  },
  beforeMount() {
    if(!toolbox.checkIfConnected()){
      this.$router.replace({ name: 'Home' })
    }else{
      this.fetchWallets()
    }
  }
}

</script>

<style scoped>

.wallet{
    display: flex;
    flex-flow: row wrap;
    justify-content: space-evenly;
}

.walletItem{
  padding: 2%;
}

</style>