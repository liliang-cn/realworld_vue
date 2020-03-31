<template>
    <div class="article-page">
        <div class="banner">
            <div class="container">
                <h1>{{ currentArticle.title }}</h1>

                <!--                <div class="article-meta">-->
                <!--                    <a href=""><img src="http://i.imgur.com/Qr71crq.jpg"/></a>-->
                <!--                    <div class="info">-->
                <!--                        <a href="" class="author">Eric Simons</a>-->
                <!--                        <span class="date">January 20th</span>-->
                <!--                    </div>-->
                <!--                    <button class="btn btn-sm btn-outline-secondary">-->
                <!--                        <i class="ion-plus-round"></i>-->
                <!--                        &nbsp;-->
                <!--                        Follow Eric Simons <span class="counter">(10)</span>-->
                <!--                    </button>-->
                <!--                    &nbsp;&nbsp;-->
                <!--                    <button class="btn btn-sm btn-outline-primary">-->
                <!--                        <i class="ion-heart"></i>-->
                <!--                        &nbsp;-->
                <!--                        Favorite Post <span class="counter">(29)</span>-->
                <!--                    </button>-->
                <!--                </div>-->
                <MetaInfo :article="currentArticle" />
            </div>
        </div>

        <div class="container page">
            <div class="row article-content">
                <div class="col-md-12">
                    <div v-if="currentArticle.body" v-html="parseMarkdown(currentArticle.body)"></div>
                </div>
            </div>

            <hr />

            <!-- <div class="article-actions">
                <div class="article-meta">
                    <a href="profile.html">
                        <img src="http://i.imgur.com/Qr71crq.jpg" />
                    </a>
                    <div class="info">
                        <a href class="author">Eric Simons</a>
                        <span class="date">January 20th</span>
                    </div>

                    <button class="btn btn-sm btn-outline-secondary">
                        <i class="ion-plus-round"></i>
                        &nbsp;
                        Follow Eric Simons
                        <span
                            class="counter"
                        >(10)</span>
                    </button>
                    &nbsp;
                    <button class="btn btn-sm btn-outline-primary">
                        <i class="ion-heart"></i>
                        &nbsp;
                        Favorite Post
                        <span
                            class="counter"
                        >(29)</span>
                    </button>
                </div>
            </div>-->

            <div class="row">
                <div class="col-xs-12 col-md-8 offset-md-2">
                    <form class="card comment-form">
                        <div class="card-block">
                            <textarea
                                v-model="comment"
                                class="form-control"
                                placeholder="Write a comment..."
                                rows="3"
                            ></textarea>
                        </div>
                        <div class="card-footer">
                            <img :src="currentUser.user.image" class="comment-author-img" />
                            <button
                                class="btn btn-sm btn-primary"
                                @click="submitComment"
                            >Post Comment</button>
                        </div>
                    </form>

                    <div class="card" v-for="comment in currentArticle.comments" :key="comment.id">
                        <div class="card-block">
                            <p class="card-text">{{ comment.body }}</p>
                        </div>
                        <div class="card-footer">
                            <a href class="comment-author">
                                <img :src="comment.author.image" class="comment-author-img" />
                            </a>
                            &nbsp;
                            <a
                                href
                                class="comment-author"
                            >{{comment.author.username}}</a>
                            <span class="date-posted">{{commentTime(comment.author.createdAt)}}</span>
                            <span
                                class="mod-options"
                                v-if="currentUser.user.username === comment.author.username"
                                @click="deleteComment(comment.id)"
                            >
                                <i class="ion-trash-a"></i>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
import marked from "marked";
import moment from "moment";

import MetaInfo from "../components/MetaInfo";

export default {
    name: "Article",
    data() {
        return {
            comment: ""
        };
    },
    computed: {
        slug() {
            return this.$route.params.slug;
        },
        ...mapGetters({
            currentArticle: "article/currentArticle",
            loading: "article/loading",
            currentUser: "user/getUser"
        })
    },
    mounted() {
        this.$store.dispatch("article/fetchArticleDetail", { slug: this.slug });
    },
    methods: {
        parseMarkdown(content = {}) {
            if (!this.loading) {
                return marked(content);
            }
        },
        commentTime(timeStr) {
            return moment(timeStr).format("lll");
        },
        submitComment(comment) {
            this.$store.dispatch("article/submitComment", {
                comment: this.comment
            });
        },
        deleteComment(id) {
            this.$store.dispatch("article/deleteComment", {
                id
            });
        }
    },
    components: {
        MetaInfo
    }
};
</script>

<style scoped>
</style>