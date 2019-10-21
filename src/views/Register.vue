<template>
  <div>
    <h2>Register</h2>
    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <label for="email">Email</label>
        <input
          type="email"
          v-model="user.email"
          v-validate="'required'"
          name="email"
          class="form-control"
          :class="{ 'is-invalid': submitted && errors.has('email') }"
        >
        <div
          v-if="submitted && errors.has('email')"
          class="invalid-feedback"
        >{{ errors.first('email') }}</div>
      </div>
      <div class="form-group">
        <label for="username">Username</label>
        <input
          type="text"
          v-model="user.username"
          v-validate="'required'"
          name="username"
          class="form-control"
          :class="{ 'is-invalid': submitted && errors.has('username') }"
        >
        <div
          v-if="submitted && errors.has('username')"
          class="invalid-feedback"
        >{{ errors.first('username') }}</div>
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input
          type="password"
          v-model="user.password"
          v-validate="{ required: true, min: 6 }"
          name="password"
          class="form-control"
          :class="{ 'is-invalid': submitted && errors.has('password') }"
        >
        <div
          v-if="submitted && errors.has('password')"
          class="invalid-feedback"
        >{{ errors.first('password') }}</div>
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
import VueHighlightJS from 'vue-highlightjs'
import Vue from 'vue';
Vue.use(VueHighlightJS);

export default {
  data() {
    return {
      user: {
        email: "",
        username: "",
        password: ""
      },
      submitted: false
    };
  },
  computed: {
    ...mapState("account", ["status"])
  },
  methods: {
    ...mapActions("account", ["register"]),
    handleSubmit() {
      this.submitted = true;
      // console.log(this.$validator);
      this.$validator.validate().then(valid => {
        // console.log(valid);
        if (valid) {
          this.register({user:this.user});
        }
      });
    }
  }
};
</script>