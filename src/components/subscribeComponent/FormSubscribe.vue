<template>
    <div>
        Nom : <input v-model="name" type="text" name="" id="">
        Prénom : <input v-model="surname" type="text" name="" id="">
        Mail : <input v-model="mail" type="text" name="" id="">
        Mot de passe : <input v-model="password" type="password" name="" id="">
        Confirmer le mot de passe : <input v-model="passwordConfirm" type="password" name="" id="">
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



