import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import API from "../api/axios.js";
import GoogleSignIn from "../components/GoogleSignIn.jsx";

function Login({ onLogin }) {
  const [form, setForm] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await API.post("/auth/login", form);
      onLogin(data.token);
      alert("Logged in!");
      navigate("/dashboard");
    } catch (error) {
      alert(error.response?.data?.message || "Login failed");
      console.log("error in login", error);
    }
  };

  const handleGoogleSuccess = (data) => {
    onLogin(data.token);
    alert("Google login successful");
    navigate("/dashboard");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

        <input
          type="text"
          placeholder="Username"
          className="w-full p-3 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) => setForm({ ...form, username: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition"
        >
          Login
        </button>

        <p className="text-sm mt-4 text-center">
          Don’t have an account?{" "}
          <Link to="/register" className="text-blue-500 hover:underline">
            Register here
          </Link>
        </p>

        <hr className="my-6" />

        <GoogleSignIn onSuccess={handleGoogleSuccess} />

        <button
          type="button"
          onClick={() => navigate("/request-reset")}
          className="mt-4 w-full text-red-500 hover:underline"
        >
          Forgot Password?
        </button>
      </form>
    </div>
  );
}

export default Login;
