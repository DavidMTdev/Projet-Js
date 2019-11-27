<template>
  <div>
    <img class="bg-img" :src="require(`@/assets/img/pokeball-image-1-transparent.png`)" />
    <img class="team-pokemon" :src="pokemon.sprites.front_default" />
  </div>
</template>

<script>
export default {
  name: "PokeItem",
  props: {
    pokemon: Object
  }
};
</script>