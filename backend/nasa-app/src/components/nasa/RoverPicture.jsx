import { useState, useEffect } from "react";
import { fetchRoverPhotos } from "../../services/ApiService";
import { FaArrowLeft, FaArrowRight, FaTimes } from "react-icons/fa";

const RoverPhotos = () => {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedCamera, setSelectedCamera] = useState("");

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setShowModal(false);
      } else if (event.key === "ArrowLeft") {
        handlePrevious();
      } else if (event.key === "ArrowRight") {
        handleNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  });

  const handleFetchPhotos = async () => {
    setLoading(true);
    setError(null);
    try {
      const photosData = await fetchRoverPhotos(
        selectedDate,
        selectedCamera,
        "curiosity"
      );
      if (photosData.photos.length === 0) {
        setError("No photos available for the selected date and camera.");
      } else {
        setPhotos(photosData.photos);
        setCurrentIndex(0);
        setShowModal(true);
      }
    } catch (error) {
      setError("Failed to fetch rover photos.");
    } finally {
      setLoading(false);
    }
  };

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? photos.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === photos.length - 1 ? 0 : prevIndex + 1
    );
  };

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
        blur: "10px",
      }}
    >
      <div className="flex flex-col items-center justify-center bg-gradient-to-r from-indigo-900 via-purple-900 to-pink-900 relative"></div>

      <div className="rover-photos-form-container bg-white bg-opacity-90 p-8 rounded-lg shadow-lg max-w-md w-full z-10 mt-0">
        <h2 className="text-2xl font-bold mb-4 text-center text-gray-800 flex items-center justify-center">
          CURIOSITY ROVER PHOTOS
        </h2>
        <div className="mb-4">
          <label
            htmlFor="date"
            className="block text-gray-700 font-bold mb-2 text-sm"
          >
            Select a Date:
          </label>
          <input
            type="date"
            id="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="camera"
            className="block text-gray-700 font-bold mb-2 text-sm"
          >
            Select a Camera:
          </label>
          <select
            id="camera"
            value={selectedCamera}
            onChange={(e) => setSelectedCamera(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="">Select a camera</option>
            <option value="FHAZ">Front Hazard Avoidance Camera</option>
            <option value="RHAZ">Rear Hazard Avoidance Camera</option>
            <option value="MAST">Mast Camera</option>
            <option value="CHEMCAM">Chemistry and Camera Complex</option>
            <option value="MAHLI">Mars Hand Lens Imager</option>
            <option value="MARDI">Mars Descent Imager</option>
            <option value="NAVCAM">Navigation Camera</option>
          </select>
        </div>

        <button
          onClick={handleFetchPhotos}
          disabled={!selectedCamera || !selectedDate}
          className={`bg-sky-900 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full transition-all duration-300 ${
            !selectedCamera || !selectedDate
              ? "opacity-50 cursor-not-allowed"
              : ""
          }`}
        >
          Fetch Photos
        </button>

        {loading && (
          <div className="mt-4 text-gray-600 text-center">Loading...</div>
        )}
        {error && <div className="mt-4 text-red-600 text-center">{error}</div>}
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 mt-20">
          <div className="relative bg-white rounded-lg shadow-lg max-w-md mx-auto">
            <div className="p-4">
              <div className="relative">
                <FaArrowLeft
                  className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-600 cursor-pointer z-20 hover:text-indigo-600 transition-colors duration-300 lg:text-2xl"
                  onClick={handlePrevious}
                />
                {photos.length > 0 ? (
                  <img
                    src={photos[currentIndex]?.img_src || ""}
                    alt={photos[currentIndex]?.rover.name || ""}
                    className="w-full h-auto mx-auto max-h-[80vh] object-contain rounded-lg"
                  />
                ) : (
                  <div className="w-full h-[80vh] flex items-center justify-center text-gray-500">
                    No photos available for the selected date and camera.
                  </div>
                )}
                <FaArrowRight
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-600 cursor-pointer z-20 hover:text-indigo-600 transition-colors duration-300 lg:text-2xl"
                  onClick={handleNext}
                />
                <div className="p-2 text-center style-bold">
                  {photos.length > 0 && (
                    <p className="text-sm md:text-base text-gray-800">
                      {photos[currentIndex]?.rover.name} {""}
                      {photos[currentIndex]?.earth_date}
                    </p>
                  )}
                </div>
              </div>
            </div>
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-800 transition-colors duration-300 focus:outline-none"
            >
              <FaTimes className="text-2xl" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
export default RoverPhotos;
