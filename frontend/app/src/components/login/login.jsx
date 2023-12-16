import { Link } from 'react-router-dom';
import {  React, useState } from 'react';
import styles from './login.module.css';
import axios from 'axios';
function LoginPage() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Введите верно email');
      return;
    }

    if (password.length < 3) {
      setError('Пароль должен быть больше 3 символов');
      return;
    }

    try {
      const response = await axios.get('http://localhost:8000/login', {
        params: {
          email,
          password,
        },
      });

      setUser(response.data.user);
      setError(null);
    } catch (error) {
      setUser(null);
      setError(error.response.data.message);
    }
  };

  return (
    <div className={styles.login}>
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

          {user && (
        <div>
          <h3>Приветствуем, {user.name}!</h3>
        </div>
        )}

        {error && <p>{error}</p>}

        <Link to={'/register'}><div className={styles.registerHref}>Еще не зарегистрированы? Регистрация</div></Link>
      </div>
    </div>
    );
  }
    
  export default LoginPage;
    

