<template>
    <div class="article-meta">
        <router-link to="/">
            <img :src="article.author.image" alt="avatar"/>
        </router-link>
        <div class="info">
            <router-link to="/" class="author">{{ article.author.username }}</router-link>
            <span class="date">{{ updateTime }}</span>
        </div>
        <button class="btn btn-outline-primary btn-sm pull-xs-right">
            <i class="ion-heart"></i> {{article.favoritesCount}}
        </button>
    </div>
</template>

<script>
  import moment from "moment"

  export default {
    name: "MetaInfo",
    props: {
      article: {
        type: Object,
        default() {
          return {}
        }
      },
    },
    computed: {
      updateTime() {
        return moment(this.article.updatedAt).format("lll")
      },
    }
  }
</script>

<style scoped>

</style>