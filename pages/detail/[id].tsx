import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import { getPokemonDetails } from '../../services/pokemon';
import { PokemonAbilities, PokemonDetailsTypes, PokemonMoves, PokemonStats, PokemonTypes } from '../../services/data-types';


interface PokemonDetailsProps {
    pokemonDetails: PokemonDetailsTypes;
}


export default function Detail(props: PokemonDetailsProps) {

    const { pokemonDetails } = props;

    return (
        <div className="container mx-auto">
            <h1 className="text-center">{pokemonDetails.name}</h1>

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
