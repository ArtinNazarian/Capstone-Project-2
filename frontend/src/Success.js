import { useEffect, useRef } from "react";
import { useShoppingCart } from "use-shopping-cart";
import { FaCheckCircle } from 'react-icons/fa';

export default function SuccessPage() {
  const { clearCart } = useShoppingCart();
  const clearedCart = useRef(false); // using useRef to persist this value across re-renders

  useEffect(() => {
    if (!clearedCart.current) { // only clear the cart if it has not been cleared before
      clearCart();
      clearedCart.current = true; // set clearedCart to true after clearing the cart
    }
  }, [clearCart]);

  return (
    <div className="container xl:max-w-screen-xl mx-auto py-12 px-6 text-center">
      <div className="py-4 px-8 space-y-4 rounded-md max-w-lg mx-auto mt-20">
        <FaCheckCircle className="w-24 h-24 mx-auto flex-shrink-0 text-lime-600" />
        <h2 className="text-4xl font-semibold flex flex-col items-center space-x-1">
          Thanks for your order!
        </h2>
        <p className="text-lg">Your receipt has been emailed to you.</p>
      </div>
    </div>
  );
}
