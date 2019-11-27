<template>
  <div>
    <div class="column">
      <div class="hp">{{ "hp : " + pokemon.pokemon.stats[5].base_stat}}</div>
      <div class="attack">{{ "attaque : " + pokemon.pokemon.stats[4].base_stat}}</div>
      <div class="defense">{{ "défense : " + pokemon.pokemon.stats[3].base_stat}}</div>
    </div>
    <div class="column">
      <div class="special-attack">{{ "attaque spé : " + pokemon.pokemon.stats[2].base_stat}}</div>
      <div class="special-defense">{{ "défense spé : " + pokemon.pokemon.stats[1].base_stat}}</div>
      <div class="speed">{{ "vitesse : " + pokemon.pokemon.stats[0].base_stat }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PokeStats",
  props: {
    pokemon: Object
  }
};
</script>