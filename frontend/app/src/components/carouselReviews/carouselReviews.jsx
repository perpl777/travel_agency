import { Carousel } from "@mantine/carousel";

import Reviews from "../reviews/reviews";
import styles from "./carouselReviews.module.css";

import avatar1 from "./img/a.png";
import avatar2 from "./img/b.png";
import avatar3 from "./img/c.png";

const stylesSlides = {
    slideSize: "33%",
    slideGap: "md",
    initialSlide: 1,
    loop: false,
    align: "center",
    dragFree: true,
    styles: {
        slide: {
          display: "flex",
          alignItems: "center",
          marginRight: "100px",
          marginLeft: "100px",
          marginTop: "30px",
        }
    }
}


function CarouselReviews() {

    return (
    <div className={styles.reviews} id='id-reviews'>
        <div className={styles.headTextReviews}>Отзывы</div>

        <Carousel {...stylesSlides}>
            <Carousel.Slide> <Reviews name="Алла Пугачева" avatar={avatar1} city="Россия, Санкт-Петербург" text="Два раза были в Турции. Осенью планируем ОАЭ, скорее всего в Абу Даби. С оператором комфортно, все организовано — хорошие отели, удачно состыкованы заселение и перелет, и очень помогают менеджеры"/> </Carousel.Slide>
            <Carousel.Slide> <Reviews name="Марина Кремнева" avatar={avatar2} city="Россия, Москва" text="Была приятно удивлена ценами,  а также качеством тура, который они мне предложили"/> </Carousel.Slide>
            <Carousel.Slide> <Reviews name="Виктор Плесняков" avatar={avatar3} city="Россия, Новосибирск" text="Наш уже проверенный оператор, Спасибо за хорошую организацию и комфорт, 8 дней пролетели как 5 минут"/> </Carousel.Slide>
        </Carousel>
    </div>
    );
  }
  
  export default CarouselReviews;

