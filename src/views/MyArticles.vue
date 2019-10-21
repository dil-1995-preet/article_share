<template>
  <div id="myArticles">
    <ul>
      <li v-for="i in articles" :key="i.slug" @click="showArticle(i.slug)">
        <article>
          <h1>{{i.title}}</h1>
          <p>{{i.body}}</p>
        </article>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from "axios";
export default {
  el: "#myArticles",
  data() {
    return {
      articles: null
    };
  },
  methods: {
    showArticle(slug) {
      this.$router.push({ name: "abc", params: { id: slug } });
    }
  },
  mounted() {
    let user = JSON.parse(localStorage.getItem("user"));
    axios
      .get(
        "https://conduit.productionready.io/api/articles?author=" +
          user.user.username
      )
      .then(response => {
        this.articles = response.data.articles;
      });
  }
};
</script>