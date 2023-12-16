import React from 'react';
import styles from './tour.module.css';
import calendarImg from './img/calenadr.svg';
import axios from "axios";
import { useState, useEffect } from 'react';

function Tour({tourData}) {


  const [showModal, setShowModal] = useState(false);

  let Img = require(`./img/${tourData.hotels.photo}`);
  let Stars = require(`./img/${tourData.hotels.classhotel}.png`);

  const [flights, setFlights] = useState([]);

  useEffect(() => {
    const fetchFlights = async () => {
      try {
        const response = await axios.get(`/flights/${tourData.tour.id}`);
        setFlights(response.data.flights);
      } catch (error) {
        console.error(error);
      }
    };

    fetchFlights();
  }, [tourData.tour.id]);


  const handleButtonClick = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    patronymic: '',
    date_of_birth: '',
    email: '',
    phone_number: '',
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
    else {
      setError('Бронь прошла успешно');
    }

  };


  return (
    <div className={styles.block}>
      
    
      <div className={styles.countryTour}>{tourData.tour.country}</div>
      <div className={styles.nameTour}>{tourData.tour.tour_name}</div>

      <div>
        <img src={Stars} className={styles.stars}/>
      </div>

      <div className={styles.date}>
        <img src={calendarImg} className={styles.calendarImg}/>
        {tourData.tour.arrival_date} - {tourData.tour.departure_date}
      </div>

      <div className={styles.price}>
          Цена: 
          <div className={styles.priceNum}>
            от {tourData.tour.price} руб
          </div>
      </div>
      
      <div className={styles.ChoiceTour}>  
        <button className={styles.btnChoice} onClick={handleButtonClick}>выбрать</button>
      </div>

      {tourData.hotels.photo && (
        <img src={Img} alt="Selected Image" className={styles.TourImg} />
      )}

      {showModal && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <button className={styles.closeButton} onClick={closeModal}>
              x
            </button>
            <div>
            <div className={styles.name_tour}>Тур: {tourData.tour.tour_name}</div>

            <div className={styles.country_tour}>Страна: {tourData.tour.country}, {tourData.city.city_name}</div>
            <div className={styles.data_tour}>Дата: {tourData.tour.arrival_date} - {tourData.tour.departure_date}</div>
            <div className={styles.price_tour}>Цена: {tourData.tour.price} руб</div>
            </div>

            <div>
              <div className={styles.hotel}>Отель: {tourData.hotels.hotel_name}</div>
              <div className={styles.starsh}>Класс отеля: {tourData.hotels.classhotel}*</div>
            </div>

            <div>
              <div className={styles.excursion_name}>Экскурсии: {tourData.excursions.excursion_name}</div>
              <div className={styles.excursion_descr}>{tourData.excursions.description}</div>
            </div>

            <div>
              <div className={styles.guide}>Гид: {tourData.guides.guide_name}</div>
              <div className={styles.guide_phone}>Номер телефона: {tourData.guides.phone_number}</div>
            </div>

            <div className={styles.flights}>
              <ul>
                {flights.map((flight) => (
                  <li key={flight.id}>
                    <div className={styles.flight_date}>Дата: {flight.date}</div>
                    <div className={styles.flight_name}>Вылет: {flight.departure_time}</div>
                    <div className={styles.flight_name}>Прилет: {flight.arrival_time}</div>
                    <div className={styles.departure_loc}>Место вылета: {flight.departure_location}</div>
                    <div className={styles.arrival_loc}>Место прилета: {flight.arrival_location}</div>
                    <div className={styles.airplane_name}>Самолет: {flight.airplane_name}</div>
                  </li>
                ))}
              </ul>
            </div>

            <div className={styles.formContainer}>
              
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
                  <button type="submit" className={styles.btnChoice2}> Забронировать</button>
                </div>
                </div>
                {error && <div className={styles.error}>{error}</div>}
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
        </div>
      )}
tart

    </div>
    );
  }
  
  export default Tour;
  