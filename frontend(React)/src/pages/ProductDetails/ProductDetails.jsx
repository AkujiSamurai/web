import { useEffect, useState } from "react";
import styles from "./ProductDetails.module.css";
import { useParams } from "react-router-dom";
import {
  addItemToBasket,
  addUserView,
  fetchBasket,
  fetchItem,
  fetchUser,
} from "../../Api/api";
import { useSelector } from "react-redux";

export const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();
  const [inBasket, setInBasket] = useState(false);
  const [userId, setUserId] = useState();
  const token = useSelector((state) => state.auth.token);

  const formatDecimalPrice = (price) => {
    const formatter = new Intl.NumberFormat("ru-RU", {
      style: "decimal",
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    });

    return `${formatter.format(price)} ₽`;
  };

  const loadItem = async () => {
    const user = await fetchUser();
    const user_id = user.id;
    setUserId(user_id);
    const data = await fetchItem(id);
    if (user_id) {
      const basketList = await fetchBasket(user_id);
      await addUserView(user_id, data.id);
      setInBasket(basketList.some((item) => item.id_product === data.id));
    }
    setProduct(data);
    setIsLoading(false);
  };

  useEffect(() => {
    loadItem();
  }, []);

  const addBasket = async () => {
    if (userId) {
      const data = await addItemToBasket(userId, product.id);
      setInBasket(true);
    } else {
      setError(401);
    }
  };

  const closeModal = () => {
    setError(null);
  };

  if (isLoading) {
    return <div className={styles.loading}>Загрузка...</div>;
  }
  return (
    <div className={styles.productDetails}>
      <img src={product.img} className={styles.img} />
      <div>
        <div className={styles.name}>{product.title}</div>
        <div className={styles.titleInfo}>О товаре</div>
        <div className={styles.description}>{product.description}</div>
      </div>
      <div>
        <div className={styles.priceContainer}>
          <div className={styles.price}>
            {formatDecimalPrice(product.price)}
          </div>
          {inBasket ? (
            <div className={styles.inBasket}>В корзине</div>
          ) : (
            <div className={styles.button} onClick={() => addBasket()}>
              Добавить в корзину
            </div>
          )}
        </div>

        <div className={styles.characteristicsTitle}>Характеристики</div>
        <div className={styles.characteristicsContainer}>
          <div className={styles.characteristics}>Модель</div>
          <span className={styles.line} />
          <div>{product.model}</div>
        </div>
        <div className={styles.characteristicsContainer}>
          <div className={styles.characteristics}>Оперативная память</div>
          <span className={styles.line} />
          <div>{product.ram_gb} ГБ</div>
        </div>
        <div className={styles.characteristicsContainer}>
          <div className={styles.characteristics}>Встроеннная память</div>
          <span className={styles.line} />
          <div>{product.storage_gb} ГБ</div>
        </div>
      </div>

      {error === 401 && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <div className={styles.modalContent}>
              <p>Войдите в профиль, чтобы добавлять товары в корзину</p>
              <button className={styles.modalCloseButton} onClick={closeModal}>
                Закрыть
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
