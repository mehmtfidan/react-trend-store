import products from "../../productData.js";
import ProductItem from "./ProductItem.jsx";
import "./Products.css";

const Products = () => {
  const productList = products.map((product) => (
    <ProductItem key={product.id} product={product}>{product.name}</ProductItem>
  ));
  return (
    <main className="products-wrapper">
      <ul className="products">{productList}</ul>
    </main>
  );
};

export default Products;
