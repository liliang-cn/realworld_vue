<template>
    <div class="article-preview">
        <div class="article-meta">
            <a href="/">
                <img :src="article.author.image" alt="avatar"/>
            </a>
            <div class="info">
                <a href class="author">{{ article.author.username }}</a>
                <span class="date">{{ updateTime }}</span>
            </div>
            <button class="btn btn-outline-primary btn-sm pull-xs-right">
                <i class="ion-heart"></i> {{article.favoritesCount}}
            </button>
        </div>
        <router-link :to="articleUrl" class="preview-link">
            <h1>{{ article.title }}</h1>
            <p>{{ article.description }}</p>
            <span>Read more...</span>
        </router-link>
    </div>
</template>

<script>
  import moment from 'moment'
  export default {
    name: "ArticlePreview",
    props: {
      article: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    computed: {
      updateTime() {
        return moment(this.article.updatedAt).format("lll")
      },
      articleUrl() {
        return `/article/${this.article.slug}`
      }
    },
  }
</script>

<style scoped>

</style>