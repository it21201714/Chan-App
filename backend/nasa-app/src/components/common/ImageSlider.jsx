/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
//import { FaSpinner } from "react-icons/fa";

const ImageSlider = ({ images, description, buttonText }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [sliderWidth, setSliderWidth] = useState(window.innerWidth);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex;
    });

    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      setSliderWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    // Simulate loading delay
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => {
      clearInterval(timer);
      window.removeEventListener("resize", handleResize);
    };
  }, [images]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-cyan-800"></div>
      </div>
    );
  }

  return (
    <div
      className="image-slider h-screen w-screen flex flex-col items-center justify-center relative overflow-hidden"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: -1,
        backgroundImage: `url("https://wallpapers.com/images/hd/1920x1080-hd-space-73omyic75ep59863.jpg")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        width: "100vw",
        height: "100vh",
      }}
    >
      <div className="relative  flex items-center justify-center overflow-hidden rounded-sm">
        <div className="absolute inset-0 z-[-1]">
          <div className="absolute inset-0 bg-gradient-to-b from-black to-indigo-900 opacity-75"></div>
          <img
            src="/path/to/background.jpg"
            alt="Background Image"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="slider-description text-center max-w-4xl  mx-auto px-8 py-8 rounded-xl backdrop-blur-lg bg-black/30">
          <h1 className="text-6xl font-extrabold mb-8 text-white text-shadow-lg">
            <span className="bg-gradient-to-r from-rose-500 to-violet-500 bg-clip-text text-transparent">
              Explore the Cosmic Frontier
            </span>
          </h1>
          <p className="mb-10 text-xl text-white text-opacity-90 leading-relaxed">
            Embark on an extraordinary journey beyond the confines of our
            planet. Immerse yourself in the grandeur of celestial wonders and
            unravel the profound mysteries that lie within the vast expanse of
            the universe. Join our community of explorers today and unlock a
            world of knowledge that will forever change your perspective.
          </p>
          <div className="flex justify-center space-x-6">
            <Link to={"/apod"}>
              <button className="relative overflow-hidden bg-gradient-to-r from-rose-500 to-violet-500 hover:from-violet-500 hover:to-rose-500 text-white font-bold py-4 px-10 rounded-md transition-all duration-500 hover:scale-105 hover:shadow-xl">
                <div className="absolute inset-0 bg-gradient-to-r from-rose-500 to-violet-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
                <span className="relative">BEGIN EXPLORATION</span>
              </button>
            </Link>
            <a
              href="https://api.nasa.gov/#browseAPI"
              target="_blank"
              rel="noopener noreferrer"
              className="relative overflow-hidden bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-blue-500 hover:to-cyan-500 text-white font-bold py-4 px-8 rounded-md transition-all duration-500 hover:scale-105 hover:shadow-xl"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
              <span className="relative flex items-center">
                LEARN MORE
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="inline-block ml-2 w-6 h-6 transition-transform duration-300 group-hover:translate-x-1"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.72 7.72a.75.75 0 011.06 0l3.75 3.75a.75.75 0 010 1.06l-3.75 3.75a.75.75 0 11-1.06-1.06l2.47-2.47H3a.75.75 0 010-1.5h16.19l-2.47-2.47a.75.75 0 010-1.06z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageSlider;
