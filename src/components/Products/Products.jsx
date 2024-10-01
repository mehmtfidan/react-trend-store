import { useCallback, useEffect, useState } from "react";
import FormInputs from "../Form/FormInputs.jsx";
import ProductItem from "./ProductItem.jsx";
import "./Products.css";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const productList = products
    .map((product) => (
      <ProductItem key={product.id} product={product}>
        {product.name}
      </ProductItem>
    ))
    .reverse();

  const fetchProductsHandler = useCallback(async function () {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(
        "https://my-pos-application-api.onrender.com/api/products/get-all"
      );

      if (response.status !== 200) {
        throw new Error("Something went wrong!!");
      }

      const data = await response.json();
      const newData = data.map((item) => {
        return {
          id: item._id,
          name: item.title,
          ...item,
        };
      });
      setProducts(newData);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }, []);
  useEffect(() => {
    fetchProductsHandler();
  }, [fetchProductsHandler]);

  let content = <p>Found No Products!!</p>;
  if (products.length > 0) {
    content = productList;
  }
  if (error) {
    content = <p>{error}</p>;
  }
  if (isLoading) {
    content = <p>Loading...</p>;
  }

  return (
    <main className="products-wrapper">
      <FormInputs fetchProductsHandler={fetchProductsHandler} />
      <ul className="products">{content}</ul>
      <button className="button" onClick={fetchProductsHandler}>
        Fetch Products
      </button>
    </main>
  );
};

export default Products;
