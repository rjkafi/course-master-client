import { FaFacebook, FaGoogle, FaLinkedin } from "react-icons/fa";

export default function SignIn() {
  return (
    <div className="min-h-screen flex items-center justify-center  p-4">
      <div className="w-full max-w-4xl bg-white rounded-3xl shadow-xl overflow-hidden grid grid-cols-1 md:grid-cols-2">
        {/* LEFT PANEL (HIDE IN MOBILE) */}
        <div className="hidden md:flex flex-col justify-center items-center bg-linear-to-br from-[#432371] to-[#6231a8] text-white p-10 rounded-l-3xl">
          <h2 className="text-3xl font-bold mb-3">Welcome Back!</h2>
          <p className="text-center text-sm opacity-90 mb-6">
            Enter your personal details to log in and continue learning.
          </p>
          <button className="px-6 py-2 mt-3 rounded-lg bg-white text-purple-700 font-semibold hover:bg-gray-200 transition">
            SIGN IN
          </button>
        </div>

        {/* RIGHT PANEL */}
        <div className="p-8 md:p-10 flex flex-col justify-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Create Account
          </h2>

          {/* Social Login Icons */}
          <div className="flex space-x-4 mb-4">
            <button className="p-2 border rounded-full hover:bg-gray-100">
              <FaGoogle />
            </button>
            <button className="p-2 border rounded-full hover:bg-gray-100">
              <FaFacebook />
            </button>
            <button className="p-2 border rounded-full hover:bg-gray-100">
              <FaLinkedin />
            </button>
          </div>

          <p className="text-sm text-gray-500 mb-4">
            or use your email for registration
          </p>

          {/* FORM */}
          <form className="space-y-4">
            <input
              type="text"
              placeholder="Name"
              className="w-full p-3 rounded-lg bg-gray-100 outline-none focus:ring-2 focus:ring-purple-400"
            />
            <input
              type="email"
              placeholder="Email"
              className="w-full p-3 rounded-lg bg-gray-100 outline-none focus:ring-2 focus:ring-purple-400"
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full p-3 rounded-lg bg-gray-100 outline-none focus:ring-2 focus:ring-purple-400"
            />

            <button
              type="submit"
              className="w-full bg-[#432371] text-white py-3 rounded-lg font-semibold hover:bg-[#5b34a2] transition"
            >
              SIGN UP
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
