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
            <div className="detail-box">
                <div className="section-image-box">
                    <img className="image-center" src={`${imageUrl}${id}.svg`} alt={name} width={50} height={50} />
                </div>

                <div className="text-center">
                    <div>{name}</div>
                    <p>
                        # {id}
                    </p>
                </div>
            </div>
        </Link>
    )
}
