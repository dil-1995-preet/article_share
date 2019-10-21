<template>
  <div id="article">
    <article>
      <h1>{{article.title}}</h1>
      <p>{{article.body}}</p>
    </article>
    <button
      class="btn btn-primary"
      v-if="article.author.username === username"
      v-on:click.stop="deleteMyArticle()"
    >Delete Article</button>
    <br>
    <button
      class="btn btn-primary"
      v-if="article.author.username === username"
      v-on:click.stop="editArticle()"
    >Edit Article</button>
    <br>
    <button class="btn btn-primary" v-if="userExists" @click="addComment()">Add Comment</button>
    <ul>
      <li v-for="i in comments" :key="i.slug">
        <p>{{i.body}}</p>
        <button
          class="btn btn-primary"
          v-if="i.author.username === username"
          v-on:click.stop="deleteMyComment(i.id)"
        >Delete Comment</button>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from "axios";
import { mapState, mapActions } from "vuex";
export default {
  el: "#article",
  data() {
    return {
      article: null,
      comments: [],
      username: "",
      userExists: false
    };
  },
  computed: {
    ...mapState("account", ["status"])
  },
  mounted() {
    axios
      .get(
        "https://conduit.productionready.io/api/articles/" +
          this.$route.params.id
      )
      .then(response => {
        this.article = response.data.article;
      });
    axios
      .get(
        "https://conduit.productionready.io/api/articles/" +
          this.$route.params.id +
          "/comments"
      )
      .then(response => {
        this.comments = response.data.comments;
      });
    var user = JSON.parse(localStorage.getItem("user"));
    if (user.user && user.user.username) {
      this.username = user.user.username;
      this.userExists = true;
    }
  },
  methods: {
    ...mapActions("account", ["deleteArticle", "deleteComment"]),
    deleteMyArticle() {
      this.submitted = true;
      this.deleteArticle(this.$route.params.id);
    },
    deleteMyComment(id) {
      this.deleteComment({ slug: this.$route.params.id, commentid: id });
    },
    editArticle() {
      this.submitted = true;
      this.$router.push({
        name: "editarticle",
        params: { id: this.$route.params.id }
      });
    },
    addComment() {
      this.submitted = true;
      this.$router.push({
        name: "addcomment",
        params: { id: this.$route.params.id }
      });
    }
  }
};
</script>