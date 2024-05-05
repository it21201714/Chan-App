import {
  FaGithub,
  FaTwitter,
  FaInstagram,
  FaEnvelope,
  FaMapMarkerAlt,
  FaPhone,
  FaRocket,
  FaFacebook,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-sky-950 via-cyan-950 to-sky-800 text-gray-300 py-2">
      <div className="container mx-auto px-4 flex flex-col lg:flex-row lg:justify-between">
        <div className="mb-12 lg:mb-0 lg:w-1/3">
          <a
            href="/"
            className="text-white font-bold text-3xl mb-6 flex items-center"
          >
            <FaRocket className="mr-2 text-5xl text-blue-500 animate-pulse" />
            NASA API
          </a>
          <p className="text-sm text-gray-400 mb-6">
            Prepare for an extraordinary journey through <br /> the vast expanse
            of space, where stunning imagery <br /> and groundbreaking
            discoveries await.
          </p>
          <div className="flex space-x-4">
            <a
              href="https://www.facebook.com/NASA"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
            >
              <FaFacebook size={24} />
            </a>
            <a
              href="https://github.com/nasa"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
            >
              <FaGithub size={24} />
            </a>
            <a
              href="https://twitter.com/NASA"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
            >
              <FaTwitter size={24} />
            </a>
            <a
              href="https://www.instagram.com/nasa/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
            >
              <FaInstagram size={24} />
            </a>
          </div>
        </div>
        <div className="flex flex-col lg:flex-row lg:space-x-16 lg:w-2/3">
          <div className="mb-12 lg:mb-0 lg:w-1/2">
            <h3 className="text-white font-bold mb-4 relative after:content-[''] after:bg-blue-500 after:h-1 after:w-12 after:absolute after:bottom-0 after:left-0">
              Resources
            </h3>
            <div className="flex flex-col space-y-2 mt-6">
              <a
                href="/apod"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Astronomy Picture of the Day
              </a>
              <a
                href="/rover"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Mars Rover Photos
              </a>
              <a
                href="/about"
                className="text-gray-400 hover:text-white transition-colors"
              >
                About the Project
              </a>
            </div>
          </div>
          <div className="mb-12 lg:mb-0 lg:w-1/2">
            <h3 className="text-white font-bold mb-4 relative after:content-[''] after:bg-blue-500 after:h-1 after:w-12 after:absolute after:bottom-0 after:left-0">
              Contact
            </h3>
            <div className="flex flex-col space-y-2 mt-6">
              <div className="flex items-center">
                <FaEnvelope className="mr-2 text-blue-500" />
                <a
                  href="mailto:contact@nasaproject.com"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  universe@nasaproject.com
                </a>
              </div>
              <div className="flex items-center">
                <FaMapMarkerAlt className="mr-2 text-blue-500" />
                <p className="text-gray-400">No 11, Main Road, Colombo 07</p>
              </div>
              <div className="flex items-center">
                <FaPhone className="mr-2 text-blue-500" />
                <p className="text-gray-400">(011) 222-6000</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container mx-auto mt-12 flex justify-center items-center">
        <p className="text-sm text-gray-400">
          &copy; {new Date().getFullYear()} Explore Universe. All rights
          reserved.
        </p>
      </div>
      <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-blue-500 via-red-500 to-purple-500 animate-pulse"></div>
    </footer>
  );
};

export default Footer;
