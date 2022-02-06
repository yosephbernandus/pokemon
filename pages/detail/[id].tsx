import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import { catchPokemon, editPokemonName, getPokemonDetails, releasedPokemon } from '../../services/pokemon';
import { PokemonAbilities, PokemonDetailsTypes, PokemonMoves, PokemonStats, PokemonTypes } from '../../services/data-types';
import { route } from 'next/dist/server/router';


interface PokemonDetailsProps {
    pokemonDetails: PokemonDetailsTypes;
}


export default function Detail(props: PokemonDetailsProps) {


    const { pokemonDetails } = props;
    const [pokemonMessage, setPokemonMessage] = useState('');
    const [ownedPokemon, setOwnedPokemon] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [pokemonName, setPokemonName] = useState('');
    const [renamePokemonCount, setRenamePokemonCount] = useState('');
    const [myPokemonName, setMyPokemonName] = useState('');
    const router = useRouter();

    const pokemonCatch = async () => {
        const tryCatchPokemon = await catchPokemon();
        setPokemonMessage(tryCatchPokemon.message);
        if (tryCatchPokemon.code === 'catched') {
            setShowForm(true)
        } else {
            setShowForm(false)
        }
    }

    const submitPokemon = async () => {
        if (!pokemonName) {
            alert('Please enter a name for your pokemon')
        }
        pokemonDetails.my_pokemon_name = pokemonName;
        pokemonDetails.count_edited_name = "";
        if (checkPokemon(pokemonDetails.id)) {
            const pokemonLocalItem = localStorage.getItem('my-pokemon-list');
            const oldPokemonList = pokemonLocalItem ? JSON.parse(pokemonLocalItem) : [];
            if (oldPokemonList) {
                oldPokemonList.push(pokemonDetails);
                localStorage.setItem('my-pokemon-list', JSON.stringify(oldPokemonList));
            } else {
                localStorage.setItem('my-pokemon-list', JSON.stringify([pokemonDetails]));
            }
            router.push("/my-pokemon")
        }
    }

    const renamePokemon = async () => {
        if (!myPokemonName) {
            alert('Please enter a name for your pokemon')
        }

        let renamedCount;
        if (!renamePokemonCount) {
            // Name pokemon not renamed, from first catch
            renamedCount = "0";
        } else {
            renamedCount = renamePokemonCount;
        }

        const data = {
            renamedCount,
            myPokemonName
        }

        const response = await editPokemonName(data);
        const pokemonLocalItem = localStorage.getItem('my-pokemon-list');
        const pokemonItem = JSON.parse(pokemonLocalItem!);
        for (let i = 0; i < pokemonItem.length; i++) {
            if (pokemonItem[i].id == pokemonDetails.id) {
                pokemonItem[i].my_pokemon_name = response.pokemonName
                pokemonItem[i].count_edited_name = response.renamedCount
                break;
            }
        }
        localStorage.setItem('my-pokemon-list', JSON.stringify(pokemonItem));
        router.push("/my-pokemon")
    }

    const released = async () => {
        const tryReleasedPokemon = await releasedPokemon();
        if (tryReleasedPokemon.code === 'released') {
            const pokemonLocalItem = localStorage.getItem('my-pokemon-list');
            const oldPokemonList = pokemonLocalItem ? JSON.parse(pokemonLocalItem) : [];
            const pokemons = oldPokemonList.filter((item: PokemonDetailsTypes) => item.id !== pokemonDetails.id)
            localStorage.setItem('my-pokemon-list', JSON.stringify(pokemons));
            router.push("/")
        }
        setPokemonMessage(tryReleasedPokemon.message);
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
        if (pokemonLocalItem) {
            const pokemonItem = JSON.parse(pokemonLocalItem!);
            if (pokemonItem.filter((item: PokemonDetailsTypes) => item.id === pokemonDetails.id).length > 0) {
                setOwnedPokemon(true);
                setMyPokemonName(pokemonItem[0].my_pokemon_name);
                setRenamePokemonCount(pokemonItem[0].count_edited_name);
            }
        }
    }, []);


    return (
        <div className="container mx-auto">
            <div className="grid grid-cols-1 content-center">

                {ownedPokemon ? (
                    <>
                        <button
                            className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                            onClick={released}
                        >
                            Released
                        </button>

                        <div className="w-full max-w-xs">
                            <form className="bg-white rounded px-8 pt-6 pb-8 mb-4">
                                <div className="mb-4">
                                    <label>Rename Pokemon</label>
                                    <input
                                        placeholder="Pokemon Name"
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        id="pokemon_name"
                                        type="text"
                                        value={myPokemonName}
                                        onChange={(event) => setMyPokemonName(event.target.value)}
                                    />
                                </div>
                                <div className="flex items-center justify-between">
                                    <button
                                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                        type="button"
                                        onClick={renamePokemon}
                                    >
                                        Submit
                                    </button>
                                </div>
                            </form>
                        </div>
                    </>
                ) : (
                    <>
                        <button
                            className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                            onClick={pokemonCatch}
                        >
                            Catch
                        </button>

                        {showForm ? (
                            <div className="w-full max-w-xs">
                                <form className="bg-white rounded px-8 pt-6 pb-8 mb-4">
                                    <div className="mb-4">
                                        <input
                                            placeholder="Pokemon Name"
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            id="pokemon_name"
                                            type="text"
                                            value={pokemonName}
                                            onChange={(event) => setPokemonName(event.target.value)}
                                        />
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <button
                                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                            type="button"
                                            onClick={submitPokemon}
                                        >
                                            Submit
                                        </button>
                                    </div>
                                </form>
                            </div>
                        ) : ""}
                    </>
                )}

                <h1 className="text-center">{pokemonDetails.name}</h1>
                {ownedPokemon ? (
                    <p className="text-center text-gray-500 text-xs">Owned by me, name: {myPokemonName}</p>
                ) : ""}

                <p>{pokemonMessage}</p>
                <div>
                    <h1>Abilities</h1>
                    <div className="span-box">
                        {pokemonDetails.abilities.map((item: PokemonAbilities, index) => (
                            <span className="abilities-tag" key={index}>#{item.ability.name}</span>
                        ))}
                    </div>
                </div>

                <div>
                    <h1>Move</h1>
                    <div className="span-box">
                        {pokemonDetails.moves.map((item: PokemonMoves, index) => (
                            <span className="move-tag" key={index}>#{item.move.name}</span>
                        ))}
                    </div>
                </div>

                <div>
                    <h1>Types</h1>
                    <div className="span-box">
                        {pokemonDetails.types.map((item: PokemonTypes, index) => (
                            <span className="types-tag" key={index}>#{item.type.name}</span>
                        ))}
                    </div>
                </div>

                <div>
                    <h1>Stats</h1>
                    {pokemonDetails.stats.map((item: PokemonStats, index) => (
                        <div key={index}>
                            <p>{item.stat.name}</p>
                            <div className="w-full bg-gray-200 h-1 mb-6">
                                <div className="bg-blue-400 h-1" style={{ width: `${item.base_stat}%` }}></div>
                            </div>
                        </div>
                    ))}
                </div>
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
