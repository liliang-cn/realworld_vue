<template>
  <nav class="navbar navbar-light">
    <div class="container">
      <router-link to="/" class="navbar-brand">conduit</router-link>
      <ul class="nav navbar-nav pull-xs-right">
        <li class="nav-item">
          <!-- Add "active" class when you're on that page" -->
          <router-link to="/" class="nav-link" exact active-class="active">Home</router-link>
        </li>

        <template v-if="userInfo.loggedIn">
          <li class="nav-item">
            <a class="nav-link" href>
              <i class="ion-compose"></i>&nbsp;New Post
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href>
              <i class="ion-gear-a"></i>&nbsp;Settings
            </a>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" :to="userUrl" active-class="active">
              <img class="user-pic" :src="userInfo.user.image" />
              &nbsp;{{userInfo.user.username}}
            </router-link>
          </li>
        </template>

        <template v-else>
          <li class="nav-item">
            <router-link to="/login" class="nav-link" active-class="active">Sign in</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/register" class="nav-link" active-class="active">Sign up</router-link>
          </li>
        </template>
      </ul>
    </div>
  </nav>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "AppHeader",
  computed: {
    ...mapGetters({
      userInfo: "user/getUser"
    }),
    userUrl() {
      return `/profile/${this.userInfo.user.username}`;
    }
  }
};
</script>

<style>
</style>