import ImageSlider from "../components/common/ImageSlider";
//import RecentPhotos from "../components/common/RecentPhotos";

const images = [
  "https://wallpapers.com/images/hd/1920x1080-hd-space-73omyic75ep59863.jpg",
];

export default function Home() {
  return (
    <div className="flex flex-col justify-center items-center">
      {/* <h1 className="text-4xl font-bold text-sky-950 mt-10 bg-gray-300 border-cyan-400 p-4 rounded-lg">
        Welcome to the NASA API Application
      </h1> */}
      <br />
      <ImageSlider images={images} interval={10000} />
      <div className="mt-20">{/* <RecentPhotos /> */}</div>
    </div>
  );
}
