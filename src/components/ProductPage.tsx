import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import Product from "../types/Product";

const ProductPage = () => {
    const { id } = useParams<{ id: string }>()
    const navigate = useNavigate();
    const [product, setProduct] = useState<Product | null>(null);

    useEffect(() => {
        // Fetch product by id
        // If product not found, navigate to 404 page
        // Set product to state

        if (id) {
            axios.get(`https://dummyjson.com/products/${id}`)
                .then((res) => { setProduct(res.data) })
                .catch(() => { navigate('/404') })
            setProduct(product)
        }
    }, [id]);

    if (!product) {
        return <div>Loading...</div>
    }

    return (
        <div className="p-5 w-[60%]">
            <button onClick={() => navigate(-1)} className="mb-5 px-4 py-3 bg-black text-white rounded">Back</button>
            <img src={product.images[0]} alt={product.title} className="w-[50%] h-auto mb-5" />
            <h1 className="text-2xl mb-4 font-bold">{product.title}</h1>
            <p className="mb-4 text-gray-700 w-[70%]">{product.description}</p>
            <div className="flex">
                <p className="text-gray-500 text-sm">${product.price}</p>
                <p className="ml-10 text-gray-500 text-sm">Rating: {product.rating}</p>
            </div>
        </div >
    )
}

export default ProductPage