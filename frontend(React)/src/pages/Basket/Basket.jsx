import { useEffect, useState } from "react";
import styles from "./Basket.module.css";
import { ItemBasket } from "./components/ItemBasket/ItemBasket";
import { fetchBasket } from "../../Api/api";
import { useDispatch, useSelector } from "react-redux";

export const Basket = () => {
  const [basketList, setBasketList] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = useSelector((state) => state.auth.token);

  const loadBasket = async () => {
    const data = await fetchBasket();
    setBasketList(data);
    setLoading(false);
  };

  useEffect(() => {
    if (token) {
      loadBasket();
    } else {
      setLoading(false);
    }
  }, []);

  return (
    <div className={styles.basket}>
      <div className={styles.title}>Корзина</div>
      {loading && <div className={styles.loading}>Загрузка...</div>}
      {!token && !loading && (
        <div>Войдите в профиль, чтобы увидеть товары в своей корзине</div>
      )}
      <div className={styles.basketList}>
        {basketList?.length > 0
          ? basketList.map((itemBasket) => (
              <ItemBasket
                key={itemBasket.id}
                itemBasket={itemBasket}
                updateBasket={loadBasket}
              />
            ))
          : token && !loading && <div>Ваша корзина пуста</div>}
      </div>
    </div>
  );
};
