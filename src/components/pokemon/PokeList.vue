<template>
  <ul class="team">
    <li v-for="team in teams" :key="team">
      <button class="btn-img">
        <PokeItem :pokemon="team.pokemon"></PokeItem>
      </button>
    </li>
  </ul>
</template>

<script>
import PokeItem from "@/components/pokemon/PokeItem";

export default {
  name: "PokeList",
  components: {
    PokeItem
  },
  props: {
    teams: Array
  }
};
</script>

<style>
</style>