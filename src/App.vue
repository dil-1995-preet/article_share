<template>
  <div id="app">
    <div id="nav">
      <router-link to="/myarticles">My Articles</router-link>|
      <router-link to="/myfavorticles">My Favorite Articles</router-link>|
      <router-link to="/addarticle">Add Article</router-link>|
      <router-link to="/allarticles">All Articles</router-link>|
      <router-link to="/login">Login</router-link>|
      <router-link to="/register">Register</router-link>
    </div>
    <router-view/>
  </div>
</template>

<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
