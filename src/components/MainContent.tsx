import axios from "axios";
import { Tally3 } from "lucide-react";
import { useEffect, useState } from "react";
import { useFilter } from "../hooks/useFilter";
import Product from "../types/Product";
import Card from "./Card";

const MainContent = () => {
    const {
        searchQuery,
        selectedCategory,
        minPrice,
        maxPrice,
        keyword,
    } = useFilter();

    const [products, setProducts] = useState<Product[]>([]);
    const [filter, setFilter] = useState<string>("all");
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
    const [itemsPerPage, setItemsPerPage] = useState<number>(12);
    const [totalProducts, setTotalProducts] = useState<number>(0);
    const totalPages = Math.ceil(totalProducts / itemsPerPage);

    useEffect(() => {
        applyFilters();
    }, [selectedCategory, currentPage, itemsPerPage, keyword, minPrice, maxPrice, filter]);

    const applyFilters = () => {
        let apiURL = "";

        // If the selected category is 'all', fetch all products
        if (selectedCategory === "all" || !selectedCategory) {
            apiURL = `https://dummyjson.com/products?limit=${itemsPerPage}&skip=${(currentPage - 1) * itemsPerPage
                }`;
        } else {
            // Fetch products from the selected category
            apiURL = `https://dummyjson.com/products/category/${selectedCategory}?limit=${itemsPerPage}&skip=${(currentPage - 1) * itemsPerPage
                }`;
        }

        if (keyword) {
            apiURL += `&q=${keyword}`;
        }

        if (minPrice !== undefined) {
            apiURL += `&minPrice=${minPrice}`;
        }

        if (maxPrice !== undefined) {
            apiURL += `&maxPrice=${maxPrice}`;
        }

        switch (filter) {
            case "cheap":
                apiURL += `&sortBy=price&order=asc`;
                break;
            case "expensive":
                apiURL += `&sortBy=price&order=desc`;
                break;
            case "popular":
                apiURL += `&sortBy=rating&order=desc`;
                break;
            default:
                break;
        }

        axios
            .get(apiURL)
            .then((res) => {
                setProducts(res.data.products);
                setTotalProducts(res.data.total);
            })
            .catch((error) => {
                console.error("Error fetching filtered products:", error);
            });
    };

    const handlePageChange = (page: number) => {
        if (page > 0 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

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
    };

    return (
        <section className="xl:w-[55rem] mr-[10rem] lg:w-[55rem] sm:w-[40rem] xs:w-[20rem] p-5">
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
                    {products.length > 0 ? (
                        products.map((product) => (
                            <Card
                                key={product.id}
                                id={product.id}
                                title={product.title}
                                image={product.images[0]}
                                price={product.price}
                            />
                        ))
                    ) : (
                        <div>No products found</div>
                    )}
                </div>

                <div className="flex flex-col sm:flex-row justify-between items-center mt-5">
                    <button
                        className="border px-4 py-2 mx-2 rounded-full"
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                    >
                        Previous
                    </button>

                    <div className="flex flex-wrap justify-center">
                        {getPaginationButtons().map((page) => (
                            <button
                                key={page}
                                className={`border px-4 py-2 mx-2 rounded-full ${currentPage === page ? "bg-black text-white" : ""
                                    }`}
                                onClick={() => handlePageChange(page)}
                            >
                                {page}
                            </button>
                        ))}
                    </div>

                    <button
                        className="border px-4 py-2 mx-2 rounded-full"
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                    >
                        Next
                    </button>
                </div>
            </div>
        </section>
    );
};

export default MainContent;
