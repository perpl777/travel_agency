import styles from './steps.module.css';

function Steps() {
    return (
    <>
        <p className={styles.headTextSteps}>Процедура бронирования и оплаты тура</p>
        <div className={styles.steps}>
            <div className={styles.step}>
                <p className={styles.number}>1</p>
                <p className={styles.h5}>Выберите тур</p>
                <p className={styles.description}>После выбора тура ознакомьтесь с договором оферты по подбору, бронированию и оплате тура</p>
            </div>
            <div className={styles.step}>
                <p className={styles.number}>2</p>
                <p className={styles.h5}>Зарегистрируйтесь</p>
                <p className={styles.description}>Регистрация потверждает согласие на обработку персональных данных, описанными в договоре оферты</p>
            </div>
            <div className={styles.step}>
                <p className={styles.number}>3</p>
                <p className={styles.h5}>Ожидайте звонка</p>
                <p className={styles.description}>После бронирования с вами свяжется наш менеджер. Оплата заказа является потверждением ознакомления, согласия и присоединения к договору оферты и приравнивается к личной подписи.</p>
            </div>
        </div>
    </>
    );
  }
  
  export default Steps;
  