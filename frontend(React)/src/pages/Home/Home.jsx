import { useEffect, useState } from "react";
import styles from "./Home.module.css";
import { Item } from "./components/Item/Item";
import arrowImg from "../../assets/img/arrow.png";
import { useOutletContext } from "react-router-dom";
import { fetchItems } from "../../Api/api";

export const Home = () => {
  const { searchQuery = "" } = useOutletContext() || {};
  const [items, setItems] = useState([]);
  const [sortOrder, setSortOrder] = useState("asc");
  const [loading, setLoading] = useState(true);

  const filteredItems = items.filter((item) =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortItemsByPrice = [...filteredItems].sort((a, b) =>
    sortOrder === "asc" ? a.price - b.price : b.price - a.price
  );

  const loadItems = async () => {
    const data = await fetchItems();
    setItems(data);
    setLoading(false);
  };

  useEffect(() => {
    loadItems();
  }, []);

  return (
    <div className={styles.home}>
      <div className={styles.content}>
        <div className={styles.head}>
          <div className={styles.title}>Каталог товаров</div>
          <div
            className={styles.button}
            onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
          >
            Сортировать по цене
            <img src={arrowImg} className={styles.img} />
          </div>
        </div>
        {loading && <div className={styles.loading}>Загрузка...</div>}
        <div className={styles.items}>
          {sortItemsByPrice.length > 0
            ? sortItemsByPrice.map((item) => <Item key={item.id} item={item} />)
            : searchQuery && !loading && <div>По вашему запросу товаров не найдено</div>}
        </div>
      </div>
    </div>
  );
};
