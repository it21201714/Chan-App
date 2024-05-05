/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unknown-property */
import { useEffect, useState } from "react";
import { fetchApodPicture } from "../../services/ApiService";
import { useLocation } from "react-router-dom";
import RecentPhotos from "./../common/RecentPhotos";

const ApodPicture = () => {
  const location = useLocation();
  const [picture, setPicture] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const pictureData = location.state?.selectedImage
          ? location.state.selectedImage
          : await fetchApodPicture();
        setPicture(pictureData);
        console.log(pictureData);
      } catch (error) {
        setError("Failed to fetch astronomy picture.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [location.state]);

  const handleDateChange = (e) => {
    const date = new Date(e.target.value);
    const today = new Date();

    if (date > today) {
      setError("Please select a past date.");
    } else {
      setSelectedDate(e.target.value);
      setError(null);
    }
  };

  const fetchSelectedDate = async () => {
    if (selectedDate) {
      try {
        setLoading(true);
        const pictureData = await fetchApodPicture(selectedDate);
        setPicture(pictureData);
      } catch (error) {
        setError("Failed to fetch astronomy picture.");
      } finally {
        setLoading(false);
      }
    } else {
      alert("Please select a date.");
    }
  };

  if (loading) {
    return (
      <div className="relative min-h-screen flex justify-center items-center">
        <div className="absolute inset-0 bg-gradient-to-b from-black to-indigo-900 opacity-75"></div>
        <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-rose-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="relative min-h-screen flex justify-center items-center">
        <div className="absolute inset-0 bg-gradient-to-b from-black to-indigo-900 opacity-75"></div>
        <p className="text-rose-500 text-2xl font-bold">{error}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-4xl font-bold mb-8 text-gray-800 text-center">
        <span className="bg-gradient-to-r from-rose-500 to-violet-500 bg-clip-text text-transparent">
          ASTRONOMY PICTURE OF THE DAY
        </span>
      </h1>
      <div className="bg-gray-100 rounded-lg shadow-lg p-8 flex flex-col md:flex-row">
        <div className="md:w-1/2 mb-6 md:mb-0">
          {picture.media_type === "image" ? (
            <img
              src={picture.url}
              alt={picture.title}
              className="rounded-lg shadow-md mx-auto"
            />
          ) : (
            <iframe
              title="space-video"
              src={picture.url}
              frameBorder="0"
              gesture="media"
              allow="encrypted-media"
              allowFullScreen
              className="w-full h-96 rounded-lg shadow-md mx-auto"
            />
          )}
          <div className="mt-4 flex justify-center">
            <input
              type="date"
              max={new Date().toISOString().split("T")[0]}
              value={selectedDate || ""}
              onChange={handleDateChange}
              className="px-4 py-2 rounded-lg border border-gray-300 mr-2"
            />
            <button
              onClick={fetchSelectedDate}
              className="bg-violet-600 hover:bg-violet-700 text-white font-semibold py-1 px-5 rounded-lg transition-colors duration-300"
            >
              See Image
            </button>
          </div>
        </div>
        <div className="md:w-1/2 md:pl-8">
          <div className="text-center">
            <h4 className="text-3xl font-bold mb-2 text-gray-800">
              {picture.title}
            </h4>
            <h5 className="text-lg font-semibold mb-4 text-gray-600">
              {selectedDate
                ? new Date(selectedDate).toLocaleDateString()
                : picture.date}
            </h5>
            <h4 className="text-xl font-semibold mb-4 text-gray-800">
              {picture.copyright}
            </h4>
          </div>
          <p className="text-gray-700 leading-relaxed text-lg mb-6 text-justify">
            {picture.explanation}
          </p>
          <div className="flex justify-center">
            <a
              href={picture.hdurl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-violet-600 hover:bg-violet-700 text-white font-semibold py-2 px-6 rounded transition-colors duration-300"
            >
              View High-Res Image
            </a>
          </div>
        </div>
      </div>
      <RecentPhotos />
    </div>
  );
};

export default ApodPicture;
