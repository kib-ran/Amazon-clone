import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Category.module.css";

export default function CategoryTiles() {
  const [tiles, setTiles] = useState([]);

  useEffect(() => {
    const categories = [
      "electronics",
      "jewelery",
      "men's clothing",
      "women's clothing",
    ];

    Promise.all(
      categories.map((cat) =>
        axios
          .get(`https://fakestoreapi.com/products/category/${cat}`)
          .then((res) => ({
            name: cat,
            label: cat.charAt(0).toUpperCase() + cat.slice(1),
            image: res.data[0]?.image || "",
          }))
      )
    ).then(setTiles);
  }, []);

  return (
    <div className={styles.grid}>
      {tiles.map(({ name, label, image }) => (
        <Link to={`/category/${name}`} key={name} className={styles.card}>
          <img src={image} alt={label} className={styles.image} />
          <div className={styles.text}>
            <h3>{label}</h3>
            <span>Shop now</span>
          </div>
        </Link>
      ))}
    </div>
  );
}
