import { Link, useNavigate } from "react-router-dom";
import styles from "./Login.module.css";
import { useState } from "react";
import { authUser } from "../../../../Api/api";

export const Login = () => {
  const navigate = useNavigate();

  const [login, setLogin] = useState();
  const [password, setPassword] = useState();
  const [errorStatus, setErrorStatus] = useState();

  const loginUser = async () => {
    const data = await authUser(login, password);
    console.log(data);

    if (data.success) {
      localStorage.setItem("user_id", data.item.id);
      navigate("/profile");
    } else {
      setErrorStatus(data.status);
    }
  };

  return (
    <div className={styles.login}>
      <div className={styles.content}>
        <h2 className={styles.title}>Войти</h2>
        <div>
          <input
            type="text"
            className={`${styles.input} ${errorStatus === 401 && styles.error}`}
            placeholder="Login"
            onChange={(e) => setLogin(e.target.value)}
          />
          <input
            type="password"
            className={`${styles.input} ${errorStatus === 401 && styles.error}`}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {errorStatus === 401 && (
          <div className={styles.error}>Неверный логин или пароль</div>
        )}
        <button className={styles.button} onClick={() => loginUser()}>
          Продолжить
        </button>
        <p>
          Если у вас нет аккаунта, вы можете перейти на страницу{" "}
          <Link to="/profile/register" className={styles.link}>
            регистрации
          </Link>
        </p>
      </div>
    </div>
  );
};
