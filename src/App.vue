<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>

export default {
  name: 'App',
}

</script>

<style>

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

.button {
  text-align: center;
	background-color: #42b983;
	border-radius: 30px;
	border: 1px solid #18ab29;
	cursor: pointer;
	color: #fff;
	font-size: 1.2rem;
	padding: 1rem;
	text-decoration:none;
	text-shadow:0px 1px 0px #2f6627;
  min-width : 18vw;
  min-height : 1.5vh;
}

.button:hover {
	background-color:#5cbf92;
}

#logo img{
  height: 13vmin;
  width: auto;
  margin-left: 1vmin;
  margin-right: auto;
}

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

@media all and (max-width:630px){
  .button{
    width : 70vw;
    margin-top : 1rem;
  }
}

</style>
