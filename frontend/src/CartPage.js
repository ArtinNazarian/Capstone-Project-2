import React, { useState } from 'react';
import { useShoppingCart } from 'use-shopping-cart';
import { Link } from 'react-router-dom';
import CartProduct from './components/CartProduct';
import CheckoutForm from './forms/CheckoutForm';
import Modal from 'react-modal';

// Bind modal to your appElement (http://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement('#root')

function CartPage() {
    const { cartCount, cartDetails, formattedTotalPrice, totalPrice, clearCart } = useShoppingCart();
    const [showCheckout, setShowCheckout] = useState(false);
    const currency = Object.values(cartDetails)[0]?.currency || 'usd';

    return (
        <div className="container xl:max-w-screen-xl mx-auto py-12 px-20">
            {cartCount > 0 ? (
                <>
                    <h2 className="text-4xl font-semibold">Your shopping cart</h2>
                    <p className="mt-1 text-xl">
                        {cartCount} items{" "}
                        <button className="opacity-50 hover:opacity-100 text-base capitalize " onClick={() => clearCart()}>(Clear all)</button>
                    </p>
                </>
            ) : (
                <>
                    <h2 className="text-4xl font-semibold">
                        Your shopping cart is empty.
                    </h2>
                    <p className="mt-1 text-xl">
                        Check out our awesome products{" "}
                        <Link to="/products" className="text-red-500 underline">here!</Link>
                    </p>
                </>
            )}

            {cartCount > 0 && <div className="mt-12 space-y-4">
                {Object.entries(cartDetails).map(([productId, product]) => (
                    <CartProduct key={productId} product={product} />
                ))}

                <div className="flex flex-col items-end border-t py-4 mt-8">
                    <p className="text-xl">Total:{" "}
                    <span className="font-semibold">{formattedTotalPrice}</span>
                    </p>
                    <button 
                    onClick={() => setShowCheckout(true)} // set showCheckout to true when clicked
                    className="border rounded py-2 px-6 bg-yellow-500 hover:bg-yellow-600 border-yellow-500 hover:border-yellow-600 focus:ring-4 focus:ring-opacity-50 focus:ring-yellow-500 text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-yellow-500 mt-4 max-w-max">
                    Checkout
                </button>
                </div>
                <Modal
                    isOpen={showCheckout}
                    onRequestClose={() => setShowCheckout(false)}
                    style={{
                        overlay: { backgroundColor: 'rgba(0, 0, 0, 0.75)' },
                        content: {
                        color: 'lightsteelblue',
                        width: '50%',
                        height: '50%', 
                        marginLeft: 'auto',
                        marginRight: 'auto',
                        marginTop: 'auto',
                        marginBottom: 'auto'
                        }
                    }}
                    contentLabel="Checkout Modal"
                    >
                    <CheckoutForm amount={totalPrice} currency={currency}/>
                </Modal>
            </div>}
        </div>
    )
}

export default CartPage;

