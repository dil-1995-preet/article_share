<template>
  <div>
    <h2>Register</h2>
    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <label for="body">Comment</label>
        <input
          type="text"
          v-model="comment.body"
          v-validate="'required'"
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
        <button class="btn btn-primary" :disabled="status.registering">Add</button>
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
      comment: {
        body: ""
      },
      submitted: false
    };
  },
  computed: {
    ...mapState("account", ["status"])
  },
  methods: {
    ...mapActions("account", ["addComment"]),
    handleSubmit() {
      this.submitted = true;
      this.$validator.validate().then(valid => {
        if (valid) {
          this.addComment({
            comment: this.comment,
            slug: this.$route.params.id
          });
        }
      });
    }
  }
};
</script>