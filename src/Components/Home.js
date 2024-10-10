import React from "react";
import { FiArrowRight } from "react-icons/fi";
import About from "./About";
import Contact from "./Contact";
import { Link } from "react-router-dom";
import Carousel from "./Corousel.js"; // Ensure this path is correct
import img1 from "../assets/SliderImages/img1.jpg";
import img2 from "../assets/SliderImages/img2.png";
import gif1 from "../assets/SliderImages/gif1.gif";
import gif2 from "../assets/SliderImages/gif2.gif";
import vid from "../assets/smiling.mp4";
import OurTeam from "./OurTeam";
const slides = [
  <img key="gif2" className="h-screen w-screen" src={gif2} alt="Slide 2" />,
  <img key="img1" className="h-screen w-screen" src={img1} alt="Slide 3" />,
  <img key="gif1" className="h-screen w-screen" src={gif1} alt="Slide 1" />,
  <img key="img2" className="h-screen w-screen" src={img2} alt="Slide 4" />,
];
import backgroundImg from "../assets/backgroundImage.webp";

const Home = () => {
  return (
    <>
      <div
        style={{ backgroundImage: `url(${backgroundImg})` }}
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
