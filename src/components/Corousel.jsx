import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "react-feather";

const Carousel = ({
  children: slides,
  autoSlide = false,
  autoSlideInterval = 3000,
}) => {
  const [curr, setCurr] = useState(0);

  const prev = () =>
    setCurr((curr) => (curr === 0 ? slides.length - 1 : curr - 1));

  const next = () =>
    setCurr((curr) => (curr === slides.length - 1 ? 0 : curr + 1));

  useEffect(() => {
    if (!autoSlide) return;
    const slideInterval = setInterval(next, autoSlideInterval);
    return () => clearInterval(slideInterval);
  }, []);

  return (
    <div>
      <div>
        <div className="overflow-hidden relative h-screen w-full">
          <div
            className="flex transition-transform ease-out duration-500"
            style={{
              transform: `translateX(-${curr * 100}%)`,
              width: `${slides.length * 100}%`,
            }}
          >
            {slides.map((slide, index) => (
              <div key={index} className="w-full flex-shrink-0">
                {slide}
              </div>
            ))}
          </div>
          <div className="absolute inset-0 flex items-center justify-between p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12">
            <button
              onClick={prev}
              className="p-1 rounded-full shadow bg-white/80 text-gray-800 hover:bg-white"
            >
              <ChevronLeft />
            </button>
            <button
              onClick={next}
              className="p-1 rounded-full shadow bg-white/80 text-gray-800 hover:bg-white"
            >
              <ChevronRight />
            </button>
          </div>
          <div className="absolute bottom-4 right-0 left-0">
            <div className="flex items-center justify-center gap-2">
              {slides.map((_, i) => (
                <div
                  key={i}
                  className={`transition-all w-1.5 h-1.5 bg-white rounded-full ${
                    curr === i ? "p-0.5" : "bg-opacity-50"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="w-full  border border-gray-200  py-8 z-50">
        <div className="flex justify-center gap-8">
          <h1 className="text-2xl">Planning an event?</h1>
         <h3 className="text-2xl">Get it with EventEZ</h3>
        
        </div>
      </div>
    </div>
  );
};

export default Carousel;
