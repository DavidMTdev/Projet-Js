<template>
  <div>
    <PokeLife :pokemons="teamIA" class="ia-pokemon"></PokeLife>
    <PokeLife :pokemons="teamPlayer" class="player-pokemon"></PokeLife>
    <PokeStats :pokemons="teamPlayer"></PokeStats>
    <AppButton @buttonAction="attack" v-if="round" class="btn-attack"></AppButton>
  </div>
</template>

<script>
import PokeLife from "@/components/pokemon/PokeLife";
import PokeStats from "@/components/pokemon/PokeStats";
import AppButton from "@/components/app/AppButton";

export default {
  name: "PokeActive",
  components: {
    PokeLife,
    PokeStats,
    AppButton
  },
  props: {
    teamIA: Array,
    teamPlayer: Array,
    choice: Boolean
  },
  data() {
    return {
      round: true, //data pour savoir à qui sera le tour d'attaquer
      win: false, //data pour afficher le gagnant
      defeat: false //data pour afficher le perdant
    };
  },
  methods: {
    attack() {
      //Le pokemon active du joueur attaque le pokemon active de IA
      this.teamPlayer.forEach(element => {
        if (element.active == true) {
          this.teamIA.forEach(element2 => {
            if (element2.active == true) {
              //update de la vie du pokemon active de IA
              element2.life -= element.pokemon.stats[4].base_stat;
            }
          });
        }
      });
      this.round = false;

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