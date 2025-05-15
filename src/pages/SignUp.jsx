import { useState } from "react";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Email:", email);
    console.log("Password:", password);
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-[#FAF9F7] px-6">
      <div className="bg-white max-w-md w-full p-10 rounded-2xl shadow-lg">
        <h1 className="text-4xl font-light text-center mb-10 text-gray-900 tracking-wide">
          Create an account
        </h1>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-700">
              Email
            </label>
            <input
              type="email"
              placeholder="Your email"
              className="w-full px-5 py-3 rounded-lg border border-gray-300 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400 transition"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-700">
              Password
            </label>
            <input
              type="password"
              placeholder="Choose a password"
              className="w-full px-5 py-3 rounded-lg border border-gray-300 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400 transition"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-3 rounded-xl font-semibold hover:bg-green-700 transition"
          >
            Sign Up
          </button>
        </form>

        <p className="mt-8 text-center text-gray-600 text-sm">
          Already have an account?{" "}
          <a
            href="/login"
            className="text-green-600 font-medium hover:underline"
          >
            Log in
          </a>
        </p>
      </div>
    </main>
  );
}
