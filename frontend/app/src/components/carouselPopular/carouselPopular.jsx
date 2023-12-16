import { Carousel } from "@mantine/carousel";

import PopularTour from "../popularTour/popularTour";
import styles from "./carouselPopular.module.css";
import FiveStars from "./img/stars5.svg";
import ThreeStars from "./img/stars3.png";
import TourImg1 from "./img/tour1.png";
import TourImg2 from "./img/tour2.png";
import TourImg4 from "./img/tour4.png";


const stylesSlides = {
    height: 200,
    slideSize: "33.333333%",
    slideGap: "md",
    loop: true,
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


function CarouselTours() {

    return (
    <div className={styles.carouselPopular}>

        <Carousel {...stylesSlides}>
            <Carousel.Slide> 
              <PopularTour countryTour="ОАЭ" nameTour="Dubai - TAJ Exotica Resort SPA The Palm" TourImg={TourImg1} stars={FiveStars} date="скоро появится" price="от 743 552 руб"/> </Carousel.Slide>
            <Carousel.Slide> <PopularTour countryTour="Турция" nameTour="Belek - Bellis Deluxe Lacoon Villas" TourImg={TourImg2} stars={FiveStars} date="скоро появится" price="от 492 296 руб"/>  </Carousel.Slide>
            <Carousel.Slide> <PopularTour countryTour="Тайланд" nameTour="Phuket - The Naka Island A Luxury Collection Resort" TourImg={TourImg4} stars={ThreeStars} date="скоро появится" price="от 334 954 руб"/>  </Carousel.Slide>
        </Carousel>

        {/* <Carousel {...sliderStyle}>
          {weather.daily.length > 0 && weather.daily.temperature_2m_min.map((temp, index) => (
            <Carousel.Slide key={index}> {days[index]}: {temp}° </Carousel.Slide>
          ))}
        </Carousel> */}
    </div>
    );
  }
  
  export default CarouselTours;

