import { useParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Loader from "../../components/Loader/Loader";
import styles from "./Results.module.css";
import { useCart } from "../../Context/CartProvider";

export default function Results() {
  const { categoryName } = useParams();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [triggeredByClick, setTriggeredByClick] = useState(true);
  const { dispatch } = useCart(); // ✅ Access global cart dispatch

  useEffect(() => {
    const handleClick = () => setTriggeredByClick(true);
    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, []);

  useEffect(() => {
    if (triggeredByClick) {
      setLoading(true);
      const timer = setTimeout(() => {
        axios
          .get(`https://fakestoreapi.com/products/category/${categoryName}`)
          .then((res) => {
            setResults(res.data);
            setLoading(false);
            setTriggeredByClick(false);
          })
          .catch((err) => {
            console.log(err);
            setLoading(false);
          });
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [categoryName, triggeredByClick]);

  if (loading) return <Loader />;

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>{categoryName.toUpperCase()}</h2>
      <div className={styles.grid}>
        {results.map((item) => (
          <div key={item.id} className={styles.card}>
            <Link to={`/product/${item.id}`} className={styles.link}>
              <div className={styles.imageWrapper}>
                <img
                  src={item.image}
                  alt={item.title}
                  className={styles.image}
                />
              </div>
              <div className={styles.info}>
                <p className={styles.title}>{item.title}</p>
                <p className={styles.price}>${item.price}</p>
              </div>
            </Link>

            <div className={styles.hoverReveal}>
              <div className={styles.starsWrapper}>
                <div className={styles.stars}>
                  {Array.from({ length: 5 }, (_, i) => (
                    <span
                      key={i}
                      className={
                        i < Math.round(item.rating.rate)
                          ? styles.filledStar
                          : styles.emptyStar
                      }
                    >
                      ★
                    </span>
                  ))}
                </div>
                <span className={styles.ratingValue}>
                  {item.rating.rate} ({item.rating.count})
                </span>
              </div>
              <button
                className={styles.addToCart}
                onClick={() => {
                  dispatch({
                    type: "ADD_TO_BASKET",
                    item: {
                      id: item.id,
                      title: item.title,
                      price: item.price,
                      image: item.image,
                    },
                  });
                  console.log("Added to basket:", item);
                }}
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
