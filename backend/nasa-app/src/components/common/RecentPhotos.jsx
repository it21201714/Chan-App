import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_KEY = import.meta.env.VITE_NASA_API_KEY;

const RecentPhotos = () => {
  const [recentPhotos, setRecentPhotos] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecentPhotos = async () => {
      try {
        const response = await axios.get(
          "https://api.nasa.gov/planetary/apod",
          {
            params: {
              api_key: API_KEY,
              count: 12,
              thumbs: true,
            },
          }
        );
        setRecentPhotos(response.data.reverse());
      } catch (error) {
        console.error("Error fetching recent photos:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchRecentPhotos();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-cyan-800"></div>
      </div>
    );
  }

  const handleViewImage = (photo) => {
    navigate("/apod", { state: { selectedImage: photo } });
  };

  return (
    <div className="container mx-auto pt-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
        {recentPhotos.map((photo, index) => (
          <div
            key={index}
            className="group relative overflow-hidden rounded-lg shadow-lg cursor-pointer"
            onClick={() => handleViewImage(photo)}
          >
            <div className="image-container relative">
              <img
                src={photo.thumbnail_url || photo.url}
                alt={photo.title}
                className="w-full h-48 object-cover rounded-lg transition-transform duration-500 ease-in-out group-hover:scale-105"
              />
              <div className="overlay absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out delay-100 bg-black bg-opacity-70 text-white rounded-lg p-4">
                <h3 className="text-lg font-bold mb-2 text-center">
                  {photo.title}
                </h3>
                <p className="text-sm mb-4">
                  {new Date(photo.date).toLocaleDateString()}
                </p>
              </div>
              <div className="image-title absolute top-0 left-0 p-2 bg-black bg-opacity-70 text-white rounded-tr-lg">
                <h3 className="text-sm font-bold">{photo.title}</h3>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentPhotos;
