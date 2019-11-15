<template>
  <div>
    <img class="bg-img" :src="require(`@/assets/img/pokemon-go-legendaires.jpg`)" />
    <div class="window-battle">
      <img
        class="bg-img"
        :src="require(`@/assets/img/Animation Backgrounds_ BROTHER BEAR part two.jpg`)"
      />
    </div>

    <div class="window-battle">
      <PokeList v-if="play" class="enemy" :teams="teamIA"></PokeList>
    </div>
  </div>
</template>

<script>
const axios = require("axios");

import PokeList from "@/components/pokemon/PokeList";

export default {
  name: "PokeBattle",
  components: {
    PokeList
  },
  data() {
    return {
      teamPlayer: [], //equipe du joueur
      teamIA: [], //equipe de IA
      round: true, //data pour savoir à qui sera le tour d'attaquer
      choice: true, //data pour pouvoir choisir le pokemon qui combatera
      play: true, //date pour avfficher la scene de combat
      win: false, //data pour afficher le gagnant
      defeat: false //data pour afficher le perdant
    };
  },
  mounted: function() {
    // `this` est une référence à l'instance de vm
    axios
      .get("https://pokeapi.co/api/v2/pokemon?offset=0&limit=400")
      .then(response => {
        let team;

        for (let i = 0; i < 5; i++) {
          //ajoute 5 pokemon de l'api pour le joueur
          axios
            .get(response.data.results[this.getRandom(1, 400)].url)
            .then(resp => {
              //le 1er pokemon sera active pour le combat du joueur
              if (i == 0) {
                team = {
                  pokemon: resp.data,
                  active: true,
                  life: resp.data.stats[5].base_stat
                };

                //les autre ne sont pas active
              } else {
                team = {
                  pokemon: resp.data,
                  active: false,
                  life: resp.data.stats[5].base_stat
                };
              }
              this.teamPlayer.push(team);
            });

          //ajoute 5 pokemon de l'api pour l'IA
          axios
            .get(response.data.results[this.getRandom(1, 400)].url)
            .then(resp => {
              //le 1er pokemon sera active pour le combat de IA
              if (i == 0) {
                team = {
                  pokemon: resp.data,
                  active: true,
                  life: resp.data.stats[5].base_stat
                };

                //les autre ne sont pas active
              } else {
                team = {
                  pokemon: resp.data,
                  active: false,
                  life: resp.data.stats[5].base_stat
                };
              }
              this.teamIA.push(team);
            });
        }
      });
  },
  methods: {
    getRandom(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }
  }
};
</script>

<style>
</style>