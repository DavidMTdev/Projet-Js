<template>
  <div>
    <h3 v-if="win">Vous avez Gagner</h3>
    <h3 v-if="defeat">Vous avez perdu</h3>
  </div>
</template>

<script>
export default {
  name: "PokeWin",
  props: {}
};
</script>