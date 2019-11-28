<template>
  <div>
    <img :src="sprite.front_default" alt="pokemon_face"/>
    <img :src="sprite.back_default" alt="pokemon_dos">
  </div>
</template>

<script>
export default {
  name: "PokeItem",
  props: {
    sprite: Object
  }
};
</script>