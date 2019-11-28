<template>
    <div class="column">
        <div v-for="stat in stats" :key="stat.stat.name">
            <span>{{stat.stat.name}} : </span>{{stat.base_stat}}
        </div>
    </div>
</template>

<script>
export default {
  name: "PokeStats",
  props: {
    stats: Array
  }
};
</script>