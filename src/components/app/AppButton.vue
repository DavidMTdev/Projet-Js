<template>
  <div>
    <button @click="$emit('buttonAction')">ATTAQUE</button>
  </div>
</template>

<script>
export default {
  name: "AppButton"
};
</script>

<style scoped>
</style>