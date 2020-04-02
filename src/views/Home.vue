<template>
  <div class="home-page">
    <HomeBanner />

    <div class="container page">
      <div class="row">
        <div class="col-md-9">
          <div class="feed-toggle">
            <ul class="nav nav-pills outline-active">
              <li class="nav-item">
                <a class="nav-link disabled" href>Your Feed</a>
              </li>
              <li class="nav-item">
                <a class="nav-link active" href>Global Feed</a>
              </li>
            </ul>
          </div>

          <ArticlePreview
            v-for="article in articleInfo.articles"
            :article="article"
            :key="article.slug"
          />
        </div>

        <TagList :tags="tags" />
      </div>
    </div>
  </div>
</template>

<script>
import HomeBanner from "@/components/HomeBanner";
import TagList from "@/components/TagList";
import { mapActions, mapGetters } from "vuex";
import ArticlePreview from "@/components/ArticlePreview";

export default {
  name: "Home",
  components: {
    ArticlePreview,
    HomeBanner,
    TagList
  },
  computed: {
    ...mapGetters({
      tags: "tag/getTags",
      articleInfo: "article/articleInfo"
    })
  },
  methods: {
    ...mapActions(["tag/fetchTags"]),
    tagClick(tag) {
      console.log(tag);
    }
  },
  mounted() {
    this.$store.dispatch("tag/fetchTags");
    this.$store.dispatch("article/fetchGlobalArticle", {
      limit: 10,
      offset: 0
    });
  }
};
</script>


