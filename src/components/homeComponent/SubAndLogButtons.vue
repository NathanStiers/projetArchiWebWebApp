<template>
  <div>
    <router-link class="button" to="/login">Se connecter</router-link>
    <router-link class="button" to="/subscribe">S'inscrire</router-link>
  </div>
</template>

<script>
export default {
  name: 'SubAndLogsButtons'
}
</script>

<style scoped>

.button {
  text-align: center;
	background-color: #42b983;
	border-radius: 30px;
	border: 1px solid #18ab29;
	cursor: pointer;
	color: #ffffff;
	font-size:large;
	padding: 2vh 2vw;
	text-decoration:none;
	text-shadow:0px 1px 0px #2f6627;
  width: 30vmin;
  line-height: 3vmin;
  height: 3vmin;
}

.button:hover {
	background-color:#5cbf92;
}

@media all and (max-width:630px){
  .button{
    margin-right: auto;
    margin-left: auto;
    margin-bottom: 3.5vh;
    width: 50vmin;
  }
}

</style>
