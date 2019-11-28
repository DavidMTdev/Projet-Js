<template>
 <div id="app">

        <h1 class="titre">POKEDEX</h1>

        <div class="search">
            <label for="recherche">RECHERCHEZ SUR NOTRE POKEDEX :</label>
            <br>
            <input type="search" id="recherche" name="#">
            <br>

            <button>recherche</button>
        </div>

        <div class="main">

            <div v-for="pokemon in pokemons" :key="pokemon.id" class="container">
            <router-link :to="`/pokemon/${ pokemon.id }`">Page d'accueil</router-link>
                <h3>{{ pokemon.name }}</h3>
                <img :src="pokemon.sprites.front_default" />
                <div v-for="abilitys in pokemon.abilities"  :key="abilitys.name" class="ability">
                    <p>{{ abilitys.ability.name  }}</p>
                </div>
            </div>
         

        </div>
    </div>
</template>

<script>
require("@/assets/css/Pokedex.css");

const axios = require("axios");


export default {
     name: "Pokedex",
  data() {
    return {
        pokemons: []
    };
  },
  mounted: function(){
    axios.get("https://pokeapi.co/api/v2/pokemon?offset=0&limit=30")
      .then(response => {
        let pokemon;

        for (let i = 0; i < response.data.results.length; i++) {
              axios.get(response.data.results[i].url)
            .then(resp => {
              pokemon = resp.data;
              this.pokemons.push(pokemon);
            });

        }
    });
  },
  methods:{

  }
}
</script>

<style>
</style>