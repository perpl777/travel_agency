import { Link } from 'react-router-dom';
import {  React, useState, useEffect } from 'react';
import styles from './login.module.css';
import axios from 'axios';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [user, setUser] = useState(null);

  const [error, setError] = useState(null);

  useEffect(() => {
    const userData = localStorage.getItem('userData');
    if (userData !== null) {
      try {
        const parsedUserData = JSON.parse(userData);
        setUser(parsedUserData);
      } catch (error) {
        console.error('Error parsing JSON:', error);
      }
    } else {
      console.error('userData is undefined');
    }
  }, []);

  const handleLogin = async () => {
    try {
      const response = await axios.get('http://localhost:8000/login', {
        params: {
          email,
          password,
        },
      });
      if (response.data.user) {
        setUser(response.data.user);
        setError(null);
        // Сохраняем данные пользователя в хранилище
        localStorage.setItem('userData', JSON.stringify(response.data.user));
      } else {
        setError('Такого пользователя не существует');
      }
    } catch (error) {
      setUser(null);
      setError('Ошибка входа');
    }
  };

  const handleLogout = () => {
    // Очищаем данные пользователя из хранилища
    localStorage.removeItem('userData');
    setUser(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Введите верно email');
      return;
    }
    if (!/^\d+$/.test(password)) {
      setError('Пароль должен состоять только из цифр');
      return;
    }
    if (password.length < 3) {
      setError('Пароль должен быть больше 3 символов');
      return;
    }

    handleLogin();
  };

  return (
    <div className={styles.login}>
      {user ? (
        <div className={styles.loggedInContainer}>
          <div className={styles.loggedInMessage}>Приветствуем, {user.name}!</div>
          <Link to="/"><button className={styles.loggedButton}>На главную страницу</button></Link>
          
          <button onClick={handleLogout} className={styles.loggedButton}>
            Выйти из аккаунта
          </button>
        </div>

      ) : (
      <div className={styles.blackBlock}>
        <div className={styles.titleLogin}> Вход </div>
        
          <form className={styles.formLogin} onSubmit={handleSubmit}>
            <div className={styles.inputBoxLogin}> 
              <input type = "text" required className={styles.inputBlockLogin} placeholder='Email' name="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
            </div>
            <div className={styles.inputBoxLogin}> 
              <input type = "text" className={styles.inputBlockLogin} placeholder='Пароль' name="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
            </div>
            {error && <div className={styles.error}>{error}</div>}
            <button type="submit" className={styles.btnLogin}> Войти </button>
          </form>

        <Link to={'/register'}><div className={styles.registerHref}>Еще не зарегистрированы? Регистрация</div></Link>
        <Link to={'/'}><div className={styles.homeHref}>Вернуться на главную страницу</div></Link>
        </div>
      )}
      
    </div>
  );
}

export default LoginPage;