import Home from '@/pages/Home';
import PokeBattle from '@/pages/PokeBattle';
import Pokedex from '@/pages/Pokedex';
import Pokemon from '@/pages/Pokemon';


export default [
	{
		path      : '/',
		component : Home
	},
	{
		path      : '/pokebattle',
		component : PokeBattle
	},
	{
		path      : '/pokedex',
		component : Pokedex
	},

	{
		path      : '/pokemon/:id',
		component : Pokemon
	}
];
