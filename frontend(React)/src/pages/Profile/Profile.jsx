import { useEffect, useState } from "react";
import styles from "./Profile.module.css";
import { fetchUser } from "../../Api/api";
import { useNavigate } from "react-router-dom";

export const Profile = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState();

  const loadUser = async () => {
    const userId = localStorage.getItem("user_id");
    const data = await fetchUser(userId);
    setUser(data);
    setLoading(false);
  };

  const logout = () => {
    localStorage.removeItem("user_id");
    navigate("/profile/login");
  };

  useEffect(() => {
    const userId = localStorage.getItem("user_id");
    if (!userId) {
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
      )}
    </div>
  );
};
