import { useState, useRef, useEffect } from "react";
import { fetchDonki } from "../../services/ApiService";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { BsCalendarDate } from "react-icons/bs";
import { TbAdjustmentsHorizontal } from "react-icons/tb";

const DonkiNotification = () => {
  const [donkiData, setDonkiData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [type, setType] = useState("all");
  const [showFilters, setShowFilters] = useState(false);
  const scrollContainerRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = await fetchDonki(startDate, endDate);
      setDonkiData(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const scrollLeft = () => {
    scrollContainerRef.current.scrollLeft -= 300;
  };

  const scrollRight = () => {
    scrollContainerRef.current.scrollLeft += 300;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchDonki();
        setDonkiData(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-cyan-800"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-red-900 to-pink-900">
        <p className="text-white text-xl font-bold">{error}</p>
      </div>
    );
  }

  return (
    <div
      className=" bg-gradient-to-br from-sky-900 to-sky-900 py-10 px-2 rounded"
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
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-white mb-8 drop-shadow-md underline">
          DONKI NOTIFICATIONS
        </h2>
        <div className="bg-white opacity-75 rounded-lg shadow-lg p-1 mb-4">
          {/* Filters */}
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-bold text-sky-900">Filters</h3>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="bg-sky-500 hover:bg-sky-600 text-white font-bold py-2 px-4 rounded mt-4 mr-7 flex items-center justify-center transition-colors duration-300"
            >
              <TbAdjustmentsHorizontal className="text-sm" />
              {showFilters ? "Hide Filters" : "Show Filters"}
            </button>
          </div>
          {showFilters && (
            <form
              onSubmit={handleSubmit}
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              {/* Date filters */}
              <div>
                <label
                  htmlFor="startDate"
                  className="block text-sky-900 font-bold mb-2"
                >
                  Start Date
                </label>
                <div className="relative">
                  <BsCalendarDate className="absolute top-1/2 transform -translate-y-1/2 left-3 text-sky-500 text-sm" />
                  <input
                    type="date"
                    id="startDate"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="shadow appearance-none border rounded w-full py-2 px-8 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="endDate"
                  className="block text-sky-900 font-bold mb-2"
                >
                  End Date
                </label>
                <div className="relative">
                  <BsCalendarDate className="absolute top-1/2 transform -translate-y-1/2 left-3 text-sky-500 text-sm" />
                  <input
                    type="date"
                    id="endDate"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="shadow appearance-none border rounded w-full py-2 px-8 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                </div>
              </div>
              {/* Type filter */}
              <div>
                <label
                  htmlFor="type"
                  className="block text-sky-900 font-bold mb-2"
                >
                  Type
                </label>
                <select
                  id="type"
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                >
                  <option value="all">All</option>
                  <option value="FLR">Solar Flare</option>
                  <option value="CME">Coronal Mass Ejection</option>
                  <option value="SEP">Solar Energetic Particle</option>
                  <option value="IPS">Interplanetary Shock</option>
                  <option value="MPC">Magnetopause Crossing</option>
                  <option value="RBE">Radiation Belt Enhancement</option>
                  <option value="HSS">High Speed Stream</option>
                </select>
              </div>
              {/* Submit button */}
              <div className="md:col-span-3">
                <button
                  type="submit"
                  className="bg-sky-500 hover:bg-sky-600 text-white font-bold py-3 px-6 rounded focus:outline-none focus:shadow-outline transition-colors duration-300 w-full"
                >
                  Fetch Data
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Notifications */}
        {donkiData && (
          <div className="relative">
            <div className="flex justify-between mb-4">
              <button
                onClick={scrollLeft}
                className="bg-sky-500 hover:bg-sky-600 text-white font-bold py-2 px-4 rounded-l flex items-center"
              >
                <FaArrowLeft className="text-sm mr-2" />
                Prev
              </button>
              <button
                onClick={scrollRight}
                className="bg-sky-500 hover:bg-sky-600 text-white font-bold py-2 px-4 rounded-r flex items-center"
              >
                Next
                <FaArrowRight className="text-sm ml-2" />
              </button>
            </div>
            <div
              ref={scrollContainerRef}
              className="flex overflow-x-auto scroll-smooth py-4 gap-8"
            >
              {donkiData
                .filter((event) => type === "all" || event.messageType === type)
                .map((event, index) => (
                  <div
                    key={index}
                    className={`p-6 rounded-lg shadow-md flex flex-col items-center justify-between bg-gradient-to-r min-w-[280px] ${
                      event.messageType === "FLR"
                        ? "from-red-500 to-red-700"
                        : event.messageType === "CME"
                        ? "from-orange-500 to-orange-700"
                        : event.messageType === "SEP"
                        ? "from-yellow-500 to-yellow-700"
                        : event.messageType === "IPS"
                        ? "from-green-500 to-green-700"
                        : event.messageType === "MPC"
                        ? "from-sky-500 to-sky-700"
                        : event.messageType === "RBE"
                        ? "from-indigo-500 to-indigo-700"
                        : event.messageType === "HSS"
                        ? "from-purple-500 to-purple-700"
                        : "from-gray-500 to-gray-700"
                    }`}
                  >
                    <h3 className="text-2xl font-bold text-white mb-2">
                      {event.messageType}
                    </h3>
                    <p className="text-lg text-gray-200 font-medium mb-1">
                      ID: {event.messageID}
                    </p>
                    <p className="text-base text-gray-300 mb-4">
                      Issue Time: {event.messageIssueTime}
                    </p>
                    <a
                      href={event.messageURL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-white hover:bg-gray-200 text-gray-900 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors duration-300"
                    >
                      View Message
                    </a>
                  </div>
                ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DonkiNotification;
