import React from "react";
import About from "./About.jsx";
import Carousel from "./Corousel.jsx"; // Ensure this path is correct
import img1 from "/sliderImages/img1.jpg";
import img2 from "/sliderImages/img2.png";
import gif1 from "/sliderImages/gif1.gif";
import gif2 from "/sliderImages/gif2.gif";
import OurTeam from "./OurTeam.jsx";
const slides = [
  <img key="gif2" className="h-screen w-screen" src={gif2} alt="Slide 2" />,
  <img key="img1" className="h-screen w-screen" src={img1} alt="Slide 3" />,
  <img key="gif1" className="h-screen w-screen" src={gif1} alt="Slide 1" />,
  <img key="img2" className="h-screen w-screen" src={img2} alt="Slide 4" />,
];

const Home = () => {
  return (
    <>
      <div
        className=" home-container "
      >
        <div className="flex absolute h-screen  bg-black">
          <Carousel autoSlide autoSlideInterval={5000}>
            {slides}
          </Carousel>
          <div className="absolute z-100 sm:text-6xl justify-center mt-80 ml-8 text-white">
            Plan Smarter, Celebrate Bigger with EventEZ
          </div>
        </div>
      </div>
      <div className=" ">
        <About />
        <OurTeam />
      </div>
    </>
  );
};

export default Home;
