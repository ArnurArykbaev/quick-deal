<template>
  <div id="app">
    <b-container fluid>
      <header><HeaderPage /></header>
      <router-view />
    </b-container>
  </div>
</template>

<script>
import HeaderPage from "@/views/HeaderPage.vue";

export default {
  components: { HeaderPage },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #e8e9e9;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #e8e9e9;

    &.router-link-exact-active {
      color: #ffc107;
    }
  }
}
</style>
