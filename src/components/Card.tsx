import { Link } from "react-router"
import CardType from "../types/CardType"

const Card = ({ id, title, image, price }: CardType) => {
    return (
        <div className="border p-4 rounded">
            <Link to={`/product/${id}`}>
                <img
                    src={image}
                    alt={title}
                    className="w-full h-32 object-cover mb-2"
                />

                <h1 className="text-sm font-bold">{title}</h1>
                <p className="text-xs text-gray-500">${price}</p>
            </Link>
        </div>
    )
}

export default Card