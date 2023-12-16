import Header from "../header/header";
import AboutUs from "../aboutUs/aboutUs";
import Steps from "../steps/steps";
import Help from "../help/help";
import CarouselReviews from "../carouselReviews/carouselReviews";
import Footer from "../footer/footer";

function HeadPage() {
  
  return (
    <>
        <Header/>
        <AboutUs />
        <Steps />
        <Help />
        <CarouselReviews />
        <Footer />
    </>
  );
}

export default HeadPage;