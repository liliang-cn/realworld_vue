<template>
  <div class="profile-page">
    <div class="user-info">
      <div class="container">
        <div class="row">
          <div class="col-xs-12 col-md-10 offset-md-1">
            <img :src="profile.image" class="user-img" />
            <h4>{{profile.username}}</h4>
            <p>{{profile.bio}}</p>

            <button
              v-if="profile.username === currentUser.user.username"
              class="btn btn-sm btn-outline-secondary action-btn"
            >
              <i class="ion-gear-a"></i>
              &nbsp;
              Edit Profile Settings
            </button>

            <button v-else class="btn btn-sm btn-outline-secondary action-btn">
              <i class="ion-plus-round"></i>
              &nbsp;
              Follow {{profile.username}}
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="container">
      <div class="row">
        <div class="col-xs-12 col-md-10 offset-md-1">
          <div class="articles-toggle">
            <ul class="nav nav-pills outline-active">
              <li class="nav-item">
                <router-link
                  class="nav-link"
                  :to="profileUrl"
                  exact
                  active-class="active"
                >My Articles</router-link>
              </li>
              <li class="nav-item">
                <router-link
                  class="nav-link"
                  :to="favoritesUrl"
                  exact
                  active-class="active"
                >Favorited Articles</router-link>
              </li>
            </ul>
          </div>

          <template v-if="userArticlesInfo.articles.length === 0">
            <div class="article-preview">No articles are here... yet.</div>
          </template>
          <template v-else>
            <ArticlePreview
              v-for="article in userArticlesInfo.articles"
              :key="article.id"
              :article="article"
            />
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import ArticlePreview from "@/components/ArticlePreview.vue";

export default {
  name: "Profile",
  components: {
    ArticlePreview
  },
  computed: {
    ...mapGetters({
      profile: "user/getProfile",
      currentUser: "user/getUser",
      userArticlesInfo: "user/getUserArticlesInfo"
    }),
    isFav() {
      return this.$route.path === this.favoritesUrl;
    },
    username() {
      return this.$route.params.username;
    },
    profileUrl() {
      return `/profile/${this.username}`;
    },
    favoritesUrl() {
      return `/profile/${this.username}/favorites`;
    }
  },
  mounted() {
    this.getDetal();
  },
  watch: {
    $route(to, from) {
      this.getDetal(true);
    }
  },
  methods: {
    getDetal() {
      if (this.isFav) {
        this.$store.dispatch("user/fetchProfile", {
          username: this.username,
          queryType: "favorited"
        });
      } else {
        this.$store.dispatch("user/fetchProfile", {
          username: this.username
        });
      }
    }
  }
};
</script>

<style>
</style>