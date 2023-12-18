import React from 'react';
import styles from './tour.module.css';
import calendarImg from './img/calenadr.svg';
import axios from "axios";
import { useState, useEffect } from 'react';
import { AuthContext } from './AuthContext';
import { useContext } from 'react';

function Tour({tourData}) {
  const [showModal, setShowModal] = useState(false);

  const { isLoggedIn } = useContext(AuthContext);
  const [messageBuy, setMessageBuy] = useState('');

  const handleButtonBuy = () => {
    const userData = JSON.parse(localStorage.getItem('userData'));

    if (userData) {
      setMessageBuy(`Бронь подтверждена ${userData.name}. Мы свяжемся с вами в ближайшее время для потверждения оплаты.`);
    } else {
      setMessageBuy('Вы не авторизованы. Пожалуйста, авторизуйтесь или зарегистрируйтесь.');
    }
  };


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
            <button type="submit" onClick={handleButtonBuy} className={styles.btnChoice2}>Забронировать</button>
            {messageBuy && 
            <>
              <div className={styles.messageBuy}>{messageBuy}</div>
            </>
            }
            
          </div>
        </div>
      )}
    </div>
    );
  }
  
  export default Tour;
