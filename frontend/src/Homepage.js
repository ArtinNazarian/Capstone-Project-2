import { useState, useEffect } from "react";
import ProductCard from "./components/ProductCard";
import { Link } from "react-router-dom";

export default function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/products`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data.products)) {
          const products = data.products.map((product) => ({
            currency: product.currency,
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
          }));
          setProducts(products);
        } else {
          console.log("Inventory is not an array", data);
        }
      })
      .catch((error) => console.error("Error fetching products", error));
  }, []);

  return (
    <div className="container xl:max-w-screen-xl mx-auto py-12 px-20">
      <div className="text-5xl mb-8 text-center font-weight: 600">
        <h1>Main St. Coffee</h1>
      </div>
      <div className="grid gap-8 xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 ">
        {products.slice(0, 3).map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      <div className="mt-4 text-center">
        <Link to="/products" className="text-lg text-blue-500 hover:underline">
          View All Products
        </Link>
      </div>
    </div>
  );
}
