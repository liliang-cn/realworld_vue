<template>
    <div class="col-md-3">
        <div class="sidebar">
            <p>Popular Tags</p>

            <div class="tag-list">
                <a href="" @click.prevent="tagClick(tag)" v-for="tag in tags" :key="tag" class="tag-pill tag-default">{{tag}}</a>
            </div>
        </div>
    </div>
</template>

<script>
  export default {
    name: "TagList",
    props: {
      tags: {
        type: Array,
        default() {
          return []
        },
        required: true
      }
    },
    methods: {
      tagClick(tag) {
        console.log(tag)
      }
    },
  };
</script>

<style>
</style>