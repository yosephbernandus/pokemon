import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import { getPokemonDetails } from '../../services/pokemon';

export interface PokemonDetailProps {
    id: number;
}

export default function Detail() {
    const { query, isReady } = useRouter();

    const [pokemonDetails, setPokemonDetails] = useState({});

    const getPokemonDetail = useCallback(async (id) => {
        const data = await getPokemonDetails(id);
        setPokemonDetails(data);
    }, []);

    useEffect(() => {
        if (isReady) {
            getPokemonDetail(query.id);
        }
    }, [isReady])

    console.log(pokemonDetails)

    return (
        <div>

        </div>
    )
}
