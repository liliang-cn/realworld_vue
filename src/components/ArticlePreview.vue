<template>
    <div class="article-preview">
        <MetaInfo :article="article" />
        <router-link :to="articleUrl" class="preview-link">
            <h1>{{ article.title }}</h1>
            <p>{{ article.description }}</p>
            <span>Read more...</span>
        </router-link>
    </div>
</template>

<script>
  import MetaInfo from './MetaInfo'

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
      articleUrl() {
        return `/article/${this.article.slug}`
      }
    },
    components: {
      MetaInfo
    }
  }
</script>

<style scoped>

</style>