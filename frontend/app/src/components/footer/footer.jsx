import styles from './footer.module.css';
import phoneImg from './img/phone.svg';
import whatsappImg from './img/whatsapp.svg';
import tgImg from './img/tg.svg';

function Footer() {
    return (
      <div className={styles.footer} id='id-contacts'>
        <div className={styles.logoText}>DESTINATION</div>
        <div className={styles.descrText}>Туры и эскурсии по выгодным ценам</div>
        <div className={styles.contacts}>
            <a href="tel:+79647518167" target='_blank'><img src={phoneImg}/></a>
            <a href="https://wa.me/79647518167" target='_blank'><img src={whatsappImg} /></a>
            <a href="https://tele.click/@perpl01" target='_blank'><img src={tgImg}/></a>
        </div>
      </div>
    
    );
  }
  
  export default Footer;
  