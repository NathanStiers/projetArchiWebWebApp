<template>
  <Menu />
  <div class="premium">
    <h1>Premium page</h1>
    <div>
      <p>What are the advantages of the premium mode?</p>
      <p>
        For the moment, users with a basic subscription can't create more than 3 wallets.<br>
        A premium user will have the opportunity to create up to 10 wallets!
      </p>
      <p>In addition, it will unlock certain features:</p>
      <ul>
        <li>The use of price alerts</li>
        <li>The use of more assets</li>
        <li>And many more</li>
      </ul>
      <p>As these features are not yet implemented on the site, the premium subscription is, for a limited time, free for all.</p>
    </div>
    <button @click="upgradeUser()">
      Become a Premium Member
    </button>
  </div>
</template>

<script>

const toolbox = require("../Toolbox.js");
import axios from "axios";
import Menu from '@/components/menu/Header.vue'

export default {
  name: 'Premium',
  components:{
    Menu
  },
  data() {
    return{
      uri: "http://localhost:3000"
    }
  },
  beforeMount() {
    if(!toolbox.checkIfConnected()){
      this.$router.replace({ name: 'Home' })
    }
  },
  methods:{
    upgradeUser() {
      axios.get(this.uri+"/user/premium", {
        headers: {token : toolbox.readCookie("Token")}
      }).then((response) => {
        if (response.status === 200) {
          let d = new Date();
          d.setTime(d.getTime() + 6 * 60 * 60 * 1000);
          let expires = "expires=" + d.toUTCString();
          document.cookie = "Token=" + response.data + ";" + expires + ";path=/"
          this.onSuccess("You're now a premium user")
        }
      }).catch((error) => {
        this.onError(error.response.data)
      });
    },
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
