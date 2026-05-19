import { ProductType, WorkSpaceType } from "@/@types/product.type";

export const createWorkspaceItem = (item: ProductType): WorkSpaceType => {
    return {
        id: crypto.randomUUID(),
        product_id: item.id,
        x: 100,
        y: 100,
        width: item.render_width,
        height: item.render_height,
        rotation: 0,
        thumbnail: item.thumbnail,
        name: item.name,
    }
}