import React from 'react';
import styles from './tour.module.css';
import calendarImg from './img/calenadr.svg';
import axios from "axios";
import { useState, useEffect } from 'react';
import { AuthContext } from './AuthContext';
import { useContext } from 'react';

function Tour({tourData}) {
  let Img = require(`./img/${tourData.hotels.photo}`);
  let Stars = require(`./img/${tourData.hotels.classhotel}.png`);

  const [showModal, setShowModal] = useState(false);
  const [messageBuy, setMessageBuy] = useState('');
  const [flights, setFlights] = useState([]);
  const [isFetching, setIsFetching] = useState(false);

  const handleButtonBuy = async () => {
    const userData = JSON.parse(localStorage.getItem('userData'));

    if (userData) {
      setMessageBuy(`Бронь подтверждена ${userData.name}. Мы свяжемся с вами в ближайшее время для подтверждения оплаты.`);
      try {
        const response = await axios.post('http://localhost:8000/buy', {
          phone_number: userData.phone_number,
          tour_name: tourData.tour.tour_name
        });
        console.log(response.data);
      } catch (error) {
        console.error(tourData.tour.tour_name);
        console.error(error);
      }
    } else {
        setMessageBuy('Вы не авторизованы. Пожалуйста, авторизуйтесь или зарегистрируйтесь.');
    }
  };

  const fetchFlights = async () => {
    setIsFetching(true);
    try {
      const response = await axios.get(`http://localhost:8000/flights/${tourData.tour.tour_name}`);
      setFlights(response.data.flights);
    } catch (error) {
      console.error(error);
    }
    setIsFetching(false);
  };

  useEffect(() => {
    fetchFlights();
  }, [tourData]);


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
            <div className={styles.name_tour}>Тур:{tourData.tour.tour_name}</div>
            <div className={styles.country_tour}><span className={styles.title_bold}>Страна:</span> {tourData.tour.country}, {tourData.city.city_name}</div>
            <div className={styles.data_tour}><span className={styles.title_bold}>Дата: </span>{tourData.tour.arrival_date} - {tourData.tour.departure_date}</div>
            <div className={styles.price_tour}><span className={styles.title_bold}>Цена: </span>{tourData.tour.price} руб</div>
            </div>
            <div>
              <div className={styles.hotel}><span className={styles.title_bold}>Отель: </span>{tourData.hotels.hotel_name}</div>
              <div className={styles.starsh}><span className={styles.title_bold}>Класс отеля: </span>{tourData.hotels.classhotel}*</div>
            </div>
            <div className={styles.excursion_container}>
              <div className={styles.excursion_name}><span className={styles.title_bold}>Экскурсии: </span>{tourData.excursions.excursion_name}</div>
              <div className={styles.excursion_descr}>{tourData.excursions.description}</div>
            </div>
            <div>
              <div className={styles.guide}><span className={styles.title_bold}>Гид: </span>{tourData.guides.guide_name}</div>
              <div className={styles.guide_phone}><span className={styles.title_bold}>Номер телефона: </span>{tourData.guides.phone_number}</div>
            </div>

            <div className={styles.flights}>
            {flights && flights.length > 0 ? (
              <ul>
                {flights.map((flight) => (
                  <li key={flight.date}>
                    <div>Дата: {flight.date}</div>
                    <div>Время вылета: {flight.departure_time}</div>
                    <div>Время прилета: {flight.arrival_time}</div>
                    <div>Место убытия: {flight.departure_location}</div>
                    <div>Место прибытия: {flight.arrival_location}</div>
                    <div>Самолет: {flight.airplane_name}</div>
                  </li>
                ))}
              </ul>
            ) : (
              <div>Рейсы отсутствуют</div>
            )}
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
