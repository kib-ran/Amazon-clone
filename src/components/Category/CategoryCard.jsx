import { Link } from "react-router-dom";
import styles from "./Category.module.css";

export default function CategoryCard({ name, label, image }) {
  return (
    <Link to={`/category/${name}`} className={styles.card}>
      <img src={image} alt={label} className={styles.image} />
      <div className={styles.text}>
        <h3>{label}</h3>
        <span>Shop now</span>
      </div>
    </Link>
  );
}
