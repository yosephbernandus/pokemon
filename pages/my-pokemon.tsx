import { PokemonItemTypes } from '../services/data-types';
import PokemonItem from '../components/molecules/PokemonItem';
import { useEffect, useState } from "react";
import Link from 'next/link';


export default function MyPokemon() {

    const [pokemonList, setPokemonList] = useState([]);

    useEffect(() => {
        const pokemonLocalItem = localStorage.getItem('my-pokemon-list');
        const pokemonItem = JSON.parse(pokemonLocalItem!);
        setPokemonList(pokemonItem);
    }, []);


    return (
        <div className="container mx-auto">
            <nav className="bg-white border-gray-200 px-2 sm:px-4 py-2.5 rounded dark:bg-gray-800 content-center">
                <div className="container flex flex-wrap justify-between items-center mx-auto">
                    <ul className="flex mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium">
                        <Link href="/">
                            <a className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:dark:hover:text-white dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">List Pokemon</a>
                        </Link>

                        <Link href="/my-pokemon">
                            <a className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:dark:hover:text-white dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">My Pokemon</a>
                        </Link>
                    </ul>
                </div>
            </nav>
            <div className="grid grid-cols-2 gap-4 content-center">
                {pokemonList ? pokemonList.map((pokemon: PokemonItemTypes) => (
                    <PokemonItem
                        key={pokemon.id}
                        id={parseInt(pokemon.id)}
                        name={pokemon.name}
                        url={pokemon.url}
                    />
                )) : ""}
            </div>
        </div>
    )
}
