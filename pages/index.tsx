import type { NextPage } from 'next'
import { useCallback, useEffect, useState } from "react";
import { getPokemons } from "../services/pokemon";
import PokemonItem from '../components/molecules/PokemonItem';
import { PokemonItemTypes } from '../services/data-types';
import Image from "next/image";


const Home: NextPage = () => {
	const [pokemonList, setPokemonList] = useState([]);

	const getPokemonList = useCallback(async () => {
		const data = await getPokemons();
		setPokemonList(data);
	}, [getPokemons]);

	useEffect(() => {
		getPokemonList();
	}, [])


	return (
		<div className="grid grid-cols-4 gap-4 content-center">
			{pokemonList.map((pokemon: PokemonItemTypes, index) => (
				<PokemonItem
					id={index + 1}
					key={index}
					name={pokemon.name}
					url={pokemon.url}
				/>
			))}
		</div>
	)
}

export default Home
