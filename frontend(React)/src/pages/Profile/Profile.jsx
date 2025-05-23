import { useEffect, useState } from "react";
import styles from "./Profile.module.css";
import {
  fetchUser,
  fetchUserRecommendation,
  fetchUserViews,
  logoutUser,
} from "../../Api/api";
import { useNavigate } from "react-router-dom";
import { Item } from "../Home/components/Item/Item";
import { useDispatch, useSelector } from "react-redux";
import { clearAuthToken } from "../../redux/authReducer/authActions";

export const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState();
  const [recommendationProducts, setRecommendationProducts] = useState([]);
  const token = useSelector((state) => state.auth.token);

  const loadUser = async () => {
    const data = await fetchUser();
    const userId = data.id;
    const recommendations = await fetchUserRecommendation(userId);
    setUser(data);
    setRecommendationProducts(Object.values(recommendations.data));
    setLoading(false);
  };

  const logout = () => {
    logoutUser();
    dispatch(clearAuthToken());
    navigate("/profile/login");
  };

  useEffect(() => {
    if (!token) {
      navigate("/profile/login");
    }
  }, []);

  useEffect(() => {
    loadUser();
  }, []);

  return (
    <div className={styles.profile}>
      {loading ? (
        <div className={styles.loading}>Загрузка...</div>
      ) : (
        <div>
          <div className={styles.info}>
            <div>
              <div className={styles.title}>Ваш профиль: {user.login}</div>
              <div>
                Дата регистрации:{" "}
                {new Date(user.created_at).toLocaleDateString("ru-RU")}
              </div>
            </div>
            <div className={styles.button} onClick={() => logout()}>
              Выйти
            </div>
          </div>
          {recommendationProducts.length > 0 && (
            <div className={styles.recommendations}>
              <div className={styles.titleRecommendations}>Рекомендации</div>
              <div className={styles.items}>
                {recommendationProducts.map((item) => (
                  <Item key={item.id} item={item} />
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
