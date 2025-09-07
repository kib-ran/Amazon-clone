import React from "react";
import styles from "./Header.module.css";
import { SlLocationPin } from "react-icons/sl";
import { BiSearch } from "react-icons/bi";
import { AiOutlineDown } from "react-icons/ai";
import { BsCart3 } from "react-icons/bs";

function Header() {
  return (
    <header className={styles.header}>
      {/* Left: Logo + Delivery */}
      <div className={styles.left}>
        <a href="/" className={`${styles.logo} ${styles.hoverBox}`}>
          <img
            src="https://pngimg.com/uploads/amazon/amazon_PNG11.png"
            alt="Amazon Logo"
          />
        </a>
        <div className={`${styles.delivery} ${styles.hoverBox}`}>
          <SlLocationPin className={styles.icon} />
          <div>
            <p>Deliver to</p>
            <span>Ethiopia</span>
          </div>
        </div>
      </div>

      {/* Center: Search Bar */}
      <div className={styles.search}>
        <select>
          <option value="all">All</option>
        </select>
        <input type="text" placeholder="Search Amazon" />
        <BiSearch className={styles.searchIcon} />
      </div>

      {/* Right: Language + Account + Orders + Cart */}
      <div className={styles.right}>
        <div className={`${styles.language} ${styles.hoverBox}`}>
          <img
            src="https://upload.wikimedia.org/wikipedia/en/a/a4/Flag_of_the_United_States.svg"
            alt="US Flag"
          />
          <select>
            <option value="en">EN</option>
          </select>
        </div>

        <div className={`${styles.account} ${styles.hoverBox}`}>
          <p>Hello, Kibran</p>
          <span>Account & Lists</span>
          <AiOutlineDown className={styles.accountArrow} />
        </div>

        <div className={`${styles.orders} ${styles.hoverBox}`}>
          <span>Returns</span>
          <p>& Orders</p>
        </div>

        <div className={`${styles.cart} ${styles.hoverBox}`}>
          <BsCart3 />
          <span>Cart (0)</span>
        </div>
      </div>
    </header>
  );
}

export default Header;
