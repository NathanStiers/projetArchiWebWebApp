<template>
  <div>
    Name : <input
      id=""
      v-model="name"
      type="text"
      name=""
    >
    Surname : <input
      id=""
      v-model="surname"
      type="text"
      name=""
    >
    Mail : <input
      id=""
      v-model="mail"
      type="text"
      name=""
    >
    Password  : <input
      id=""
      v-model="password"
      type="password"
      name=""
    >
    Confirm password : <input
      id=""
      v-model="passwordConfirm"
      type="password"
      name=""
    >
  </div>
</template>

<script>
export default {
    name: 'FormSubscribe',
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



