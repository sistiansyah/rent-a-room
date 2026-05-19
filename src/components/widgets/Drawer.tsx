"use client";
import { FaX } from "react-icons/fa6";
import { PRODUCT_CATEGORY_LIST } from "@/@consts/dummy";
import { ProductCategoryType, ProductType } from "@/@types/product.type";
import { useState } from "react";
import clsx from "clsx";
import "@/@styles/drawer.styles.css";
import ProductCatalogue from "./ProductCatalogue";

interface DrawerProps {
    isShow: boolean;
    onAddItemHandler: (item: ProductType) => void;
    onCloseHandler: () => void;
}

const Drawer: React.FC<DrawerProps> = ({ onCloseHandler, isShow, onAddItemHandler }) => {
    const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
    const sortedCategory = PRODUCT_CATEGORY_LIST.sort((a, b) => a.name.localeCompare(b.name));

    return (
        <div className={clsx("drawer-wrapper fixed inset-0 bg-black/80 z-[40]", isShow && 'open')}>
            <div className="drawer-panel bg-white absolute top-0 left-0 bottom-0 flex flex-col">
                <div className="drawer-header flex items-center gap-4 justify-between p-4">
                    <h2 className="text-2xl font-extrabold tracking-tighter">Pick Your Item</h2>
                    <button className="text-lg" onClick={onCloseHandler}>
                        <FaX />
                    </button>
                </div>
                <div className="drawer-body py-4 px-8">
                    <ul className="categories flex items-center gap-2 p-3 mb-4 list-none">
                        <li>
                            <button
                                type="button"
                                className={clsx(
                                    "category-item",
                                    selectedCategory === null && 'active'
                                )}
                                onClick={() => { setSelectedCategory(null) }}
                            >
                                All Items
                            </button>
                        </li>
                        {
                            sortedCategory.map((cat: ProductCategoryType) => (
                                <li key={cat.id}>
                                    <button
                                        type="button"
                                        className={clsx(
                                            "category-item",
                                            selectedCategory === cat.id && 'active'
                                        )}
                                        onClick={() => { setSelectedCategory(cat.id) }}
                                    >
                                        {cat.name}
                                    </button>
                                </li>
                            ))
                        }
                    </ul>
                    <ProductCatalogue category_id={selectedCategory} onAddItemHandler={onAddItemHandler} />
                </div>
            </div>
        </div>
    )
}

export default Drawer;