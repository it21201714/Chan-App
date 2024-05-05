import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavbarComponent from "./components/common/Navbar";
import Home from "./pages/Home";
import ApodPicture from "./components/nasa/ApodPicture";
import Header from "./components/common/Header";
import RoverPhotos from "./components/nasa/RoverPicture";
// import Footer from "./components/common/Footer";
import Register from "./pages/Register";
import Login from "./pages/Login";
import DonkiNotifications from "./components/nasa/DonkiNotifications";

export default function App() {
  return (
    <Router>
      <Header />
      <NavbarComponent />
      <div className="container mx-auto p-2">
        <Routes>
          <Route path="/home" exact element={<Home />} />
          <Route path="/apod" element={<ApodPicture />} />
          <Route path="/rover" element={<RoverPhotos />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Login />} />
          <Route path="/notifications" element={<DonkiNotifications />} />
        </Routes>
      </div>
      {/* <Footer /> */}
    </Router>
  );
}
