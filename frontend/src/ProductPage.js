import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  CheckIcon,
  MinusSmallIcon,
  PlusSmallIcon,
} from "@heroicons/react/24/solid";
import { useShoppingCart, formatCurrencyString } from "use-shopping-cart";
import CoffeeApi from "./api";
import { toast } from "react-hot-toast";

export default function ProductPage() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [count, setCount] = useState(1);
  const { addItem } = useShoppingCart();

  useEffect(() => {
    async function fetchProduct() {
      const product = await CoffeeApi.getProduct(productId);
      setProduct(product);
    }
    fetchProduct();
  }, [productId]);

  function onAddToCart(event) {
    event.preventDefault();
    const id = toast.loading(`Adding ${count} item${count > 1 ? "s" : ""}`);
    addItem(product, { count });
    toast.success(`${count} ${product.name} added`, { id });
  }

  if (!product) {
    return "Loading..."; // add a loading state
  }

  return (
    <div className="container xl:max-w-screen-xl mx-auto py-12 px-20">
      <div className="flex flex-col md:flex-row justify-between items-center space-y-8 md:space-y-0 md:space-x-12">
        <div className="relative w-72 h-72 sm:w-96 sm:h-96">
          <img
            src={product.image}
            alt={product.name}
            style={{ objectFit: "contain ", width: "100%", height: "100%" }}
          />
        </div>
        <div className="w-full flex-1 max-w-md border border-opacity-50 rounded-md shadow-lg p-6 bg-white">
          <h2 className="text-3xl font-semibold">{product.name}</h2>
          <p className="pt-2 flex items-center space-x-2">
            <CheckIcon className="text-lime-500 w-5 h-5" />
            <span className="font-semibold">In stock</span>
          </p>

          <div className="mt-4 border-t pt-4">
            <p className="text-gray-500">Price:</p>
            <p className="text-xl font-semibold">
              {formatCurrencyString({
                value: product.price,
                currency: product.currency,
              })}
            </p>
          </div>

          <div className="mt-4 border-t pt-4">
            <p className="text-gray-500">Quantity:</p>
            <div className="mt-1 flex items-center space-x-3">
              <button
                disabled={count <= 1}
                onClick={() => setCount(count - 1)}
                className="p-1 rounded-md hover:bg-rose-100 hover:text-rose-500"
              >
                <MinusSmallIcon className="w-6 h-6 flex-shrink-0" />
              </button>
              <p className="font-semibold text-xl">{count}</p>
              <button
                onClick={() => setCount(count + 1)}
                className="p-1 rounded-md hover:bg-green-100 hover:text-green-500"
              >
                <PlusSmallIcon className="w-6 h-6 flex-shrink-0" />
              </button>
            </div>
          </div>

          <button
            onClick={onAddToCart}
            className="w-full mt-4 border border-lime-500 py-2 px-6 bg-lime-500 hover:bg-lime-600 hover:border-lime-600 focus:ring-4 focus:ring-opacity-50 focus:ring-lime-500 text-white disabled:opacity-50 disabled:cursor-not-allowed rounded-md"
          >
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
}
