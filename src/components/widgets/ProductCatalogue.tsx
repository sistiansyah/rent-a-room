"use client";
import { PRODUCT_CATEGORY_LIST, PRODUCT_LIST } from "@/@consts/dummy";
import { ProductCategoryType, ProductType } from "@/@types/product.type";
import ProductCard from "../cards/ProductCard";
import { useEffect, useState } from "react";

interface ProductCatalogueProps {
    category_id: number | null;
    onAddItemHandler: (item: ProductType) => void;
}

const ProductCatalogue = ({ category_id, onAddItemHandler }: ProductCatalogueProps) => {
    const [products, setProducts] = useState<ProductType[]>(PRODUCT_LIST);

    useEffect(() => {
        if (category_id) {
            const filtered = PRODUCT_LIST.filter((product) => {
                return product.product_category_id === category_id;
            });
            setProducts(filtered);
        } else {
            setProducts(PRODUCT_LIST);
        }
    }, [category_id]);

    return (
        <div className="grid grid-cols-1 gap-x-6 gap-y-10 items-start md:grid-cols-2">
            {products.map((product: ProductType) => (
                <ProductCard key={product.id} product={product} onAddItemHandler={onAddItemHandler} />
            ))}
        </div>
    )
}

export default ProductCatalogue;