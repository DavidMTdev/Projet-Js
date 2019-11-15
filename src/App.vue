<template>
  <div v-cloak>
    <PokeBattle></PokeBattle>
  </div>
</template>

<script>
import PokeBattle from "@/pages/PokeBattle";

export default {
  name: "app",
  components: {
    PokeBattle
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
