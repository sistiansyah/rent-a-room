import { ProductType } from "./product.type";

export type LoggerType = {
    created_by?: string;
    created_at?: string;
    updated_by?: string;
    updated_at?: string;
}

export type StatusType = "ACTIVE" | "INACTIVE";

export type CartType = {
    id: number;
    products: (ProductType & { qty: number })[];
    total_items: number;
    subtotal: number;
}