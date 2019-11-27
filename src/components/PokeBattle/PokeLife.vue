<template>
  <div>
    <div
      v-if="pokemon.life == pokemon.pokemon.stats[5].base_stat"
      class="life life-100"
    >{{ pokemon.life }}</div>
    <div
      v-else-if="pokemon.life >= ((pokemon.pokemon.stats[5].base_stat * 75) / 100)"
      class="life life-75"
    >{{ pokemon.life }}</div>
    <div
      v-else-if="pokemon.life >= ((pokemon.pokemon.stats[5].base_stat * 50) / 100)"
      class="life life-50"
    >{{ pokemon.life }}</div>
    <div
      v-else-if="pokemon.life >= ((pokemon.pokemon.stats[5].base_stat * 25) / 100)"
      class="life life-25"
    >{{ pokemon.life }}</div>
    <div v-else class="life life-0">{{ pokemon.life }}</div>
  </div>
</template>

<script>
export default {
  name: "PokeLife",
  props: {
    pokemon: Object
  }
};
</script>