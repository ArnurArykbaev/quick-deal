<template>
  <div class="home">
    <b-button variant="warning" to="/emplooyeesList"
      >The list of employees</b-button
    >
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "HomePage",
  components: {},
};
</script>

<style>
.home {
  display: flex;
  flex-direction: column;
  row-gap: 2rem;
  align-items: center;
  justify-content: center;
  height: 100vh;
}
</style>
