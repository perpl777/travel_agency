import styles from './aboutUs.module.css';
import photo1 from './img/photo1.png';
import photo2 from './img/photo2.png';
import photo3 from './img/photo3.png';
import photo4 from './img/photo4.png';
import line from './img/line.png';


function AboutUs() {
    return (
      <div className={styles.aboutUs} id='id-about-us'>
        <div className={styles.blackBlock}>
            <h2 className={styles.h3}>О нас</h2>
            <img src={line} className={styles.line}/>

            <div className={styles.aboutUsContent}>
              <div className={styles.imgPhotos1}>
                <img src={photo1}/>
                <img src={photo3} />
              </div>
              <div>
                <div className={styles.headText1}>Поможем подобрать вам тур</div>
                <div className={styles.descriptionText1}>Найдем тур, который подойдет вам по времени и бюджету</div>
                <div className={styles.headText1}>Мы с вами 24/7</div>
                <div className={styles.descriptionText1}>Поддерживаем связь  с клиентами на всех этапах путешествия</div>
              </div>
            </div>
            <div className={styles.aboutUsContent}>
              <div>
                <div className={styles.headText2}>У нас яркие и интересные маршруты</div>
                <div className={styles.descriptionText2}>Организуем туристические поездки с эскурсиями по Тайланду, ОАЭ и Турции!</div>
                <div className={styles.headText2}>Учитываем ваши пожелания</div>
                <div className={styles.descriptionText2}>Обязательно оставляйте свои пожелания и отзывы</div>
              </div>
              <div className={styles.imgPhotos2}>
                <img src={photo2} />
                <img src={photo4} />
              </div>
            </div>
           
        </div>
      </div>
    );
  }
  
  export default AboutUs;