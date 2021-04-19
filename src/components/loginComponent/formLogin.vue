<template>
  <div>
    Mail : <input
      id=""
      v-model="mail"
      type="email"
      name=""
    >
    Password : <input
      id=""
      v-model="password"
      type="password"
      name=""
    >
  </div>
</template>

<script>
export default {
    name: 'FormLogin',
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


</style>



