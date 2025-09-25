import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import styles from "./ProductDetail.module.css";
import { useCart } from "../../Context/CartProvider";
export default function ProductDetail() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const { dispatch } = useCart();
  useEffect(() => {
    axios
      .get(`https://fakestoreapi.com/products/${productId}`)
      .then((res) => setProduct(res.data))
      .catch((err) => console.log(err));
  }, [productId]);

  if (!product) return <p>Loading...</p>;

  return (
    <div className={styles.container}>
      <Link to={`/category/${product.category}`} className={styles.back}>
        ← Back to {product.category}
      </Link>

      <div className={styles.card}>
        <img src={product.image} alt={product.title} className={styles.image} />
        <div className={styles.info}>
          <h2 className={styles.title}>{product.title}</h2>
          <p className={styles.description}>{product.description}</p>
          <p className={styles.price}>${product.price}</p>
          <p className={styles.rating}>
            ⭐ {product.rating.rate} ({product.rating.count} reviews)
          </p>
          <button
            className={styles.addToCart}
            onClick={() => {
              dispatch({
                type: "ADD_TO_BASKET",
                item: {
                  id: product.id,
                  title: product.title,
                  price: product.price,
                  image: product.image,
                },
              });
              console.log("Added to basket:", product);
            }}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
