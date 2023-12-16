import styles from './docRegister.module.css'
import { Link } from "react-router-dom";
import back from './img/image 41.svg'
import { useState } from 'react';
import axios from 'axios';


function DocRegister() {

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
    
        if (formData.password.length < 3) {
          setError('Пароль должен быть больше 3 символов');
          return;
        }
    
        if (formData.password !== formData.passwordConfirm) {
          setError('Пароли не совпадают');
          return;
        }
    
        // try {
        //   const response = await axios.post('http://localhost:8000/buy', formData);
        //   console.log(response.data);
        // } catch (error) {
        //   setError(error);
        // }
      };
      
    return (
        <>
        <div className={styles.container}>
            
            {/* <Link to="/tour">
                <button className={styles.btn_back}>
                    <img src={back} />
                    <p className={styles.btn_back_text}>Назад</p>
                </button>
            </Link> */}

        <div className={styles.formContainer}>
            <div className={styles.title}>Данные заказчика для оформления договора</div>
            <div className={styles.description}>
                <div className={styles.text}>Заказчиком может выступать гражданин РФ не моложе 18 лет. Поля заполняются согласно паспорту РФ.</div>
 

            </div>
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
            
          </div>
        </div>
        {error && <h1 className={styles.error}>{error}</h1>}
      </form>

        </div>





            <div className={styles.warning}>
                <p className={styles.payment_warning}>Оплата производится в рублях по курсу на момент оплаты. </p>
                <p className={styles.text_warning}>
                    Внимание! Стоимость рассчитана при условии бронирования граждан РФ. 
                    Для граждан других государств стоимость может быть пересчитана.
                    После бронирования в Вами свяжется специалист для уточнения окончательной стоимости тура.
                </p>    
            </div>





            <div className={styles.consents}>
                <div className={styles.consent}>
                    <input type="checkbox" id="consents" name="consents" />
                    <label className={styles.consents_label}>Согласен с  <a className={styles.consents_link} href="#">Договором</a>, ознакомлен с Памяткой и информацией 
                                            сайта <a className={styles.consents_link} href="#">www.destination.ru</a></label>
                </div>

                <div className={styles.consent}>
                    <input type="checkbox" id="consents" name="consents" />
                    <label className={styles.consents_label}>Даю <a className={styles.consents_link} href="#">Согласие</a> на получение новостей и предложений. </label>
                    <p className={styles.consents_label_end}>Политика обработки  персональных данных</p>
                </div>
            </div>





        </div>
      </>
    );
  }
  
  export default DocRegister;