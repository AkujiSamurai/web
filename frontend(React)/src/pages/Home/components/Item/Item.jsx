import { NavLink } from "react-router-dom";
import styles from "./Item.module.css";

export const Item = ({ item }) => {
  const formatDecimalPrice = (price) => {
    const formatter = new Intl.NumberFormat("ru-RU", {
      style: "decimal",
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    });

    return `${formatter.format(price)} ₽`;
  };

  return (
    <div className={styles.item}>
      <img className={styles.img} src={item.img} alt={item.title} />
      <NavLink
        to={`/product/${item.id}`}
        state={{ product: item }}
        className={styles.name}
      >
        {item.title.substring(0, 30)}
        {item.title.length > 35 && "..."}
      </NavLink>
      <div className={styles.price}>{formatDecimalPrice(item.price)}</div>
    </div>
  );
};
