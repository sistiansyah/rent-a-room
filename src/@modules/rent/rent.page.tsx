"use client";
import { createWorkspaceItem } from "@/@helpers/workspace";
import { CartType } from "@/@types/common.type";
import { ProductType, WorkSpaceType } from "@/@types/product.type";
import CheckoutPanel from "@/components/widgets/CheckoutPanel";
import Drawer from "@/components/widgets/Drawer";
import WorkspaceCanvas from "@/components/widgets/WorkspaceCanvas";
import { useState } from "react";
import { FaCartShopping, FaPlus } from "react-icons/fa6";

export default function RentBodyPage() {
    const [showDrawer, setShowDrawer] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [showCheckout, setShowCheckout] = useState(false);
    const [workspaceItems, setWorkspaceItems] = useState<WorkSpaceType[]>([]);
    const [cart, setCart] = useState<CartType>({
        products: [],
        subtotal: 0,
        total_items: 0,
        id: 1,
    });
    const [selected, setSelected] = useState<ProductType | null>(null);
    const [selectedWorkItemId, setSelectedWorkItemId] = useState<string | null>(null);

    /** HANDLER WHEN ITEM IS SELECTED */
    const onSelectItemHandler = (item: ProductType) => {
        setSelected(item);
        /** SINGLE ITEMS (desk / chair) CAN ONLY EXIST ONE PER CATEGORY */
        if (item.product_type === "SINGLE") {
            const sameCategoryProducts = cart.products.filter((product) => {
                return product.product_category_id === item.product_category_id;
            });

            if (sameCategoryProducts.length > 0) {
                setShowModal(true);
                return;
            }

            setCart((prev) => ({
                ...prev,
                products: [...prev.products, { ...item, qty: 1 }],
                total_items: prev.total_items + 1,
                subtotal: prev.subtotal + Number(item.price)
            }));
            setShowDrawer(false);
            setSelected(null);
            setShowModal(false);
            setWorkspaceItems((prev) => ([...prev, createWorkspaceItem(item)]));
        } else {
            onAddItemHandler(item);
        }
    }

    const onConfirmReplaceHandler = () => {
        if (!selected) return;

        const replacedProduct = cart.products.find((product) => product.product_category_id === selected.product_category_id);
        if (!replacedProduct) return;

        const newCartItem = cart.products.filter((product) => product.product_category_id !== selected.product_category_id);
        const newWorkspaceItems = workspaceItems.filter((item) => item.product_id !== replacedProduct.id);
        setCart((prev) => ({
            ...prev,
            products: [...newCartItem, { ...selected, qty: 1 }],
            subtotal: (prev.subtotal - replacedProduct.price) + Number(selected.price)
        }));
        setShowModal(false);
        setSelected(null);
        setShowDrawer(false);
        setWorkspaceItems([...newWorkspaceItems, createWorkspaceItem(selected)]);
    }

    const onAddItemHandler = (item: ProductType) => {
        const currentProducts = new Set<number>(cart.products.map(item => item.id));
        if (currentProducts.has(item.id)) {
            const updatedProducts = cart.products.map((product) => {
                if (product.id === item.id) {
                    return {
                        ...product,
                        qty: product.qty + 1,
                    }
                }
                return product;
            });
            setCart((prev) => ({
                ...prev,
                products: updatedProducts,
                total_items: prev.total_items + 1,
                subtotal: prev.subtotal + Number(item.price)
            }));
        } else {
            setCart((prev) => ({
                ...prev,
                products: [...prev.products, { ...item, qty: 1 }],
                total_items: prev.total_items + 1,
                subtotal: prev.subtotal + Number(item.price)
            }));
        }
        setSelected(null);
        setShowDrawer(false);
        setWorkspaceItems((prev) => ([...prev, createWorkspaceItem(item)]));
    }

    const onCloseDrawer = () => {
        setShowDrawer(false);
    }

    const onDeleteWorkspaceItem = (id: string) => {
        const target = workspaceItems.find((item) => item.id === id);
        if (!target) return;

        const targetecCartItem = cart.products.find((item) => item.id === target.product_id);
        if (!targetecCartItem) return;

        if (targetecCartItem.qty > 1) {
            const newCartItem = cart.products.map((product) => {
                if (product.id === targetecCartItem.id) {
                    return {
                        ...product,
                        qty: product.qty - 1,
                    }
                }
                return product;
            });
            setCart((prev) => ({
                ...prev,
                products: newCartItem,
                total_items: prev.total_items - 1,
                subtotal: prev.subtotal - targetecCartItem.price
            }));
            setWorkspaceItems((prev) => prev.filter((item) => item.id !== id));
        } else {
            const newCartItem = cart.products.filter((product) => product.id !== target.product_id);
            setCart((prev) => ({
                ...prev,
                products: newCartItem,
                total_items: prev.total_items - 1,
                subtotal: prev.subtotal - targetecCartItem.price
            }));
            setWorkspaceItems((prev) => prev.filter((item) => item.id !== id));
        }
    }

    return (
        <main className="w-full h-[100dvh] overflow-hidden bg-white text-[#282828] font-[var(--font-jakarta)] p-8">
            <div className="flex flex-col">
                <h1 className="text-5xl font-extrabold leading-tight tracking-tight">
                    Design Your Workplace
                </h1>
                <p className="text-lg text-[#626262] leading-tight tracking-tight">
                    Create your perfect setup by selecting the furniture that suits your needs and preferences.
                </p>
            </div>
            <div className="canvas">
                <WorkspaceCanvas
                    items={workspaceItems}
                    setItems={setWorkspaceItems}
                    selectedWorkItemId={selectedWorkItemId}
                    setSelectedWorkItemId={setSelectedWorkItemId}
                    onDeleteWorkspaceItem={onDeleteWorkspaceItem}
                />
            </div>
            <Drawer
                onCloseHandler={onCloseDrawer}
                onAddItemHandler={onSelectItemHandler}
                isShow={showDrawer}
            />
            <div className="action-wrapper fixed z-[4] bottom-[24px] right-[24px] flex items-center gap-3">
                <button onClick={() => { setShowDrawer(true); setShowCheckout(false) }}>
                    <span>
                        <FaPlus />
                    </span>
                    <span>ADD ITEM</span>
                </button>
                <button onClick={() => { setShowCheckout(prev => !prev) }}>
                    <span>
                        <FaCartShopping />
                    </span>
                    <span>{`CART (${cart.total_items})`}</span>
                </button>
            </div>
            <CheckoutPanel cart={cart} isShow={showCheckout} />
            {
                showModal && (
                    <div className="warning-modal fixed inset-0 bg-black/80 z-[50] flex items-center justify-center">
                        <div className="warning-modal-panel flex flex-col bg-white p-6 rounded-md w-[400px]">
                            <p className="text-md text-[var(--secondary-text)] mb-6">
                                You already have selected a single item in the product category,
                                please confirm if you want to replace the current one.
                            </p>
                            <div className="flex items-center gap-4 justify-between">
                                <button
                                    className="px-6 py-2 bg-white border border-[var(--soft-border-color)] rounded-md"
                                    onClick={() => { setShowModal(false) }}
                                >
                                    Cancel
                                </button>
                                <button
                                    className="px-6 py-2 bg-black text-white border border-black rounded-md"
                                    onClick={onConfirmReplaceHandler}
                                >
                                    Confirm
                                </button>
                            </div>
                        </div>
                    </div>
                )
            }
        </main>
    );
}