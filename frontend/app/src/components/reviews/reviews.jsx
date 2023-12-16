import styles from './reviews.module.css'
import Img1 from "./img/1.png";
import Img2 from "./img/2.png";
import Stars from "./img/stars5.svg";

function Reviews({avatar, name, city, text}) {
    return (
      <>
        <img src={Img1} className={styles.backImg2}/>
        <div className={styles.review}>
            <img src={avatar} className={styles.avatar}/>
            <p className={styles.name}>
                <p>{name}</p>
                <p>{city}</p>
            </p>
            <img src={Stars} className={styles.stars}/>
            <p className={styles.review__text}>
              {text}
            </p>
        </div>
        <img src={Img2} className={styles.backImg1}/>
      </>
    );
  }
  
  export default Reviews;