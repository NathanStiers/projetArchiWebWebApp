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

button {
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

.buttonOther {
  background-color: #364a5e !important;
  border: 1px solid #23313e !important;
  text-shadow:0px 1px 0px #1a242d !important;
}

.buttonOther:hover {
  background-color: #49647e !important;
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

.acceptLogo{
  font-size: larger;
  font-weight: bold;
  margin-left: 5%;
}

.acceptLogo:hover{
  color: green;
}

.abortLogo{
  font-size: larger;
  font-weight: bold;
  margin-left: 5%;
}

.abortLogo:hover{
  color: red;
}

@media all and (max-width:630px){
  .button{
    align-self: center;
    width : 70vw;
    margin-top : 1rem;
  }
}

</style>
