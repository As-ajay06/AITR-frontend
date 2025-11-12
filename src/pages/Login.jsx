import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { API_AUTH_ADMIN, BASE_URL } from "../../config/config";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch(`${BASE_URL}/${API_AUTH_ADMIN}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Login failed");

      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.user.role);

      navigate("/")
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-950 via-slate-900 to-gray-800 text-white px-4">
      <div className="bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl p-10 rounded-2xl w-full max-w-md">
        <h2 className="text-3xl font-bold text-center bg-gradient-to-r from-fuchsia-500 via-cyan-400 to-blue-500 bg-clip-text text-transparent mb-6">
          Welcome Back
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full p-3 rounded-lg bg-gray-900 text-white border border-gray-700 focus:ring-2 focus:ring-cyan-500 outline-none"
              placeholder="Enter your email"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full p-3 rounded-lg bg-gray-900 text-white border border-gray-700 focus:ring-2 focus:ring-cyan-500 outline-none"
              placeholder="Enter your password"
            />
          </div>

          {/* Role */}
          <div>
            <label
              htmlFor="role"
              className="block text-sm font-medium text-gray-300 mb-1"
            >
              Role
            </label>
            <select
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              required
              className="w-full p-3 rounded-lg bg-gray-900 text-white border border-gray-700 focus:ring-2 focus:ring-cyan-500 outline-none"
            >
              <option value="" disabled>
                Select role
              </option>
              <option value="admin">Admin</option>
              <option value="superadmin">Super Admin</option>
            </select>
          </div>

          {/* Error */}
          {error && (
            <p className="text-red-400 text-sm text-center font-semibold">
              {error}
            </p>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:opacity-90 py-3 rounded-lg font-semibold transition-all"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          {/* Link */}
          <p className="text-sm text-center text-gray-400 mt-4">
            forgot password ?{" "}
            <Link
              to="/signup"
              className="text-cyan-400 hover:text-cyan-300 underline transition"
            >
              click here
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
