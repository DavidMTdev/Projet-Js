<template>
  <div id="app">
    <router-link class="btn-back" to="/">Page d'accueil</router-link>
    <img class="bg-img" :src="require(`@/assets/img/background.jpg`)" />
    <div class="window-battle">
      <img class="bg-img" :src="require(`@/assets/img/bg_battle.jpg`)" />
    </div>
    <div class="window-battle">
      <div v-if="play" class="enemy">
        <ul class="team">
          <li v-for="value in teamIA" :key="value.pokemon.id">
            <button class="btn-img">
              <img class="bg-img" :src="require(`@/assets/img/pokeball.png`)" />
              <img class="team-pokemon" :src="value.pokemon.sprites.front_default" />
            </button>
          </li>
        </ul>
      </div>
      <div v-if="play" class="battle-pokemon">
        <div class="console"></div>
        <div v-for="value in teamIA" :key="value.pokemon.id">
          <div v-if="value.active" class="ia-pokemon">
            <PokeLife :pokemon="value" class="max-life-ia"></PokeLife>
            <img v-if="value.active" :src="value.pokemon.sprites.front_default" />
          </div>
        </div>
        <div v-for="value in teamPlayer" :key="value.pokemon.id">
          <div v-if="value.active" class="player-pokemon">
            <PokeLife :pokemon="value" class="max-life-ia"></PokeLife>
            <img v-if="value.active" :src="value.pokemon.sprites.back_default" />
          </div>
        </div>
        <div v-for="value in teamPlayer" :key="value.pokemon.id">
          <div v-if="value.active">
            <PokeStats :pokemon="value" class="stats"></PokeStats>
          </div>
        </div>
        <div v-if="round" class="btn-attack">
          <button @click="attack()">ATTAQUE</button>
        </div>
      </div>
      <div v-if="play" class="player">
        <ul class="team">
          <li v-for="(value, index) in teamPlayer" :key="value.pokemon.id">
            <button @click="change(index)" class="btn-img">
              <!-- <PokeItem :pokemon="value"></PokeItem> -->
              <img class="bg-img" :src="require(`@/assets/img/pokeball.png`)" />
              <img class="team-pokemon" :src="value.pokemon.sprites.front_default" />
            </button>
          </li>
        </ul>
      </div>
      <div v-if="!play" class="game-over">
        <h3 v-if="win">Vous avez Gagner</h3>
        <h3 v-if="defeat">Vous avez perdu</h3>
      </div>
    </div>
  </div>
</template>

<script>
// on inclue un CSS
require("@/assets/css/pokeBattle.css");

// on inclue un axios
const axios = require("axios");

import PokeLife from "@/components/PokeBattle/PokeLife";
import PokeStats from "@/components/PokeBattle/PokeStats";
// import PokeItem from "@/components/PokeBattle/PokeItem";

// import PokeActive from "@/components/pokemon/PokeActive";

export default {
  name: "PokeBattle",
  components: {
    PokeLife,
    PokeStats
    // PokeItem
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
    },
    change(index) {
      //on peut changer un pokemon si le pokemon active n'attaque pas et on ne peut que changer une seule fois durant le tour du joeur
      if (this.round && this.choice) {
        this.teamPlayer.forEach(element => {
          //on effectue le changement de pokemon
          if (element.active == true) {
            element.active = false;
          }
        });

        this.teamPlayer[index].active = true;

        //apres avoir changer de pokemon on ne peut plus le changer
        this.choice = false;
      }
    },
    attack() {
      //Le pokemon active du joueur attaque le pokemon active de IA
      this.teamPlayer.forEach(element => {
        if (element.active == true) {
          this.teamIA.forEach(element2 => {
            if (element2.active == true) {
              //update de la vie du pokemon active de IA
              element2.life -= element.pokemon.stats[4].base_stat;
              this.round = false;
            }
          });
        }
      });

      let StopIteration = {};

      //Le pokemon active du IA attaque le pokemon active de Joueur
      this.teamIA.forEach((element, index) => {
        setTimeout(() => {
          if (element.active == true) {
            //si le pokemon de IA n'est pas mort il attaque
            if (element.life > 0) {
              try {
                this.teamPlayer.forEach((element2, index2) => {
                  if (element2.active == true) {
                    //update de la vie du pokemon active de Joueur
                    element2.life -= element.pokemon.stats[4].base_stat;

                    //Changement de pokemon active du joueur pour le combat si l'autre est mort
                    if (element2.life < 0) {
                      //on supprime l'ellement si le pokemon du joeur est mort
                      this.$delete(this.teamPlayer, index2);

                      //Joueur à gagner
                      if (this.teamPlayer.length == 0) {
                        this.play = false;
                        this.defeat = true;

                        throw StopIteration;

                        //changement de pokemon du joueur en fonction de ça position dans le tableau
                      } else if (index2 == this.teamPlayer.length) {
                        this.teamPlayer[index2 - 1].active = true;
                      } else {
                        this.teamPlayer[index2].active = true;
                      }

                      throw StopIteration;
                    }
                  }
                });
              } catch (e) {
                if (e !== StopIteration) {
                  throw e;
                }
              }

              this.round = true;

              //sinon Changement de pokemon active de IA pour le combat si l'autre est mort
            } else {
              try {
                //on supprime l'ellement si le pokemon de IA est mort
                this.$delete(this.teamIA, index);

                //Joueur à perdu
                if (this.teamIA.length == 0) {
                  this.play = false;
                  this.win = true;

                  throw StopIteration;

                  //changement de pokemon de IA en fonction de ça position dans le tableau
                } else if (index == this.teamIA.length) {
                  this.teamIA[index - 1].active = true;
                } else {
                  this.teamIA[index].active = true;
                }
              } catch (e) {
                if (e !== StopIteration) {
                  throw e;
                }
              }
            }
          } else {
            this.round = true;
          }
        }, 3000);
      });

      //apres une attaque on peut changer de pokemon pour le joueurs
      this.choice = true;
    }
  }
};
</script>

<style>
.btn-back {
  position: absolute;
  top: 10px;
  left: 20px;
  color: #000000;
  cursor: pointer;
}
</style>