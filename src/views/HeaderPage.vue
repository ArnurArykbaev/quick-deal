<template>
  <nav class="navigation">
    <router-link to="/">Home</router-link>
    <router-link to="/emplooyeesList">Employee list</router-link>
  </nav>
</template>

<script>
export default {
  name: "HeaderPage",
};
</script>

<style lang="scss">
.navigation {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  column-gap: 4rem;
  margin-bottom: 5rem;
}
</style>
