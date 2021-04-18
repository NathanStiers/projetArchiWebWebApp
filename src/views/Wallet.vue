<template>
  <Menu/>
  <div class="wallet">
    <WalletCard v-for="(wallet, index) in walletList" v-bind:key="wallet.id" class="walletItem" v-bind:wallet="wallet" v-bind:index="index" @deleted="fetchWallets"/>  
    <AddWalletCard class="walletItem" v-if="!maxReached" v-bind:types="types" @added="fetchWallets"/>
  </div>
</template>

<script>

const toolbox = require("../Toolbox.js");
import Menu from '@/components/menu/Header.vue'
import WalletCard from '@/components/walletComponent/WalletCard.vue'
import AddWalletCard from '@/components/walletComponent/AddWalletCard.vue'
import axios from "axios";


export default {
  name: 'Wallet',
  data() {
    return{
      walletList: [],
      maxReached: true,
      types: [],
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
          this.maxReached = response.data.max_reached
          console.log(this.maxReached)
          this.types = response.data.types
        }else{
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