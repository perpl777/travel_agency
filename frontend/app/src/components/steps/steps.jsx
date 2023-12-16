import styles from './steps.module.css';

function Steps() {
    return (
    <>
        <p className={styles.headTextSteps}>Процедура бронирования и оплаты тура</p>
        <div className={styles.steps}>
            <div className={styles.step}>
                <p className={styles.number}>1</p>
                <p className={styles.h5}>Ознакомьтесь с договором</p>
                <p className={styles.description}>После выбора тура ознакомьтесь с договором оферты по подбору, бронированию и оплате тура</p>
            </div>
            <div className={styles.step}>
                <p className={styles.number}>2</p>
                <p className={styles.h5}>Направьте свои данные</p>
                <p className={styles.description}>Отправьте нам любым удобным способом фотографии с данными паспортов туристов для бронирования (отправка потверждает согласие на обработку персональных данных, описанными в договоре оферты</p>
            </div>
            <div className={styles.step}>
                <p className={styles.number}>3</p>
                <p className={styles.h5}>Оплатите ваш заказ</p>
                <p className={styles.description}>Оплата заказа является потверждением ознакомления, согласия и присоединения к договору оферты и приравнивается к личной подписи. Оплата происходит по (не знаю как потом придумаем и допишем), либо оплата через систему быстрых платежей (по QR-коду)</p>
            </div>
        </div>
    </>
    );
  }
  
  export default Steps;
  