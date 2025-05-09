import { NavLink } from "react-router-dom";
import styles from "./Header.module.css";
import { useEffect, useState } from "react";

export const Header = ({ searchQuery, setSearchQuery }) => {
  const [viewPlaceholder, setViewPlaceholder] = useState(true);

  return (
    <div className={styles.header}>
      <span className={styles.title}>Mobile</span>

      {viewPlaceholder && (
        <div className={styles.search}>
          <input
            type="text"
            placeholder="Искать товар"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      )}

      <span className={styles.menu}>
        <NavLink
          to="/"
          className={({ isActive }) =>
            `${styles.link} ${isActive ? styles.active : ""}`
          }
          onClick={() => setViewPlaceholder(true)}
        >
          Главная
        </NavLink>
        <NavLink
          to="/basket"
          className={({ isActive }) =>
            `${styles.link} ${isActive ? styles.active : ""}`
          }
          onClick={() => setViewPlaceholder(false)}
        >
          Корзина
        </NavLink>
        <NavLink
          to="/profile"
          className={({ isActive }) =>
            `${styles.link} ${isActive ? styles.active : ""}`
          }
          onClick={() => setViewPlaceholder(false)}
        >
          Профиль
        </NavLink>
      </span>
    </div>
  );
};
