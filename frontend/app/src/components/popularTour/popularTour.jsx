import styles from './popularTour.module.css';
import calendarImg from './img/calenadr.svg';

function PopularTour({countryTour, nameTour, TourImg, stars, date, price}) {
    return (
      <div className={styles.block}>
      
        <div className={styles.countryTour}>{countryTour}</div>
        <div className={styles.nameTour}>{nameTour}</div>
        <div >
          <img src={stars} className={styles.stars}/>
        </div>
        <div className={styles.date}>
          <img src={calendarImg} className={styles.calendarImg}/>
          {date}
        </div>
        <div className={styles.price}>
            Цена: 
            <div className={styles.priceNum}>
              {price}
            </div>
        </div>
        <div className={styles.ChoiceTour}>
          <button className={styles.btnChoice}>ожидаются</button>
        </div>
        <img src={TourImg} className={styles.TourImg}/>
      </div>
    );
  }
  
  export default PopularTour;
  