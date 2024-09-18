import "./ProductItem.css";
import Rating from "./Rating";

const ProductItem = ({ product }) => {
  const { name, description, img, price } = product;
  return (
    <li className="card">
      <img src={img} alt={name} />
      <h3 className="product-title">{name}</h3>
      <p>{description}</p>
      <Rating />
      <div className="product-info">
        <span className="price">{price}tl</span>
      </div>
      <button className="add-to-cart">Sepete Ekle</button>
    </li>
  );
};

export default ProductItem;
