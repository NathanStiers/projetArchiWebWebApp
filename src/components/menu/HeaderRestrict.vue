<template>
  <div id="appContainer">
      <router-link id="logo" to="/" exact>
        <img src="../../assets/logo.png" alt="" >
      </router-link>
    </div>
</template>

<script>
export default {
  name: 'Menu'
}
</script>

<style scoped>

#appContainer{
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  height: 13vmin;
  margin-bottom: 7vmin;
}

#logo{
  margin-right: auto;
}

#logo img{
  height: 13vmin;
  width: auto;
  margin-left: 1vmin;
  margin-right: auto;
}

</style>