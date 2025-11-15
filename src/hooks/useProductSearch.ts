import { useState, useEffect } from "react";
import { fetchProducts } from "@/services/api/productService";

export  function useProductSearch(){
    const [search, setSearch] = useState("");
    const [products, setProducts] = useState<any[]>([]);
    const [debounceValue, setDebounceValue] = useState("");

    useEffect(() => {
        const delay = setTimeout(() => {
            setDebounceValue(search);
        }, 500);
        return () => clearTimeout(delay);
    }, [search]);

    useEffect(() =>{
        if(!debounceValue.trim()){
            setProducts([]);
            return;
        }
        const getProducts = async () => {
            try {
                const res = await fetchProducts({ search: debounceValue });
                setProducts(res.data);
            } catch (error) {
                console.error(error);
                setProducts([]);
            }
        }
        getProducts();
    }, [debounceValue]);
    return {search, setSearch, products, setProducts}
}