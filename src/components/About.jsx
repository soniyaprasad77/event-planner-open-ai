import React from "react";
import { BsFillPlayCircleFill } from "react-icons/bs";
import video from "../assets/aboutvid.mp4";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="about-section-container gap-0" id="about">
      <div className="w-7/12 flex mt-32 pl-32 rounded-lg">
        <video
          className=" w-10/12 h-fit justify-center rounded-lg"
          src={video}
          autoPlay
          muted
          loop
        />
      </div>
      <div className="about-section-text-container">
        <p className="primary-heading">About</p>
        <h1 className="primary-heading text-2xl">EventEZ</h1>
        <p className="primary-text">
          To enhance the Tri-Valley's official website and boost local business
          tourism, our mission is to address existing technology limitations by
          integrating Generative AI or LLM agents for streamlined trip
          management.
        </p>
        <p className="primary-text">
          By adding an Events tab and offering one-click access to diverse
          events, we aim to increase tourism by up to 16.7%, injecting vitality
          into the local economy and supporting businesses.
        </p>
        <div className="about-buttons-container">
          <Link to="/events">
            <button className="secondary-button">Go to Events</button>
          </Link>
          <button className="watch-video-button">
            <BsFillPlayCircleFill /> Watch Video
          </button>
        </div>
      </div>
    </div>
  );
};

export default About;
