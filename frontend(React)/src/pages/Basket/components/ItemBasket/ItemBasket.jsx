import {
  decreaceCount,
  deleteItemInBasket,
  increaseCount,
} from "../../../../Api/api";
import styles from "./ItemBasket.module.css";

export const ItemBasket = ({ itemBasket, updateBasket }) => {
  const increase = async () => {
    await increaseCount(itemBasket.id_user, itemBasket.id_product);
    updateBasket(itemBasket.id_user);
  };

  const decrease = async () => {
    await decreaceCount(itemBasket.id_user, itemBasket.id_product);
    updateBasket(itemBasket.id_user);
  };

  const deleteItem = async () => {
    await deleteItemInBasket(itemBasket.id);
    updateBasket(itemBasket.id_user);
  };

  return (
    <div className={styles.itemBasket}>
      <div className={styles.nameInfo}>
        <img className={styles.img} src={itemBasket.product.img} />
        <div>
          <div className={styles.name}>{itemBasket.product.title}</div>
          <div className={styles.characteristicsInfo}>
            <div className={styles.characteristicsContainer}>
              <div className={styles.characteristics}>Модель</div>
              <span className={styles.line} />
              <div>{itemBasket.product.model}</div>
            </div>
            <div className={styles.characteristicsContainer}>
              <div className={styles.characteristics}>Оперативная память</div>
              <span className={styles.line} />
              <div>{itemBasket.product.ram_gb} ГБ</div>
            </div>
            <div className={styles.characteristicsContainer}>
              <div className={styles.characteristics}>Встроеннная память</div>
              <span className={styles.line} />
              <div>{itemBasket.product.storage_gb} ГБ</div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.priceInfo}>
        <div className={styles.price}>
          {itemBasket.product.price * itemBasket.count} ₽
        </div>
        <div className={styles.count}>
          <button className={styles.buttonCount} onClick={() => decrease()}>
            -
          </button>
          {itemBasket.count}
          <button className={styles.buttonCount} onClick={() => increase()}>
            +
          </button>
        </div>
        <span className={styles.delete} onClick={() => deleteItem()}>
          Удалить
        </span>
      </div>
    </div>
  );
};
