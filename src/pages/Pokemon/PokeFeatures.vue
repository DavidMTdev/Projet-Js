<template>
  <div>
    <div v-for="abilitie in poke.abilities"  :key="abilitie.ability.name" class="ability">
                    <p>{{ abilitie.ability.name  }}</p>
                </div>
                <div>
                    <p>{{ poke.height  }}</p>
                </div>
                <div>
                    <p>{{ poke.weight  }}</p>
                </div>
                <div  v-for="value in poke.types"  :key="value.id">
                    <p>{{ value.type.name  }}</p>
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