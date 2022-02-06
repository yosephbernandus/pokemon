import { PokemonItemTypes } from '../services/data-types';
import PokemonItem from '../components/molecules/PokemonItem';
import { useEffect, useState } from "react";


export default function MyPokemon() {

    const [pokemonList, setPokemonList] = useState([]);

    useEffect(() => {
        const pokemonLocalItem = localStorage.getItem('my-pokemon-list');
        const pokemonItem = JSON.parse(pokemonLocalItem!);
        setPokemonList(pokemonItem);
    }, []);


    return (
        <div className="container mx-auto">
            <div className="grid grid-cols-4 gap-4 content-center">
                {pokemonList.map((pokemon: PokemonItemTypes) => (
                    <PokemonItem
                        id={parseInt(pokemon.id)}
                        name={pokemon.name}
                        url={pokemon.url}
                    />
                ))}
            </div>
        </div>
    )
}
