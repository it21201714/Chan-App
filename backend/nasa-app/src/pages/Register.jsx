import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Reset error state
    setError("");

    // Simple form validation
    if (!name || !email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    if (name.length < 3) {
      setError("Name must be at least 3 characters.");
      return;
    }

    axios
      .post("/api/users/register", {
        name,
        email,
        password,
      })
      .then((res) => {
        console.log(res);
        alert("Account created successfully. Please login.");
        navigate("/");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div
      className="image-slider h-screen w-screen flex flex-col items-center justify-center relative overflow-hidden"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: -1,
        backgroundImage: `url("https://wallpapersmug.com/download/1920x1080/8d554d/celestial-world-digital-art-space-colorful.jpg")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        width: "100vw",
        height: "100vh",
      }}
    >
      <div className="flex items-center justify-center min-h-screen">
        <div className="p-8 rounded-xl shadow-2xl max-w-md w-full animate-fade-in-up bg-transparent">
          <h2 className="text-4xl font-extrabold mb-8 text-center text-white">
            CREATE ACCOUNT
          </h2>
          {error && (
            <div className="bg-red-500 text-white p-4 rounded mb-4">
              {error}
            </div>
          )}
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-semibold text-gray-300"
              >
                Name
              </label>
              <div className="mt-1">
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="appearance-none block w-full px-3 py-2 bg-transparent border-2 border-gray-300 rounded-md shadow-sm placeholder-gray-400 text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-all duration-300"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-gray-300"
              >
                Email address
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="appearance-none block w-full px-3 py-2 bg-transparent border-2 border-gray-300 rounded-md shadow-sm placeholder-gray-400 text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-all duration-300"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-semibold text-gray-300"
              >
                Password
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="appearance-none block w-full px-3 py-2 bg-transparent border-2 border-gray-300 rounded-md shadow-sm placeholder-gray-400 text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-all duration-300"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-base font-semibold text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-300 transform hover:scale-105 active:scale-95"
              >
                Sign up
              </button>
            </div>
          </form>
          <div className="mt-6 text-center text-gray-300">
            Already registered?{" "}
            <button className="text-white underline hover:text- transition-colors duration-300">
              <Link to="/">Login to Account</Link>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
