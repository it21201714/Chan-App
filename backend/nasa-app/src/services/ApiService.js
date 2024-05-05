const API_KEY = import.meta.env.VITE_NASA_API_KEY;
const APOD_URL = import.meta.env.VITE_APOD_URL;
const ROVER_URL = import.meta.env.VITE_MARS_ROVER_URL;
const DONKI_URL = import.meta.env.VITE_DONKI_URL;

export const fetchApodPicture = async (date = null) => {
  const url = date
    ? `${APOD_URL}/apod?api_key=${API_KEY}&date=${date}`
    : `${APOD_URL}/apod?api_key=${API_KEY}`;

  const response = await fetch(url);
  const data = await response.json();

  if (response.ok) {
    return data;
  } else {
    throw new Error(`Failed to fetch APOD picture: ${data.error.message}`);
  }
};

export const fetchRoverPhotos = async (date, camera) => {
  const params = new URLSearchParams({
    api_key: API_KEY,
    earth_date: date,
    camera: camera,
  });

  const response = await fetch(`${ROVER_URL}?${params}`);
  const data = await response.json();

  if (response.ok) {
    return data;
  } else {
    throw new Error(`Failed to fetch rover photos: ${data.error.message}`);
  }
};

export const fetchDonki = async (startDate, endDate, type) => {
  const params = new URLSearchParams({
    startDate: startDate,
    endDate: endDate,
    type: type,
    api_key: API_KEY,
  });

  const response = await fetch(`${DONKI_URL}?${params}`);
  const data = await response.json();

  if (response.ok) {
    return data;
  } else {
    throw new Error(`Failed to fetch DONKI data: ${data.error.message}`);
  }
};
