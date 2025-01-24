import axios from "axios";
import { useEffect, useState } from "react";
import { useFilter } from "../hooks/useFilter";

const Sidebar = () => {
	const { searchQuery, setSearchQuery,
		selectedCategory, setSelectedCategory,
		minPrice, setMinPrice,
		maxPrice, setMaxPrice,
		setKeyword } = useFilter();

	const [categories, setCategories] = useState<string[]>([]);
	const [keywords] = useState<string[]>([
		"apple",
		"watch",
		"fashion",
		"trend",
		"shoes",
		"shirt",
	]);

	useEffect(() => {
		// Fetch categories using Axios
		axios.get("https://dummyjson.com/products/category-list")
			.then((res) => {
				setCategories(res.data); // Set the categories into state
			})
			.catch((error) => {
				console.error("Error fetching categories:", error);
			});
	}, []);

	const handleMinPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		if (value === "") {
			setMinPrice(undefined);
		} else {
			setMinPrice(parseFloat(value));
		}
	};

	const handleMaxPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		if (value === "") {
			setMaxPrice(undefined);
		} else {
			setMaxPrice(parseFloat(value));
		}
	};

	const handleCategoryChange = (category: string) => {
		setSelectedCategory(category); // Update the category state
	};

	const handleKeywordClick = (keyword: string) => {
		setKeyword(keyword);
	};

	const handleResetFilter = () => {
		setSearchQuery("");
		setSelectedCategory("");
		setMinPrice(undefined);
		setMaxPrice(undefined);
		setKeyword("");
	};

	return (
		<div className="w-64 p-5 h-screen">
			<h1 className="text-2xl font-bold mb-10 mt-4">Retrowalk</h1>

			<input
				type="text"
				className="border-2 rounded px-2 py-3 w-full sm:mb-0"
				placeholder="Search Product"
				value={searchQuery}
				onChange={(e) => setSearchQuery(e.target.value)}
			/>

			<div className="flex justify-center mt-3 item-center">
				<input
					type="text"
					className="border-2 mr-2 px-5 py-3 mb-3 w-full"
					placeholder="Min"
					value={minPrice ?? ""}
					onChange={handleMinPriceChange}
				/>
				<input
					type="text"
					className="border-2 mr-2 px-5 py-3 mb-3 w-full"
					placeholder="Max"
					value={maxPrice ?? ""}
					onChange={handleMaxPriceChange}
				/>
			</div>

			<div className="mb-5">
				<h2 className="text-xl font-semibold mb-3">Categories</h2>
				<section>
					{categories.map((category, index) => (
						<label key={index} className="block mb-2">
							<input
								type="radio"
								name="category"
								value={category}
								className="mr-2 w-[16px] h-[16px]"
								onChange={() => handleCategoryChange(category)}
								checked={selectedCategory === category}
							/>
							{category.toUpperCase()}
						</label>
					))}
				</section>
			</div>

			<div className="mb-5">
				<h2 className="text-xl font-semibold mb-3">Keywords</h2>
				<div>
					{keywords.map((keyword, index) => (
						<label key={index} className="block mb-2 px-4 py-2 hover:bg-gray-200 rounded">
							<button
								type="button"
								name="keyword"
								value={keyword}
								className="mr-2 w-[16px] h-[16px]"
								onClick={() => handleKeywordClick(keyword)}
							>{keyword.toUpperCase()}</button>
						</label>
					))}
				</div>
			</div>

			<button
				onClick={handleResetFilter}
				className="w-full mb-[4rem] py-2 bg-black text-white rounded mt-5"
			>
				Reset filters
			</button>
		</div>
	);
};

export default Sidebar;
