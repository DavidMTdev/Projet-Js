<template>
  <div id="app">
    <img class="bg-img" :src="require(`@/assets/img/background.jpg`)" />
    <div class="frame">
      <div class="flex space-around align-items h-100" href>
        <router-link class="frame-item border-orange" to="/pokebattle">
          <div class="item flex align-items h-100">
            <h2 class="color-blue">Poke Battle</h2>
            <img :src="require(`@/assets/img/mXTHVfo.gif`)" alt />
          </div>
        </router-link>
        <router-link class="frame-item border-blue" to="/pokedex">
          <div class="item flex align-items h-100">
            <h2 class="color-orange">Pokedex</h2>
            <img :src="require(`@/assets/img/DistinctBrightBird.webp`)" alt />
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "home"
};
</script>

<style>
.bg-img {
  width: 100%;
  height: 100%;
}

.frame {
  position: absolute;
  width: 1000px;
  height: 600px;
  left: 50%;
  top: 50%;

  transform: translate(-50%, -50%);
}

.flex {
  display: flex;
}

.h-100 {
  height: 100%;
}

.space-around {
  justify-content: space-around;
}

.align-items {
  align-items: center;
}

.frame-item {
  width: 300px;
  height: 300px;

  box-sizing: border-box;
  border-radius: 50px;
}

.border-orange {
  border: 6px solid #ee8811;
}

.border-blue {
  border: 6px solid #526bef;
}

.item {
  position: relative;
}

.color-orange {
  color: #ee8811;
}

.color-blue {
  color: #526bef;
}

.item h2 {
  position: absolute;
  left: 50%;
  top: 50%;

  transform: translate(-50%, -50%);

  font-size: 3em;
}

.item img {
  width: 100%;
  height: 180px;
}
</style>