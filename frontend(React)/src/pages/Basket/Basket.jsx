import { useEffect, useState } from "react";
import styles from "./Basket.module.css";
import { ItemBasket } from "./components/ItemBasket/ItemBasket";
import { fetchBasket } from "../../Api/api";

export const Basket = () => {
  const [basketList, setBasketList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState();

  const loadBasket = async (userId) => {
    const data = await fetchBasket(userId);
    setBasketList(data);
    setLoading(false);
  };

  useEffect(() => {
    const id = localStorage.getItem("user_id");
    
    if (id) {
      setUserId(id);
      loadBasket(id);
    } else {
      setLoading(false);
    }
  }, []);

  return (
    <div className={styles.basket}>
      <div className={styles.title}>Корзина</div>
      {loading && <div className={styles.loading}>Загрузка...</div>}
      {!userId && !loading && (
        <div>Войдите в профиль, чтобы увидеть товары в своей корзине</div>
      )}
      <div className={styles.basketList}>
        {basketList?.length > 0
          ? basketList.map((itemBasket) => (
              <ItemBasket key={itemBasket.id} itemBasket={itemBasket} updateBasket={loadBasket} />
            ))
          : userId && !loading && <div>Ваша корзина пуста</div>}
      </div>
    </div>
  );
};
