<template>
    <div class="auth-page">
        <div class="container page">
            <div class="row">
                <div class="col-md-6 offset-md-3 col-xs-12">
                    <h1 class="text-xs-center">Sign Up</h1>
                    <p class="text-xs-center">
                        <router-link to="/login">Have an account?</router-link>
                    </p>
                    <AuthForm @handleSubmit="register" :isRegister="isRegister" :userInfo="userInfo"/>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import AuthForm from "../components/form/AuthForm"
  export default {
    name: "Register",
    components: {
      AuthForm
    },
    data() {
      return {
        isRegister: true
      }
    },
    computed: {
      ...mapGetters({
        userInfo: "user/getUser"
      })
    },
    methods: {
      register(user) {
        if (!this.userInfo.loading) {
          this.$store.dispatch("user/register", { user })
        }
      }
    }
  }
</script>

<style scoped>

</style>