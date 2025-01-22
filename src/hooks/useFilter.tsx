import { useContext } from "react";
import { FilterContext } from "../components/FilterContext";

export const useFilter = () => {
    const context = useContext(FilterContext);
    if (context === undefined) {
        throw new Error("useFilter must be used within a FilterContextProvider");
    }
    return context;
}