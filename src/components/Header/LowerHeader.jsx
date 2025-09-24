import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./LowerHeader.module.css";
import MenuIcon from "@mui/icons-material/Menu";

function LowerHeader() {
  return (
    <nav className={styles.lowerHeader}>
      <ul className={styles.navList}>
        <li className={styles.navItem}>
          <NavLink to="/all" className={styles.link}>
            <MenuIcon className={styles.menuIcon} />
            <span>All</span>
          </NavLink>
        </li>
        <li className={styles.navItem}>
          <NavLink to="/deals" className={styles.link}>
            Today's Deals
          </NavLink>
        </li>
        <li className={styles.navItem}>
          <NavLink to="/prime-video" className={styles.link}>
            Prime Video
          </NavLink>
        </li>
        <li className={styles.navItem}>
          <NavLink to="/registry" className={styles.link}>
            Registry
          </NavLink>
        </li>
        <li className={styles.navItem}>
          <NavLink to="/customer-service" className={styles.link}>
            Customer Service
          </NavLink>
        </li>
        <li className={styles.navItem}>
          <NavLink to="/gift-cards" className={styles.link}>
            Gift Cards
          </NavLink>
        </li>
        <li className={styles.navItem}>
          <NavLink to="/sell" className={styles.link}>
            Sell
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default LowerHeader;











