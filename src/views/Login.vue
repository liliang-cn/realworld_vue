<template>
    <div class="auth-page">
        <div class="container page">
            <div class="row">
                <div class="col-md-6 offset-md-3 col-xs-12">
                    <h1 class="text-xs-center">Sign In</h1>
                    <p class="text-xs-center">
                        <router-link to="/register">Need an account?</router-link>
                    </p>
                    <AuthForm @handleSubmit="login" :userInfo="userInfo"/>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import AuthForm from "../components/form/AuthForm"
  export default {
    name: "Login",
    components: {
      AuthForm
    },
    data() {
      return {

      }
    },
    computed: {
      ...mapGetters({
        userInfo: "user/getUser"
      })
    },
    methods: {
      login(user) {
        if (!this.userInfo.loading) {
          this.$store.dispatch("user/login", { user })
        }
      }
    }
  }
</script>

<style scoped>

</style>