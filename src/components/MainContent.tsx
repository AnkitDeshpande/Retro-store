import axios from "axios";
import { Tally3 } from "lucide-react";
import { useEffect, useState } from "react";
import { useFilter } from "../hooks/useFilter";
import Card from "./Card";

const MainContent = () => {
    const {
        searchQuery,
        selectedCategory,
        minPrice,
        maxPrice,
        keyword
    } = useFilter();

    const [products, setProducts] = useState<any[]>([]);
    const [filter, setFilter] = useState<string>('all');
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
    const [itemsPerPage, setItemsPerPage] = useState<number>(12);
    const [totalProducts, setTotalProducts] = useState<number>(0);
    const totalPages = Math.ceil(totalProducts / itemsPerPage);
    const URL = `https://dummyjson.com/products`
    useEffect(() => {
        // fetch products
        let URL = `https://dummyjson.com/products?limit=${itemsPerPage}&skip=${(currentPage - 1) * itemsPerPage}`;

        if (keyword) {
            URL = `https://dummyjson.com/products/search?q=${keyword}`;
        }

        axios.get(URL)
            .then((res) => {
                setProducts(res.data.products);
                setTotalProducts(res.data.total);
                //console.log(data.products);
            }).catch((error) => {
                console.log(error);
            });
    }, [currentPage, keyword, selectedCategory, minPrice, maxPrice, searchQuery]);

    const getFilteredProducts = () => {
        let filteredProducts = [...products];

        if (selectedCategory) {
            filteredProducts = filteredProducts.filter((product) => product.category === selectedCategory);
            //console.log(filteredProducts)
        }

        if (minPrice) {
            filteredProducts = filteredProducts.filter((product) => product.price >= minPrice);
        }

        if (maxPrice) {
            filteredProducts = filteredProducts.filter((product) => product.price <= maxPrice);
        }

        if (searchQuery) {
            filteredProducts = filteredProducts.filter((product) => product.title.toLowerCase().includes(searchQuery.toLowerCase()));
        }

        //console.log(filteredProducts);
        switch (filter) {
            case 'cheap':
                filteredProducts = filteredProducts.sort((a, b) => a.price - b.price);
                break;
            case 'expensive':
                filteredProducts = filteredProducts.sort((a, b) => b.price - a.price);
                break;
            case 'popular':
                filteredProducts = filteredProducts.sort((a, b) => b.rating - a.rating);
                break;
            default:
                return filteredProducts;
        }
        return filteredProducts;
    }

    const handlePageChange = (page: number) => {
        if (page > 0 && page <= Math.ceil(products.length / itemsPerPage)) {
            return setCurrentPage(page);
        }
        setCurrentPage(page);
    }

    const getPaginationButtons = () => {
        const buttons: number[] = [];

        let startPage = Math.max(1, currentPage - 2);
        let endPage = Math.min(totalPages, currentPage + 2);

        if (currentPage <= 2) {
            endPage = Math.min(5, totalPages);
        }

        if (currentPage >= totalPages - 1) {
            startPage = Math.max(totalPages - 4, 1);
        }

        for (let i = startPage; i <= endPage; i++) {
            buttons.push(i);
        }

        return buttons;
    }

    const filteredProducts = getFilteredProducts();
    //console.log(filteredProducts);

    return (
        <section className="xl:w-[55rem] lg:w-[55rem] sm:w-[40rem] xs:w-[20rem] p-5">
            <div className="mb-5">
                <div className="flex flex-col sm:flex-row justify-between items-center">
                    <div className="relative mb-5 mt-5">
                        <button onClick={() => setDropdownOpen(!dropdownOpen)} className="border px-4 py-2 rounded-full flex items-center">
                            <Tally3 className="mr-2" />

                            {filter === 'all' ? 'Filter' : filter.charAt(0).toLowerCase() + filter.slice(1)}
                        </button>

                        {dropdownOpen && (
                            <div className="absolute bg-white border-gray-300 rounded mt-2 w-full sm:w-40">
                                <button onClick={() => setFilter('cheap')} className="block px-4 py-2 w-full text-left hover:bg-gray-200">Cheap</button>
                                <button onClick={() => setFilter('expensive')} className="block px-4 py-2 w-full text-left hover:bg-gray-200">Expensive</button>
                                <button onClick={() => setFilter('popular')} className="block px-4 py-2 w-full text-left hover:bg-gray-200">Popular</button>
                            </div>
                        )}
                    </div>
                </div>

                <div className="grid grid-cols-4 sm:grid-cols3 md:grid-cols-4 gap-5">
                    {/* book card */}
                    {filteredProducts && filteredProducts.map((product) => (
                        //card component
                        <Card
                            key={product.id}
                            id={product.id}
                            title={product.title}
                            image={product.images[0]}
                            price={product.price}
                        />
                    ))}
                </div>


                <div className="flex flex-col sm:flex-row justify-between items-center mt-5">
                    {/* previous button*/}

                    <button
                        className="border px-4 py-2 mx-2 rounded-full"
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                    > previous</button>

                    {/* 1 2 3  4 ... */}
                    <div className="flex flex-wrap justify-center">
                        {/* pagination buttons*/}
                        {getPaginationButtons().map((page) => (
                            <button
                                key={page}
                                className={`border px-4 py-2 mx-2 rounded-full ${currentPage === page ? 'bg-black text-white' : ''}`}
                                onClick={() => handlePageChange(page)}
                            >{page}</button>))}
                    </div>

                    {/* next button */}
                    <button
                        className="border px-4 py-2 mx-2 rounded-full"
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                    > next</button>
                </div>



            </div>
        </section>
    )
}

export default MainContent