<template>
  <div>
    <ul class="team">
      <li v-for="(team, index) in teams" :key="team.pokemon.id">
        <button @click="change(index)" class="btn-img">
          <PokeItem :pokemon="team.pokemon"></PokeItem>
        </button>
      </li>
    </ul>
  </div>
</template>

<script>
import PokeItem from "@/components/pokemon/PokeItem";

export default {
  name: "PokeList",
  components: {
    PokeItem
  },
  props: {
    player: Boolean,
    teams: Array,
    round: Boolean,
    choice: Boolean
  },
  methods: {
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
    }
  }
};
</script>