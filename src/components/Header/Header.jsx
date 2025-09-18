import styles from "./Header.module.css";
import { BiLocationPlus, BiSearch } from "react-icons/bi";
import { BsCart } from "react-icons/bs";
import { FaCaretDown } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useCart } from "../../Context/CartContext"; 
export default function Header() {
  const { state } = useCart(); 
  const cartCount = state.basket.length;

  return (
    <section className={styles.headerWrapper}>
      <div className={styles.topNav}>
        {/* Logo */}
        <Link to="/" className={styles.logo}>
          <img
            src="https://pngimg.com/uploads/amazon/amazon_PNG11.png"
            alt="Amazon Logo"
          />
        </Link>

        {/* Location */}
        <div className={styles.navItem}>
          <BiLocationPlus className={styles.icon} />
          <div className={styles.textBlock}>
            <span className={styles.subText}>Deliver to</span>
            <p className={styles.mainText}>Ethiopia</p>
          </div>
        </div>

        {/* Search */}
        <div className={styles.search}>
          <select className={styles.select}>
            <option>All</option>
            <option>Books</option>
          </select>
          <input
            type="text"
            placeholder="Search Amazon"
            className={styles.input}
          />
          <button className={styles.searchButton}>
            <BiSearch />
          </button>
        </div>

        {/* Language */}
        <div className={styles.navItem}>
          <img
            src="https://flagcdn.com/w40/us.png"
            alt="USA Flag"
            className={styles.flag}
          />
          <span className={styles.languageText}>EN</span>
          <FaCaretDown className={styles.dropdownIcon} />
        </div>

        {/* Account */}
        <Link to="/account" className={styles.navItem}>
          <div className={styles.textBlock}>
            <span className={styles.subText}>Hello, Sign in</span>
            <div className={styles.inlineRow}>
              <p className={styles.mainText}>Account & Lists</p>
              <FaCaretDown className={styles.dropdownIcon} />
            </div>
          </div>
        </Link>

        {/* Orders */}
        <Link to="/orders" className={styles.navItem}>
          <div className={styles.textBlock}>
            <span className={styles.subText}>Returns</span>
            <p className={styles.mainText}>& Orders</p>
          </div>
        </Link>

        {/* Cart */}
        <Link to="/cart" className={styles.navItem}>
          <div className={styles.cartWrapper}>
            <div className={styles.cartIcon}>
              <BsCart />
              <span className={styles.cartCount}>{cartCount}</span>
            </div>
            <p className={styles.mainText}>Cart</p>
          </div>
        </Link>
      </div>
    </section>
  );
}
