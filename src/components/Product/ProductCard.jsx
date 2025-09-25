import React from "react";

import { useCart } from "../../Context/CartProvider";
import { ADD_TO_BASKET } from "../../Utility/action-type";
import styles from "./Product.module.css";

function ProductCard({ product }) {
  const { image, title, id, price, description, rating: ratingObj } = product;

  const rating =
    typeof ratingObj === "number" ? ratingObj : ratingObj?.rate || 0;
  const reviews = ratingObj?.count || 0;

  const { dispatch } = useCart();

  const addToCart = () => {
    dispatch({
      type: ADD_TO_BASKET,
      item: { image, title, id, rating, price, description, reviews },
    });
  };

  return (
    <div className={styles.productCard}>
      <img src={image} alt={title} className={styles.productImage} />

      <div className={styles.productInfo}>
        <h3 className={styles.productTitle}>{title}</h3>

        <div className={styles.priceRatingBlock}>
          <span className={styles.price}>${price.toFixed(2)}</span>

          <div className={styles.starBar}>
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                xmlns="http://www.w3.org/2000/svg"
                height="14"
                viewBox="0 0 24 24"
                width="14"
                fill={i < Math.round(rating) ? "#ffa41c" : "#e0e0e0"}
              >
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
              </svg>
            ))}
          </div>

          <div className={styles.ratingMeta}>
            <span className={styles.ratingValue}>{rating.toFixed(1)}</span>
            <span className={styles.reviewCount}>({reviews} reviews)</span>
          </div>
        </div>

        <button onClick={addToCart} className={styles.addToCartBtn}>
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
