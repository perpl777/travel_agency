import React, { useState } from 'react';

import styles from './help.module.css';
import phoneImg from './img/phone.svg';
import whatsappImg from './img/whatsapp.svg';
import tgImg from './img/tg.svg';

function Help() {

  const [phoneNumber, setPhoneNumber] = useState('');
  const [helpMessage, setHelpMessage] = useState('');

  const handleInputPhone = (event) => {
    setPhoneNumber(event.target.value);
    if (!event.target.value.match("[+]{1}[0-9]{11,14}")) {
      setHelpMessage('Введите верно номер телефона');
    }
  };

  const handleHelpMessage = () => {
    setHelpMessage('Мы свяжемся с вами в ближайшее время');
  };

  return (
    <div className={styles.help} id='id-help'>
      <p className={styles.headTextHelp}>Поможем спланировать путешествие </p>

      <input className={styles.phone} type="tel" id="phone" name="phone" pattern="[+]{1}[0-9]{11,14}" required placeholder='+79999999999' value={phoneNumber} onChange={handleInputPhone}/>
      
      <div className={styles.helpMessage}>{helpMessage}</div>

      <button className={styles.btnGive} onClick={handleHelpMessage} disabled={!phoneNumber.match("[+]{1}[0-9]{11,14}")}>Получить консультацию</button>
      <div className={styles.contacts}> 
          <a href="tel:+79647518167" target='_blank'><img src={phoneImg}/></a>
          <a href="https://wa.me/79647518167" target='_blank'><img src={whatsappImg} /></a>
          <a href="https://tele.click/@perpl01" target='_blank'><img src={tgImg}/></a>
      </div>
    </div>
    );
  }
  
  export default Help;