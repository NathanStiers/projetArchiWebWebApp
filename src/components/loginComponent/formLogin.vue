<template>
  <div>
    Mail : <input v-model="mail" type="email">
    Password : <input v-model="password" type="password">
  </div>
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


</style>



