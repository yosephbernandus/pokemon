export interface PokemonItemTypes {
    id: string;
    name: string;
    url: string;
}


export interface PokemonAbility {
    name: string;
}

export interface PokemonAbilities {
    ability: PokemonAbility;
}

export interface PokemonMove {
    name: string;
}

export interface PokemonMoves {
    move: PokemonMove;
}

export interface PokemonType {
    name: string;
}

export interface PokemonTypes {
    type: PokemonType;
}

export interface PokemonStat {
    name: string;
}

export interface PokemonStats {
    base_stat: number;
    stat: PokemonStat;
}

export interface PokemonDetailsTypes {
    id: string;
    name: string;
    abilities: PokemonAbilities[];
    moves: PokemonMoves[];
    types: PokemonTypes[];
    stats: PokemonStats[];
}
