import { useEffect, useState } from "react";
import styles from "./ProductDetails.module.css";
import { useParams } from "react-router-dom";
import { addItemToBasket, fetchBasket, fetchItem } from "../../Api/api";

export const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();
  const [inBasket, setInBasket] = useState(false);

  const formatDecimalPrice = (price) => {
    const formatter = new Intl.NumberFormat("ru-RU", {
      style: "decimal",
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    });

    return `${formatter.format(price)} ₽`;
  };

  const loadItem = async () => {
    const user_id = localStorage.getItem("user_id");
    const data = await fetchItem(id);
    if (user_id) {
      const basketList = await fetchBasket(user_id);
      setInBasket(basketList.some((item) => item.id_product === data.id));
    }
    setProduct(data);
    setIsLoading(false);
  };

  useEffect(() => {
    loadItem();
  }, []);

  const addBasket = async () => {
    const userId = localStorage.getItem("user_id");
    if (userId) {
      const data = await addItemToBasket(userId, product.id);
      setInBasket(true);
    } else {
      setError(401);
    }
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
      <div className={styles.priceContainer}>
        <div className={styles.price}>{formatDecimalPrice(product.price)}</div>
        {inBasket ? (
          <div className={styles.inBasket}>В корзине</div>
        ) : (
          <div className={styles.button} onClick={() => addBasket()}>
            Добавить в корзину
          </div>
        )}

        {error === 401 && (
          <div className={styles.error}>
            Войдите в профиль, чтобы добавлять товары в корзину
          </div>
        )}
      </div>
    </div>
  );
};
