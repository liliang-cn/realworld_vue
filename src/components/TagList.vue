<template>
    <div class="col-md-3">
        <div class="sidebar">
            <p>Popular Tags</p>

            <div class="tag-list">
				<a href="" @click.prevent="tagClick(tag)"  v-for="tag in tags" :key="tag" class="tag-pill tag-default">{{tag}}</a>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
    name: "TagList",
    computed: mapGetters(["tags"]),
    methods: {
      ...mapActions(["fetchTags"]),
      tagClick(tag) {
        console.log(tag)
      }
    },
    mounted() {
        this.$store.dispatch("fetchTags");
    }
};
</script>

<style>
</style>