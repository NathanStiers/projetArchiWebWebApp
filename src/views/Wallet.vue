<template>
  <Menu />
  <div id="walletContainer">
    <!-- Search form -->
    <input id="searchWallet" v-model="searchLabel" type="text" placeholder="Search a wallet"
           @keyup="search"
    >

    <div id="walletItemContainer">
      <!-- Shows all the user's wallets -->
      <WalletCard v-for="(wallet, index) in walletList" :key="wallet.id" :wallet="wallet"
                  :index="index" @sucess="onSuccess" @error="onError"
      />  
      
      <!-- Add wallet form -->
      <AddWalletCard v-if="!maxReached" :types="types" @sucess="onSuccess"
                     @error="onError"
      />
    </div>
  </div>
</template>

<script>

const toolbox = require("../Toolbox.js");
import Menu from '@/components/menu/Header.vue'
import WalletCard from '@/components/walletComponent/WalletCard.vue'
import AddWalletCard from '@/components/walletComponent/AddWalletCard.vue'
import axios from "axios";
var _cloneDeep = require('lodash.clonedeep');

export default {
  name: 'Wallet',
  components:{
    Menu,
    WalletCard,
    AddWalletCard
  },
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
  beforeMount() {
    if(!toolbox.checkIfConnected()){
      this.$router.replace({ name: 'Home' })
    }else{
      this.fetchWallets()
    }
  },
  methods:{
    fetchWallets(){
      axios.get(this.uri+"/wallets/fetch", {
        headers : {token : toolbox.readCookie("Token")}
      }).then((response) => {
        if (response.status === 200) {
          this.walletList = response.data.user.wallet_list
          this.completeList = _cloneDeep(this.walletList)
          this.maxReached = response.data.max_reached
          this.types = response.data.types
        }
      }).catch((error) => {
        this.onError(error.response.data)
      });
    },
    search(){
      let pattern = this.searchLabel.toUpperCase()
      this.walletList = _cloneDeep(this.completeList)
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
  }
}

</script>

<style scoped>

#walletContainer {
  display: flex;
  flex-flow: column nowrap;
  padding-right: 2vw;
  padding-left: 2vw;
}

#searchWallet{
  height: 2rem;
  width: 24rem; 
  max-width: 60vw;
  align-self: flex-end;
  margin-left: 1rem;
  margin-right: 1rem;
  margin-bottom: 5vh;
  border-radius: 30px;
  padding-left: 1rem;
  font-size: 1.05rem;
}

#searchWallet:focus{
  outline: none;
}

#walletItemContainer{
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
}

@media all and (max-width:630px){
  #walletContainer{
    padding-right: none;
    padding-left: none;
  }
  #searchWallet{
    align-self: center;
  }
  #walletItemContainer{
    flex-flow: column nowrap;
    align-items: center;
    justify-content: center;
  }
}

</style>