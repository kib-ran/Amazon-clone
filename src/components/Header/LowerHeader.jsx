import React from "react";
import styles from "./LowerHeader.module.css";
import { IoMenuSharp } from "react-icons/io5";

function LowerHeader() {
  return (
    <nav className={styles.lowerHeader}>
      <ul className={styles.navList}>
        <li className={`${styles.navItem} ${styles.hoverBox}`}>
          <IoMenuSharp className={styles.menuIcon} />
          <p>All</p>
        </li>
        <li className={`${styles.navItem} ${styles.hoverBox}`}>
          Today's Deals
        </li>
        <li className={`${styles.navItem} ${styles.hoverBox}`}>Prime Video</li>
        <li className={`${styles.navItem} ${styles.hoverBox}`}>Registry</li>
        <li className={`${styles.navItem} ${styles.hoverBox}`}>
          Customer Service
        </li>
        <li className={`${styles.navItem} ${styles.hoverBox}`}>Gift Cards</li>
        <li className={`${styles.navItem} ${styles.hoverBox}`}>Sell</li>
      </ul>
    </nav>
  );
}

export default LowerHeader;
