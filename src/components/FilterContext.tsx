import { createContext, FC, ReactNode, useState } from "react";
import FilterContextType from "../types/FilterContextType";

export const FilterContext = createContext<FilterContextType | undefined>(undefined);

export const FilterContextProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [selectedCategory, setSelectedCategory] = useState<string>("");
    const [minPrice, setMinPrice] = useState<number | undefined>(undefined);
    const [maxPrice, setMaxPrice] = useState<number | undefined>(undefined);
    const [keyword, setKeyword] = useState<string>("");

    return (
        <FilterContext.Provider value={{
            searchQuery, setSearchQuery,
            selectedCategory, setSelectedCategory,
            minPrice, setMinPrice,
            maxPrice, setMaxPrice,
            keyword, setKeyword
        }}>
            {children}
        </FilterContext.Provider>
    );
}