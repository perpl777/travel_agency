import styles from './tour.module.css';
import { Link } from 'react-router-dom';

import Back from './img/image 41.svg'
import Calendar from './img/image 8.svg'

import otel1 from './img/otel1.png'
import otel2 from './img/otel2.png'

import excursion1 from './img/excursion1.png'
import excursion2 from './img/excursion2.png'

import avatar from './img/avatar.png'

function TourName() {
    return (
        <>
            <header className={styles.tour_name}>
                <div className={styles.nav_back} >

                    <button className={styles.btn_back}>
                        <img src={Back}/>
                        <Link to={"/"}><div className={styles.btn_text}>вернуться к турам</div></Link>
                    </button>

                    <p className={styles.countries}>Турция, Анталья, Аланья</p>

                </div>

                <div className={styles.nameTour}>
                    Тур: Alanya - Antalyal - Tusan Resort & Paloma Perissia
                </div>

                <div className={styles.description_tour}>
                    <div >
                        <div className={styles.price}>Цена: 565 120 руб за 1 чел</div>
                        <p className={styles.description_price}>В стоимость  тура включено: трансфер, авиабилеты, проживание</p>
                     </div>

                    <div className={styles.dataTour}>
                        <img src={Calendar} width={35} height={38}/>
                        <div className={styles.data}> 09 февраля - 16 февраля</div>
                    </div>
                </div>

                <Link to={"/documentsRegister"}><button className={styles.btn_arrange}>оформить</button></Link>
            </header>





            <div className={styles.tickets}>
                <div className={styles.ticket}>

                    <div className={styles.flight}>
                        <div className={styles.cities}>Москва - Аланья</div>
                        <div>
                            <p className={styles.plane}>AIR CAIRO</p>
                            <p className={styles.plane}>SM-909, Boeing 777-300ER</p>
                        </div>
                    </div>

                    <div className={styles.time}>
                        <div className={styles.time_begin}> <span>04:20,</span> 09.02.24</div>
                        <div className={styles.travel_time}>в пути 1ч 27мин</div>
                        <div className={styles.time_end}><span>10:30,</span> 13.02.24</div>
                    </div>

                    <div className={styles.place}>
                        <div className={styles.place_name}>
                            <div className={styles.airport_name}>Tusan Resort</div>
                            <p className={styles.city_name}>Аланья, Турция</p>
                        </div>

                        <div className={styles.place_name}>
                            <div className={styles.airport_name}>Tusan Resort</div>
                            <p className={styles.city_name}>Аланья, Турция</p>
                        </div>
                    </div>
                </div>



                <div className={styles.ticket}>

                    <div className={styles.flight}>
                        <div className={styles.cities}>Москва - Аланья</div>
                        <div>
                            <p className={styles.plane}>AIR CAIRO</p>
                            <p className={styles.plane}>SM-909, Boeing 777-300ER</p>
                        </div>
                    </div>

                    <div className={styles.time}>
                        <div className={styles.time_begin}> <span>04:20,</span> 09.02.24</div>
                        <div className={styles.travel_time}>в пути 1ч 27мин</div>
                        <div className={styles.time_end}><span>10:30,</span> 13.02.24</div>
                    </div>

                    <div className={styles.place}>
                        <div className={styles.place_name}>
                            <div className={styles.airport_name}>Tusan Resort</div>
                            <p className={styles.city_name}>Аланья, Турция</p>
                        </div>

                        <div className={styles.place_name}>
                            <div className={styles.airport_name}>Tusan Resort</div>
                            <p className={styles.city_name}>Аланья, Турция</p>
                        </div>
                    </div>
                </div>



                <div className={styles.ticket}>

                    <div className={styles.flight}>
                        <div className={styles.cities}>Москва - Аланья</div>
                        <div>
                            <p className={styles.plane}>AIR CAIRO</p>
                            <p className={styles.plane}>SM-909, Boeing 777-300ER</p>
                        </div>
                    </div>

                    <div className={styles.time}>
                        <div className={styles.time_begin}> <span>04:20,</span> 09.02.24</div>
                        <div className={styles.travel_time}>в пути 1ч 27мин</div>
                        <div className={styles.time_end}><span>10:30,</span> 13.02.24</div>
                    </div>

                    <div className={styles.place}>
                        <div className={styles.place_name}>
                            <div className={styles.airport_name}>Tusan Resort</div>
                            <p className={styles.city_name}>Аланья, Турция</p>
                        </div>

                        <div className={styles.place_name}>
                            <div className={styles.airport_name}>Tusan Resort</div>
                            <p className={styles.city_name}>Аланья, Турция</p>
                        </div>
                    </div>
                </div>
            </div>





            <div className={styles.hotels}>
                <p className={styles.hotels_title}>Отели:</p>

                <div className={styles.hotels_list}>
                    <div className={styles.hotel}>
                        <img className={styles.img_otel} src={otel1}/>
                        <div className={styles.hotel_name}>
                            <p className={styles.name_text}>Tusan Resort</p>
                            <p className={styles.where_hotel}>Аланья</p>
                        </div>
                    </div>

                    <div className={styles.hotel}>
                        <img className={styles.img_otel} src={otel2} />
                        <div className={styles.hotel_name}>
                            <p className={styles.name_text}>Paloma Perissia</p>
                            <p className={styles.where_hotel}>Анталья</p>
                        </div>
                    </div>
                </div>
            </div>





            <div className={styles.excursions}>
                <p className={styles.excursions_title}>Экскурсии:</p>

                <div className={styles.excursions_list}>
                    <div className={styles.excursion}>
                        <img className={styles.img_otel} src={excursion1}/>
                        <div className={styles.excursion_name}>
                            <div className={styles.excursion_name_date}>
                                <p className={styles.excursion_name_text}>Каппадокия</p>
                                <p className={styles.excursion_date_text}>11 февраля</p>
                            </div>
                            <p className={styles.excursion_description}>Полетаем на воздушных шарах в полупустынном регионе и полюбуемся красивыми пейзажами</p>
                        </div>
                    </div>

                    <div className={styles.excursion}>
                        <img className={styles.img_otel} src={excursion2}/>
                        <div className={styles.excursion_name}>
                            <div className={styles.excursion_name_date}>
                                <p className={styles.excursion_name_text}>К китам</p>
                                <p className={styles.excursion_date_text}>14 февраля</p>
                            </div>
                            <p className={styles.excursion_description}>Вас ждёт выход на корабле в открытое море в поисках китов, горбача, малых полосатиков, косаток и дельфинов</p>
                        </div>
                    </div>

                    
                </div>
            </div>





            <div className={styles.maintainer}>
                <div className={styles.maintainer_container}>
                    <img className={styles.maintainer_avatar} src={avatar} />
                    <div className={styles.maintainer_name}>Тур проводит: гид Виктория</div>
                    <button className={styles.btn_write}>Написать</button>
                </div>
            </div>
        </>
    );
  }
  
  export default TourName;