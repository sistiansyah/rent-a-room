import { printIDR } from "@/@helpers/Formatter";
import { CartType } from "@/@types/common.type";
import { ProductType } from "@/@types/product.type";

interface CheckoutPanelProps {
    cart: CartType;
    isShow: boolean;
}

const CheckoutPanel: React.FC<CheckoutPanelProps> = ({ cart, isShow }) => {
    return (
        <div className={`checkout-panel fixed right-[24px] bottom-[100px] z-[45] bg-white ${isShow ? 'show' : ''}`}>
            {
                cart.products.length == 0 ?
                    <p>Empty Cart. please add items</p> :
                    (
                        <>
                            <h2>Summary</h2>
                            <table className="mb-8">
                                <thead>
                                    <tr>
                                        <th>Qty</th>
                                        <th>Item</th>
                                        <th>&nbsp;</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        cart.products.map((item) => {
                                            const productPrice = Number(item.price) * Number(item.qty);
                                            return (
                                                <tr key={item.id}>
                                                    <td>
                                                        {item.qty}
                                                    </td>
                                                    <td>
                                                        {item.name}
                                                    </td>
                                                    <td className="text-right">
                                                        {printIDR(productPrice)}
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }
                                    <tr>
                                        <td colSpan={2} className="text-right font-extrabold!">
                                            {`Subtotal (${cart.total_items} items)`}
                                        </td>
                                        <td className="text-right font-extrabold!">
                                            {printIDR(cart.subtotal)}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <button className="w-full h-[48px] bg-[#000] text-white rounded-md text-lg font-bold">
                                Checkout
                            </button>
                        </>
                    )
            }
        </div>
    )
}

export default CheckoutPanel;