import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import { catchPokemon, getPokemonDetails } from '../../services/pokemon';
import { PokemonAbilities, PokemonDetailsTypes, PokemonMoves, PokemonStats, PokemonTypes } from '../../services/data-types';


interface PokemonDetailsProps {
    pokemonDetails: PokemonDetailsTypes;
}


export default function Detail(props: PokemonDetailsProps) {


    const { pokemonDetails } = props;
    const [pokemonMessage, setPokemonMessage] = useState('');
    const [ownedPokemon, setOwnedPokemon] = useState(false);

    const onSubmitCatch = async () => {
        const tryCatchPokemon = await catchPokemon();
        if (tryCatchPokemon.code === 'catched') {
            console.log(tryCatchPokemon)
            if (checkPokemon(pokemonDetails.id)) {
                console.log(tryCatchPokemon)
                const pokemonLocalItem = localStorage.getItem('my-pokemon-list');
                const oldPokemonList = pokemonLocalItem ? JSON.parse(pokemonLocalItem) : [];
                if (oldPokemonList) {
                    oldPokemonList.push(pokemonDetails);
                    console.log(oldPokemonList)
                    localStorage.setItem('my-pokemon-list', JSON.stringify(oldPokemonList));
                } else {
                    localStorage.setItem('my-pokemon-list', JSON.stringify([pokemonDetails]));
                }
            }
        }
        setPokemonMessage(tryCatchPokemon.message);
    }

    const onSubmitReleased = async () => {
        console.log('released')
    }

    const checkPokemon = (id: string) => {
        const pokemonLocalItem = localStorage.getItem('my-pokemon-list');
        if (!pokemonLocalItem) {
            return true
        }
        const pokemonItem = JSON.parse(pokemonLocalItem!);
        if (pokemonItem.filter((item: PokemonDetailsTypes) => item.id === id).length > 0) {
            return false
        } else {
            return true
        }
    }

    useEffect(() => {
        const pokemonLocalItem = localStorage.getItem('my-pokemon-list');
        const pokemonItem = JSON.parse(pokemonLocalItem!);
        if (pokemonItem.filter((item: PokemonDetailsTypes) => item.id === pokemonDetails.id).length > 0) {
            setOwnedPokemon(true);
        }
    }, []);

    console.log(ownedPokemon)
    return (
        <div className="container mx-auto">

            {ownedPokemon ? (
                <button
                    className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                    onClick={onSubmitReleased}
                >
                    Released
                </button>
            ) : (
                <button
                    className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                    onClick={onSubmitCatch}
                >
                    Catch
                </button>
            )}

            <h1 className="text-center">{pokemonDetails.name}</h1>

            <p>{pokemonMessage}</p>
            <div>
                <h1>Abilities</h1>
                {pokemonDetails.abilities.map((item: PokemonAbilities) => (
                    <p>#{item.ability.name}</p>
                ))}
            </div>

            <div>
                <h1>Move</h1>
                {pokemonDetails.moves.map((item: PokemonMoves) => (
                    <p>#{item.move.name}</p>
                ))}
            </div>

            <div>
                <h1>Types</h1>
                {pokemonDetails.types.map((item: PokemonTypes) => (
                    <p>#{item.type.name}</p>
                ))}
            </div>

            <div>
                <h1>Stats</h1>
                {pokemonDetails.stats.map((item: PokemonStats) => (
                    <div>
                        <p>{item.stat.name}</p>
                        <p>{item.base_stat}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}


interface getServerSideProps {
    params: {
        id: string;
    }
}

export async function getServerSideProps({ params }: getServerSideProps) {
    const response = await getPokemonDetails(params.id);
    const pokemonDetails = {
        id: params.id,
        name: response.name,
        abilities: response.abilities,
        moves: response.moves,
        types: response.types,
        stats: response.stats,
    }

    return {
        props: {
            pokemonDetails: pokemonDetails
        }
    }
}
