// import products from "../../productData.js";
import { useState } from "react";
import ProductItem from "./ProductItem.jsx";
import "./Products.css";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const productList = products.map((product) => (
    <ProductItem key={product.id} product={product}>
      {product.name}
    </ProductItem>
  ));

  const fetchProductsHandler = async () => {
    setIsLoading(true);
    const response = await fetch(
      "https://my-pos-application-api.onrender.com/api/products/get-all"
    );
    const data = await response.json();

    const newData = data.map((item) => {
      return {
        id: item._id,
        name: item.title,
        ...item,
      };
    });
    setProducts(newData);
    setIsLoading(false);
  };
  return (
    <main className="products-wrapper">
      <ul className="products">{!isLoading && productList}</ul>
      {isLoading && <p>Loading...</p>}
      {!isLoading && products.length === 0 && <p>Found No Products!!</p>}
      <button className="button" onClick={fetchProductsHandler}>
        Fetch Products
      </button>
    </main>
  );
};

export default Products;
