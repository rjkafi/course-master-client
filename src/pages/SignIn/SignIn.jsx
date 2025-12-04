import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaFacebook, FaGoogle, FaLinkedin } from "react-icons/fa";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosPublic from "../../hooks/useAxiosPublic";

export default function SignIn() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({ mode: "onChange" });

  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => setShowPassword(!showPassword);

  const onSubmit = async (data) => {
    try {
      const res = await axiosPublic.post("/auth/login", {
        email: data.email,
        password: data.password,
      });

      if (res.data?.token) {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));

        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Login successful!",
          showConfirmButton: false,
          timer: 1500,
        });

        navigate("/");
      }
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: err.response?.data?.message || "Invalid email or password",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-4xl bg-white rounded-3xl shadow-xl overflow-hidden grid grid-cols-1 md:grid-cols-2">
        {/* LEFT SIDE */}
        <div className="w-full bg-linear-to-r from-purple-700 to-blue-700 flex flex-col items-center justify-center text-white p-8 md:p-10">
          <h2 className="text-3xl font-bold mb-3">Welcome Back, Learner!</h2>
          <p className="text-center text-sm opacity-90 mb-6">
            Enter your personal details and start your learning journey with us.
          </p>
          <Link to="/signup">
            <button className="border-2 border-white px-6 py-2 rounded-full font-semibold hover:bg-white hover:text-blue-700 transition">
              SIGN UP
            </button>
          </Link>
        </div>

        {/* RIGHT SIDE */}
        <div className="p-8 md:p-10 flex flex-col justify-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Sign In</h2>

          {/* Social Icons Disabled */}
          <div className="flex space-x-4 mb-4 opacity-50 pointer-events-none">
            <button className="p-2 border rounded-full">
              <FaGoogle />
            </button>
            <button className="p-2 border rounded-full">
              <FaFacebook />
            </button>
            <button className="p-2 border rounded-full">
              <FaLinkedin />
            </button>
          </div>

          <p className="text-sm text-gray-500 mb-4">
            or login using your email
          </p>

          {/* LOGIN FORM */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Email */}
            <input
              type="email"
              {...register("email", { required: true })}
              placeholder="Email"
              className="w-full p-3 rounded-lg bg-gray-100 outline-none focus:ring-2 focus:ring-purple-400"
            />
            {errors.email && (
              <p className="text-red-600 text-sm">Email is required</p>
            )}

            {/* Password */}
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                {...register("password", { required: true })}
                placeholder="Password"
                className="w-full p-3 rounded-lg bg-gray-100 outline-none focus:ring-2 focus:ring-purple-400"
              />

              <button
                type="button"
                onClick={togglePassword}
                className="absolute right-3 top-3 text-xl"
              >
                {showPassword ? <IoMdEyeOff /> : <IoMdEye />}
              </button>
            </div>

            {errors.password && (
              <p className="text-red-600 text-sm">Password is required</p>
            )}

            {/* Submit Button (Enabled only when email & password exist) */}
            <button
              type="submit"
              disabled={!isValid}
              className={`w-full py-3 rounded-lg font-semibold transition ${
                !isValid
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-[#432371] text-white hover:bg-[#5b34a2]"
              }`}
            >
              SIGN IN
            </button>
          </form>

          {/* Redirect */}
          <p className="mt-4 text-gray-700 text-sm text-center">
            Don't have an account?{" "}
            <Link to="/signup" className="text-purple-600 hover:underline">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
