<template>
  <div id="app">
    <AppHeader />
    <router-view/>
    <AppFooter />
  </div>
</template>

<script>
import AppHeader from '@/components/AppHeader.vue'
import AppFooter from '@/components/AppFooter.vue'
 
export default {
  name: "App",
  components: {
    AppHeader,
    AppFooter
  },
  mounted() {
    this.$store.dispatch("user/checkLoggedInStatus")
  }
}
</script>
<style>

</style>
