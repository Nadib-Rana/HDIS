import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const Signup: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const validations = [
    { id: "length", text: "At least 8 characters", test: (pwd: string) => pwd.length >= 8 },
    { id: "uppercase", text: "One uppercase letter", test: (pwd: string) => /[A-Z]/.test(pwd) },
    { id: "lowercase", text: "One lowercase letter", test: (pwd: string) => /[a-z]/.test(pwd) },
    { id: "number", text: "One number", test: (pwd: string) => /[0-9]/.test(pwd) },
    { id: "special", text: "One special character (!@#$%^&* etc.)", test: (pwd: string) => /[!@#$%^&*(),.?":{}|<>]/.test(pwd) },
  ];

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    const allValid = validations.every((v) => v.test(password));
    if (!allValid) {
      setMessage("Password does not meet all requirements.");
      return;
    }
    try {
      await axios.post("http://localhost:5000/api/auth/register", {
        name,
        email,
        password,
      });
      setMessage("Signup successful! Redirecting...");
      setTimeout(() => navigate("/"), 1500);
    } catch (err: any) {
      setMessage(err.response?.data?.error || "Signup failed");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white-900">
      <form
        onSubmit={handleSignup}
        className="bg-gray-800 p-8 rounded-3xl shadow-2xl w-96 text-gray-200"
      >
        <h2 className="text-3xl font-extrabold text-center mb-6 text-cyan-400">
          Sign Up
        </h2>

        {message && <p className="text-yellow-400 mb-4 text-center">{message}</p>}

        <input
          type="text"
          placeholder="Full Name"
          className="w-full p-3 mb-4 rounded-xl border border-gray-700 bg-gray-900 text-gray-200 focus:outline-none focus:ring-2 focus:ring-cyan-400"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 mb-4 rounded-xl border border-gray-700 bg-gray-900 text-gray-200 focus:outline-none focus:ring-2 focus:ring-cyan-400"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 mb-2 rounded-xl border border-gray-700 bg-gray-900 text-gray-200 focus:outline-none focus:ring-2 focus:ring-cyan-400"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <ul className="text-sm mb-5">
          {validations.map((v) => {
            const valid = v.test(password);
            return (
              <li
                key={v.id}
                className={`flex items-center gap-2 ${
                  valid ? "text-green-400 line-through" : "text-gray-400"
                }`}
              >
                {valid && "✓"} {v.text}
              </li>
            );
          })}
        </ul>

        <button
          type="submit"
          className="w-full bg-cyan-500 hover:bg-cyan-600 transition-colors p-3 rounded-xl font-semibold text-gray-900"
        >
          Sign Up
        </button>

        <p className="text-sm mt-4 text-center text-gray-400">
          Already have an account?{" "}
          <Link to="/" className="text-cyan-400 hover:underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;
