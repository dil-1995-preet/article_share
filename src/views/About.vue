<template>
  <div id="allarticles">
    <ul>
      <li v-for="i in articles" :key="i.slug" @click="showArticle(i.slug)">
        <article>
          <h1>{{i.title}}</h1>
          <p>{{i.body}}</p>
        </article>
        <button
          class="btn btn-primary"
          v-if="!i.favorited"
          v-on:click.stop="addToFavorate(i.slug)"
        >Add to Favorite</button>
        <button
          class="btn btn-primary"
          v-if="i.favorited"
          v-on:click.stop="deleteFavorate(i.slug)"
        >Remove from Favorite</button>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import axios from "axios";
export default {
  el: "#allarticles",
  data() {
    return {
      articles: null
    };
  },
  computed: {
    ...mapState("account", ["status"])
  },
  methods: {
    ...mapActions("account", [
      "deleteFromFavorateArticles",
      "addToFavorateArticles"
    ]),
    showArticle(slug) {
      this.$router.push({ name: "abc", params: { id: slug } });
    },
    addToFavorate(slug) {
      this.addToFavorateArticles(slug);
    },
    deleteFavorate(slug) {
      this.deleteFromFavorateArticles(slug);
    }
  },
  mounted() {
    axios
      .get("https://conduit.productionready.io/api/articles?limit=10&offset=0")
      .then(response => {
        this.articles = response.data.articles;
      });
  }
};
</script>