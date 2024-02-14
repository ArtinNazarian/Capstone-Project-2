import { Link } from "react-router-dom";
import { useShoppingCart, formatCurrencyString } from "use-shopping-cart";
import { toast } from "react-hot-toast";

export default function ProductCard({ product }) {
  const { addItem } = useShoppingCart();

  function onAddToCart(event) {
    event.preventDefault();
    const id = toast.loading("Adding 1 item...");
    addItem(product);
    toast.success(`${product.name} added`, { id });
  }

  return (
    <Link
      to={`/products/${product.id}`}
      className="border-2 rounded-md overflow-hidden"
    >
      <div className="relative w-full h-64">
        <img
          src={product.image}
          alt={product.name}
          style={{
            objectFit: "contain",
            width: "100%",
            height: "100%",
          }}
        />
      </div>

      <div className="p-6 bg-white">
        <p className="font-semibold text-lg">{product.name}</p>
        <div className="mt-4 flex items-center justify-between space-x-2">
          <div>
            <p className="text-gray-500">Price</p>
            <p className="text-lg font-semibold">
              {formatCurrencyString({
                currency: product.currency,
                value: product.price,
              })}
            </p>
          </div>
          <button
            onClick={onAddToCart}
            className="border rounded-lg py-1 px-4 transition-colors duration-200 ease-in-out 
                    hover:bg-lime-500 hover:text-white"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </Link>
  );
}
