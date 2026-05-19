import { LoggerType, StatusType } from "./common.type";

export type ProductCategoryType = {
    id: number;
    name: string;
    description: string;
}

export type ProductType = {
    id: number;
    name: string;
    description: string;
    product_category_id: number;
    product_category: ProductCategoryType;
    thumbnail: string;
    status: StatusType;
    stock: number;
    price: number;
    render_width: number;
    render_height: number;
    product_type: "SINGLE" | "MULTIPLE";
}

export type WorkSpaceType = {
    id: string;
    product_id: number;
    x: number;
    y: number;
    width: number;
    height: number;
    rotation: number;
    thumbnail: string;
    name: string;
}