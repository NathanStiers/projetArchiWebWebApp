<template>
  <fieldset>
    <legend>Create account</legend>
    <div class="formItem">
      <label for="name">Name :</label>
      <input id="name" v-model="name" name="name" type="text"
             placeholder="Doe"
      >
    </div>
    <div class="formItem">
      <label for="surname">Surname :</label>
      <input id="surname" v-model="surname" name="surname" type="text"
             placeholder="John"
      >
    </div>
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
    <div class="formItem">
      <label for="passwordConfirm">Confirm password :</label>
      <input id="passwordConfirm" v-model="passwordConfirm" name="passwordConfirm" type="password"
             placeholder="**********"
      >
    </div>
  </fieldset>
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



