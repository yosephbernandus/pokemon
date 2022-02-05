import Link from "next/link";

export interface PokemonItemProps {
    id: number;
    name: string;
    url: string;
}


export default function PokemonItem(props: PokemonItemProps) {
    const { name, url, id } = props;

    const imageUrl = process.env.NEXT_PUBLIC_IMAGE_URL;
    return (
        <Link href={`/detail/${id}`}>
            <div className="max-w-sm rounded overflow-hidden shadow-lg">
                <section className="hero container max-w-screen-lg mx-auto pb-10 flex justify-center">
                    <img className="object-center hover:object-top" src={`${imageUrl}${id}.svg`} alt={name} width={100} height={100} />
                    <div className="px-6 py-4">
                        <div className="font-bold text-xl mb-2">{name}</div>
                        <p className="text-gray-700 text-base">
                            # {id}
                        </p>
                    </div>
                </section>
            </div>
        </Link>
    )
}
