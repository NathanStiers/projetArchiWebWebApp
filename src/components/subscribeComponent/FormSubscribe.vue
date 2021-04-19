<template>
  <div>
    Name : <input v-model="name" type="text">
    Surname : <input v-model="surname" type="text">
    Mail : <input v-model="mail" type="text">
    Password  : <input v-model="password" type="password">
    Confirm password : <input v-model="passwordConfirm" type="password">
  </div>
</template>

<script>
export default {
    name: 'FormSubscribe',
    emits : ['valueMailChanged', 'valuePasswordChanged', 'valueNameChanged', 'valueSurnameChanged', 'valuePasswordConfirmChanged'],
    computed: {
        name: {
            get: function() {
                return this.name
            },
            set: function(newValue) {
                this.$emit('valueNameChanged', newValue)
            }
        },
        surname: {
            get: function() {
                return this.surname
            },
            set: function(newValue) {
                this.$emit('valueSurnameChanged', newValue)
            }
        },
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
        },
        passwordConfirm: {
            get: function() {
                return this.passwordConfirm
            },
            set: function(newValue) {
                this.$emit('valuePasswordConfirmChanged', newValue)
            }
        },
    }
}
</script>

<style scoped>


</style>



