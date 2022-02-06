import axios from 'axios';

const ROOT_API = process.env.NEXT_PUBLIC_API;
const PROCESS_POKEMON_API = process.env.NEXT_PUBLIC_PROCESS_API;
const PROCESS_API_VERSION = 'api/v1'
const API_VERSION = 'api/v2';


interface RenameTypes {
    renamedCount: string;
    myPokemonName: string;
}

export async function getPokemons() {
    const URL = 'pokemon?limit=20';

    const response = await axios.get(`${ROOT_API}/${API_VERSION}/${URL}`);
    const axiosResponse = response.data.results;
    return axiosResponse;
}


export async function getPokemonDetails(id: string) {
    const URL = `pokemon/${id}`;

    const response = await axios.get(`${ROOT_API}/${API_VERSION}/${URL}`);
    const axiosResponse = response.data;
    return axiosResponse;
}


export async function catchPokemon() {
    const URL = 'pokemon/catch';

    const response = await axios.post(`${PROCESS_POKEMON_API}/${PROCESS_API_VERSION}/${URL}`);
    const axiosResponse = response.data;

    return axiosResponse;
}


export async function releasedPokemon() {
    const URL = 'pokemon/released';

    const response = await axios.post(`${PROCESS_POKEMON_API}/${PROCESS_API_VERSION}/${URL}`);
    const axiosResponse = response.data;

    return axiosResponse;
}

export async function editPokemonName(data: RenameTypes) {
    const URL = 'pokemon/rename';

    const response = await axios({
        url: `${PROCESS_POKEMON_API}/${PROCESS_API_VERSION}/${URL}`,
        method: 'POST',
        data: data,
    });
    const axiosResponse = response.data;

    return axiosResponse;
}
