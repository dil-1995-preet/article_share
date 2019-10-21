<template>
  <div>
    <h2>Register</h2>
    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <label for="title">Title</label>
        <input
          type="text"
          v-model="article.title"
          v-validate="'required'"
          name="title"
          class="form-control"
          :class="{ 'is-invalid': submitted && errors.has('title') }"
        >
        <div
          v-if="submitted && errors.has('title')"
          class="invalid-feedback"
        >{{ errors.first('title') }}</div>
      </div>
      <div class="form-group">
        <label for="description">Description</label>
        <input
          type="text"
          v-model="article.description"
          v-validate="'required'"
          name="description"
          class="form-control"
          :class="{ 'is-invalid': submitted && errors.has('description') }"
        >
        <div
          v-if="submitted && errors.has('description')"
          class="invalid-feedback"
        >{{ errors.first('description') }}</div>
      </div>
      <div class="form-group">
        <label for="body">Body</label>
        <input
          type="text"
          v-model="article.body"
          v-validate="{ required: true, min: 6 }"
          name="body"
          class="form-control"
          :class="{ 'is-invalid': submitted && errors.has('body') }"
        >
        <div
          v-if="submitted && errors.has('body')"
          class="invalid-feedback"
        >{{ errors.first('body') }}</div>
      </div>
      <div class="form-group">
        <button class="btn btn-primary" :disabled="status.registering">Register</button>
        <router-link to="/login" class="btn btn-link">Cancel</router-link>
      </div>
    </form>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import VueHighlightJS from "vue-highlightjs";
import Vue from "vue";
Vue.use(VueHighlightJS);

export default {
  data() {
    return {
      article: {
        title: "",
        description: "",
        body: ""
      },
      submitted: false
    };
  },
  computed: {
    ...mapState("account", ["status"])
  },
  methods: {
    ...mapActions("account", ["addArticle"]),
    handleSubmit() {
      this.submitted = true;
      this.$validator.validate().then(valid => {
        if (valid) {
          this.addArticle({
            article: this.article
          });
        }
      });
    }
  }
};
</script>