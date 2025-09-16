import React from "react";
import Rating from "@mui/material/Rating";
import CurrencyFormat from "../CurrencyFormat/CurrencyFormat";
import styles from "./Product.module.css";

function ProductCard({ product }) {
  return (
    <div className={styles.productCard}>
      <img
        src={product.image}
        alt={product.title}
        className={styles.productImage}
      />
      <div className={styles.productInfo}>
        <h3>{product.title}</h3>
        <Rating value={product.rating.rate} precision={0.1} readOnly />
        <p className={styles.rating}>({product.rating.count} reviews)</p>
        <CurrencyFormat value={product.price} className={styles.price} />
      </div>
      <button className={styles.addToCartBtn}>Add to Cart</button>
    </div>
  );
}

export default ProductCard;
