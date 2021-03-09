<template>
  <Menu/>
  <div class="wallet">
    <div v-for="(wallet, index) in walletList" v-bind:key="wallet.id">
      <WalletCard v-bind:wallet="wallet" v-bind:index="index"/>  
    </div>
    <AddWalletCard v-if="!walletLeft<1">bouton d'ajout de wallet si possible</AddWalletCard>
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
      walletLeft: 0,
      uri: "http://localhost:3000"
    }
  },
  components:{
    Menu,
    WalletCard,
    AddWalletCard
  },
  beforeMount() {
    if(!toolbox.checkIfConnected()){
      this.$router.push({ name: 'Home' })
    }else{
      axios
        .post(this.uri+"/wallets/fetch", {}, {
          headers : {token : toolbox.readCookie("Token")}
        })
        .then((response) => {
          if (response.status === 200) {
            console.log(response)
            this.walletList = response.data.wallet_list
            let max = response.data.role === "premium" ? 10 : 3
            this.walletLeft = max - this.walletList.length
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
}

</script>

<style scoped>

.wallet{
    display: flex;
    flex-flow: row wrap;
    justify-content: space-evenly;
}

</style>