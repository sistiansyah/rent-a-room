import { ProductType } from "@/@types/product.type"
import { printIDR } from "@/@helpers/Formatter";
import { FaCartShopping } from "react-icons/fa6";
import Image from "next/image";
import "@/@styles/card.styles.css";

interface ProductCardProps {
    product: ProductType;
    onAddItemHandler: (item: ProductType) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
    product,
    onAddItemHandler
}) => {
    return (
        <div className="product-card h-full flex flex-col">
            <div className="product-card-image">
                <div className="product-card-action">
                    <button type="button" onClick={() => { onAddItemHandler(product) }}>
                        <FaCartShopping />
                    </button>
                </div>
                {product.thumbnail != '' && <Image src={product.thumbnail} width={240} height={240} alt={`image-${product.name}`} />}
            </div>
            <div className="product-card-body flex flex-col flex-1">
                <h3 className="mb-1">
                    {product.name}
                </h3>
                <p className="mb-2 flex-1">{product.description}</p>
                <h4>{printIDR(product.price)}<span>/month</span></h4>
            </div>
        </div>
    )
}

export default ProductCard;