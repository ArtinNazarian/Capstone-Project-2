import { useState, useEffect } from "react";
import SearchForm from "../forms/SearchForm";
import CoffeeApi from "../api";
import ProductCard from "./ProductCard";

/** Show page with list of products.
 *
 * On mount, loads products from API.
 * Re-loads filtered products on submit from search form.
 *
 * This is routed to at /products
 *
 * Routes -> { ProductCard, SearchForm }
 */

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(function getProductsOnMount() {
    console.debug("ProductList useEffect getProductsOnMount");
    search();
  }, []);

  /** Triggered by search form submit; reloads products. */
  async function search(searchTerm = "") {
    try {
      let products = await CoffeeApi.getProducts(searchTerm);
      console.log("Products from API:", products); // Debugging line
      setProducts(products);
      setIsLoading(false);
    } catch (err) {
      console.error("Failed to fetch products:", err);
    }
  }

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container xl:max-w-screen-xl mx-auto py-12 px-20">
      <SearchForm searchFor={search} />
      {products.length ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      ) : (
        <p className="text-center text-xl text-gray-500">
          Sorry, no results were found!
        </p>
      )}
    </div>
  );
};

export default ProductList;
