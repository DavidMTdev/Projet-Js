<template>
  <div>
    <div v-for="abilitie in poke.abilities"  :key="abilitie.ability.name" class="ability">
                    <p>Habilité : {{ abilitie.ability.name  }}</p>
                </div>
                <div>
                    <p>taille : {{ poke.height  }}</p>
                </div>
                <div>
                    <p>poids : {{ poke.weight  }}</p>
                </div>
                <div  v-for="value in poke.types"  :key="value.id">
                    <p>type : {{ value.type.name  }}</p>
                </div>
  </div>
</template>

<script>
export default {
  name: "PokeFeatures",
  props: {
    poke: Object
  }
};
</script>