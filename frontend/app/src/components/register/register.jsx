import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import styles from './register.module.css';

function RegistrationPage() {
  
  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    patronymic: '',
    date_of_birth: '',
    email: '',
    phone_number: '',
    password: '',
    passwordConfirm: '',
    passport_issued_by: '',
    passport_issue_date: '',
    passport_series: '',
    passport_number: ''
  });

  const [error,  setError] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      formData.name.length < 2 ||
      formData.surname.length < 2 ||
      formData.patronymic.length < 2
    ) {
      setError('Введите верное ФИО');
      return;
    }

    if (!/^\d{2}\.\d{2}\.\d{4}$/.test(formData.date_of_birth)) {
      setError('Введите верную дату рождения');
    return;
    }

    if (!formData.phone_number.match("[+]{1}[0-9]{11,14}")) {
      setError('Введите верно номер телефона');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setError('Введите верно email');
      return;
    }

    if (
      formData.passport_issued_by.length < 2
    ) {
      setError('Введите корректно кем выдан паспорт');
      return;
    }

    if (!/^\d{2}\.\d{2}\.\d{4}$/.test(formData.passport_issue_date)) {
      setError('Введите верную дату выдачи паспорта');
    return;
    }

    if (!/^\d{4}$/.test(formData.passport_series)) {
      setError('Введите верно серию паспорта');
      return;
    }

    if (!/^\d{6}$/.test(formData.passport_number)) {
      setError('Введите верно номер паспорта');
      return;
    }

    if (!/^\d+$/.test(formData.password)) {
      setError('Пароль должен состоять только из цифр');
      return;
    }
    
    if (formData.password.length < 3) {
      setError('Пароль должен быть больше 3 символов');
      return;
    }


    if (formData.password !== formData.passwordConfirm) {
      setError('Пароли не совпадают');
      return;
    }

    try {
      const response = await axios.post('http://localhost:8000/register', formData);
      console.log(response.data);
      setIsModalOpen(true);
    } catch (error) {
      setError(error);
    }
  };

  

  return (
    <div className={styles.register}>
    <div className={styles.blackBlock}>
      <div className={styles.titleRegister}> Регистрация </div>
     
    
      <form onSubmit={handleSubmit} className={styles.formRegister}>
        <div className={styles.columns}>
          <div className={styles.column}>
            <label>
              Имя
              <input type="text" required name="name" value={formData.name} onChange={handleChange} className={styles.inputBlockRegister}/>
            </label>
            <label>
              Фамилия
              <input type="text" name="surname" value={formData.surname} onChange={handleChange} className={styles.inputBlockRegister}/>
            </label>
            <label>
              Отчество
              <input type="text" name="patronymic" value={formData.patronymic} onChange={handleChange} className={styles.inputBlockRegister}/>
            </label>
            <label>
              Дата рождения
              <input type="text" name="date_of_birth" value={formData.date_of_birth} onChange={handleChange} className={styles.inputBlockRegister}/>
            </label>
            <label>
              Телефон (+79999999999)
              <input type="text" name="phone_number" value={formData.phone_number} onChange={handleChange} className={styles.inputBlockRegister}/>
            </label>
            <label>
              Email
              <input type="text" name="email" value={formData.email} onChange={handleChange} className={styles.inputBlockRegister}/>
            </label>
          </div>
          <div className={styles.column}>
            <label>
              Паспорт: кем выдан
              <input type="text" name="passport_issued_by" value={formData.passport_issued_by} onChange={handleChange} className={styles.inputBlockRegister}/>
            </label>
            <label>
              Паспорт: дата выдачи
              <input type="text" name="passport_issue_date" value={formData.passport_issue_date} onChange={handleChange} className={styles.inputBlockRegister}/>
            </label>
            <label>
              Паспорт: серия
              <input type="text" name="passport_series" value={formData.passport_series} onChange={handleChange} className={styles.inputBlockRegister}/>
            </label>
            <label>
              Паспорт: номер
              <input type="text" name="passport_number" value={formData.passport_number} onChange={handleChange} className={styles.inputBlockRegister}/>
            </label>
            <label>
              Пароль
              <input type="text" name="password" value={formData.password} onChange={handleChange} className={styles.inputBlockRegister}/>
            </label>
            <label>
              Подтвердите пароль
              <input type="text" name="passwordConfirm" value={formData.passwordConfirm} onChange={handleChange} className={styles.inputBlockRegister}/>
            </label>
          </div>
        </div>
        <button type="submit" className={styles.btnRegister}>Зарегистрироваться</button>
        {error && <h1 className={styles.error}>{error}</h1>}
      </form>
                
        {isModalOpen && 
        <div className={styles.modal}>     
          <div className={styles.modalText}>Вы успешно зарегистрировались!</div>
          <Link to={'/login'}><button className={styles.modalRegiserBtn}>вернуться на страницу входа</button></Link>
        </div>
        }
        <Link to={'/login'}><div className={styles.loginHref}>Уже зарегистрированы? Войти</div></Link>
        <Link to={'/'}><div className={styles.homeHref}>Вернуться на главную страницу</div></Link>
    </div>
  </div>
  );
}

export default RegistrationPage;