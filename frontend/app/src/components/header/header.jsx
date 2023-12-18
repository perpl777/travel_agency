import React, { useState } from 'react';
import axios from 'axios';
import { Carousel } from "@mantine/carousel";
import styles from './header.module.css';
import searchImg from './img/s.svg';
import loginImg from './img/login.svg';
import { Link } from "react-router-dom";
import Tour from '../tour/tour';
import CarouselTours from '../carouselPopular/carouselPopular';


function Header() {

    const userData = JSON.parse(localStorage.getItem('userData'));

    const stylesSlides = {
        height: 200,
        slideSize: "33.333333%",
        slideGap: "md",
        loop: true,
        align: "start",
        slidesToScroll: "2",
        withControls: true,
        controlsOffset: "xl",
        align: "center",
        dragFree: true,
        controlSize: 50,
        styles: {
            slide: {
                display: "flex",
                alignItems: "center",
                marginRight: "10px",
                marginLeft: "10px",
            }
        }
    }

    
    const [date, setDate] = useState('');
    const [country, setCountry] = useState('');
    const [tourData, setTourData] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.get('http://localhost:8000/tour', {
                params: {
                    date: date,
                    country: country
                }
            });

            if (response.data.length > 0) {
                setTourData(response.data);
                setErrorMessage('');
            } else {
                setTourData(null);
                setErrorMessage('Tours not found');
            }
        } catch (error) {
            setTourData(null);
            console.log(error.errorMessage);
        }
    };

    return (
        <div className={styles.header}>
            <div className={styles.nav}>
                <p className={styles.logoImg}>DESTINATION</p>
                <a href='#id-about-us'>о нас</a>
                <a href='#id-reviews'>отзывы</a>
                <a href='#id-help'>помощь</a>
                <a href='#id-contacts'>контакты</a>
                <a href="tel:+79647518167" target='_blank'>+7 (964) 751-81-67</a>
                <div className={styles.login}>
                    <img src={loginImg}/>
                    {userData ? (
                    <Link to="/login"><button className={styles.loginBtn}>выйти</button></Link> 
                    ) : (
                    <Link to="/login"><button className={styles.loginBtn}>войти</button></Link>
                    )}
                </div>
            </div>
        
            <h1>DESTINATION</h1>
            <h2>исследуй мир вместе с нами</h2>
            <div className={styles.searchTour}>
                
                <form onSubmit={handleSubmit} className={styles.formSearch}>
                    
                    <label>
                        <p>Откуда</p>
                        <select placeholder="Город" className={styles.inputSearchTour}>
                            <option value="Москва" selected>Москва</option>
                        </select>       
                    </label>

                    <label>
                        <p>Куда</p>
                        <select placeholder="Страна" value={country} onChange={(e) => setCountry(e.target.value)} className={styles.inputSearchTour}>
                            <option value="ОАЭ">ОАЭ</option>
                            <option value="Тайланд">Тайланд</option>
                            <option value="Турция">Турция</option>
                        </select>       
                    </label>

                    <label>
                        <p>Дата</p>
                        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} placeholder="любые" className={styles.inputSearchTour}/>       
                    </label>

                    <button className={styles.btnSearch} type='submit'>
                        <div className={styles.btnText}>искать</div>
                        <img src={searchImg}/>
                    </button>
                </form>
            </div>

            <div className={styles.tours}>

                <div className={styles.titleTours}>Туры</div>

                {errorMessage && <p className={styles.errorMessage}>Туры не найдены</p>}

                {tourData ? (
                    <Carousel {...stylesSlides}>
                        {tourData.map((tour, index) => (
                            <Carousel.Slide> <Tour key={index} tourData={tour} /> </Carousel.Slide> 
                        ))}
                    </Carousel>
                ) : (
                    <CarouselTours />
                )}
            </div>

        </div>
    );
}

export default Header;
