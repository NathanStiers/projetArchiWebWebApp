<template>
  <fieldset>
    <legend>Login</legend>
    <div class="formItem">
      <label for="mail">Mail :</label>
      <input id="mail" v-model="mail" name="mail" type="email"
             placeholder="john.doe@mail.com"
      >
    </div>
    <div class="formItem">
      <label for="password">Password :</label>
      <input id="password" v-model="password" name="password" type="password"
             placeholder="**********"
      >
    </div>
  </fieldset>
</template>

<script>
export default {
    name: 'FormLogin',
    emits : ['valueMailChanged', 'valuePasswordChanged'],
    computed: {
        mail: {
            get: function() {
                return this.mail
            },
            set: function(newValue) {
                this.$emit('valueMailChanged', newValue)
            }
        },
        password: {
            get: function() {
                return this.password
            },
            set: function(newValue) {
                this.$emit('valuePasswordChanged', newValue)
            }
        }
    }
}
</script>

<style scoped>

legend {
    font-size: 1.5rem;
}

label {
    font-size: 1.05rem;
}

.formItem {
    display: flex;
    flex-flow: row nowrap;
    width: 30rem;
    max-width: 60vw;
    margin: 1rem 1rem;
}

.formItem > input {
    margin-left: auto;
    width: 15rem;
    max-width: 30vw;
}

</style>



