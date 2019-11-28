<template>
 <div id="app">
        <h1 class="titre">POKEDEX</h1>
        <div class="main">
            <div  class="container">
                <h3>{{ pokemon.name }}</h3>
                <PokeItem :sprite="pokemon.sprites" ></PokeItem>
                <PokeFeatures :poke="pokemon" ></PokeFeatures>
                <PokeStats :stats="pokemon.stats" ></PokeStats>
             </div>
        </div>
    </div>
</template>

<script>
import PokeStats from "@/pages/Pokemon/PokeStats";
import PokeItem from "@/pages/Pokemon/PokeItem";
import PokeFeatures from "@/pages/Pokemon/PokeFeatures";

require("@/assets/css/Pokedex.css");

const axios = require("axios");


export default {
    name: "Pokemon",
    components: {
    PokeStats,
    PokeItem,
    PokeFeatures
  },
  data() {
    return {
        pokemon: null
    };
  },
  created: function(){
    axios.get("https://pokeapi.co/api/v2/pokemon/" +  this.$route.params.id)
      .then(response => {
        this.pokemon = response.data;

    });
  },
  methods:{

  }
}
</script>

<style>
</style>