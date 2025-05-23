import { Link, useNavigate } from "react-router-dom";
import styles from "./Register.module.css";
import { useState } from "react";
import { registerUser } from "../../../../Api/api";

export const Register = () => {
  const navigate = useNavigate();

  const [login, setLogin] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [errorStatus, setErrorStatus] = useState();

  const regUser = async () => {
    if (password !== confirmPassword) {
      setErrorStatus("password_confirmation");
    } else {
      const data = await registerUser(login, password);

      if (data.success) {
        navigate("/profile");
      } else {
        setErrorStatus(data.status);
      }
    }
  };

  return (
    <div className={styles.register}>
      <div className={styles.content}>
        <h2 className={styles.title}>Регистрация</h2>
        <div>
          <input
            type="text"
            className={`${styles.input} ${errorStatus === 422 && styles.error}`}
            placeholder="Login"
            onChange={(e) => setLogin(e.target.value)}
          />
          <input
            type="password"
            className={`${styles.input} ${
              errorStatus === "password_confirmation" && styles.error
            }`}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="password"
            className={`${styles.input} ${
              errorStatus === "password_confirmation" && styles.error
            }`}
            placeholder="Confirm password"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        {errorStatus === 422 && (
          <div className={styles.error}>Этот логин уже занят</div>
        )}
        {errorStatus === "password_confirmation" && (
          <div className={styles.error}>Пароли не совпадают</div>
        )}
        <button className={styles.button} onClick={() => regUser()}>
          Продолжить
        </button>
        <p>
          Если у вас есть аккаунт, вы можете перейти на страницу{" "}
          <Link to="/profile/login" className={styles.link}>
            входа
          </Link>
        </p>
      </div>
    </div>
  );
};
