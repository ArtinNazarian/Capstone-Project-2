import { Link } from 'react-router-dom';
import { MinusSmallIcon, PlusSmallIcon, XMarkIcon, XCircleIcon } from "@heroicons/react/24/solid";
import { useShoppingCart } from "use-shopping-cart";

export default function CartProduct({ product }) {
    const { setItemQuantity, removeItem } = useShoppingCart()

    return (
        <div className="flex flex-col sm:flex-row justify-between space-x-4 hover:shadow-lg hover:border-opacity-50 border border-opacity-0 rounded-md p-4 bg-white">
            <Link to={`/products/${product.id}`} className="flex items-center space-x-4 group mb-2 sm:mb-0">
                <div className="relative w-20 h-20 group-hover:scale-110 transition-transform">
                    <img 
                        src={product.image} 
                        alt={product.name} 
                        style={{
                            objectFit: 'contain',
                            width: '100%',
                            height: '100%',
                        }}
                    />
                </div>
                <p className="font-semibold text-xl group-hover:underline">{product.name}</p>
            </Link>

            <div className="flex flex-col sm:flex-row items-center">
                <div className="flex items-center space-x-3 mb-2 sm:mb-0">
                    <button onClick={() => setItemQuantity(product.id, product.quantity - 1)} disabled={product.quantity <= 1} className="p-1 rounded-md hover:bg-rose-100 hover:text-rose-500">
                        <MinusSmallIcon className="w-6 h-6 flex-shrink-0" />
                    </button>
                    <p className="font-semibold text-xl">{product.quantity}</p>
                    <button onClick={() => setItemQuantity(product.id, product.quantity + 1)} className="p-1 rounded-md hover:bg-green-100 hover:text-green-500">
                        <PlusSmallIcon className="w-6 h-6 flex-shrink-0" />
                    </button>
                </div>

                <p className="font-semibold text-xl sm:ml-16 mb-2 sm:mb-0">
                    <XMarkIcon className="hidden w-4 h-4 text-gray-500 sm:inline-block mr-4 mb-1" />
                    {product.formattedPrice}
                </p>

                <button onClick={() => removeItem(product.id)} className="sm:ml-4 hover:text-red-500">
                    <XCircleIcon className="w-6 h-6 flex-shrink-0 opacity-50 hover:opacity-100 transition-opacity" />
                </button>
            </div>
        </div>
    )
}
