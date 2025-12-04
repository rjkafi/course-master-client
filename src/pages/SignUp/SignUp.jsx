import { useState } from "react";
import { useForm } from "react-hook-form";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosPublic from "../../hooks/useAxiosPublic";

export default function SignUp() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm();
  const [showPassword, setShowPassword] = useState(false);

  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();

  const togglePassword = () => setShowPassword(!showPassword);

  const onSubmit = async (data) => {
    try {
      const res = await axiosPublic.post("/auth/register", {
        name: data.name,
        email: data.email,
        password: data.password,
      });

      if (res.data?.token) {
        console.log("USer Created Successfully");
        // Save JWT + user info → Later move to Redux
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));

        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Account created successfully!",
          showConfirmButton: false,
          timer: 1500,
        });

        reset();
        navigate("/");
      }
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: err.response?.data?.message || "Something went wrong",
      });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="flex flex-col md:flex-row w-full max-w-4xl h-auto md:h-[500px] shadow-2xl rounded-2xl overflow-hidden">
        {/* Left Side */}
        <div className="w-full md:w-1/2 bg-linear-to-b from-blue-700 to-purple-700 flex flex-col items-center justify-center text-white p-8 md:p-10">
          <h1 className="text-3xl font-bold mb-4">Welcome Back!</h1>
          <p className="text-sm text-center mb-6">
            Enter your personal details to use all features
          </p>
          <Link to="/signin">
            <button className="border-2 border-white px-6 py-2 rounded-full font-semibold hover:bg-white hover:text-blue-700 transition">
              SIGN IN
            </button>
          </Link>
        </div>

        {/* Right Side */}
        <div className="w-full md:w-1/2 bg-white flex flex-col items-center justify-center p-8 md:p-10">
          <h2 className="text-2xl font-bold mb-4">Create Account</h2>
          <p className="text-sm text-gray-500 mb-4">
            Use your email for registration
          </p>

          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Name */}
            <div className="form-control mb-3">
              <label className="label">
                <span className="label-text">Full Name</span>
              </label>
              <input
                type="text"
                {...register("name", { required: true })}
                placeholder="Full Name"
                className="input border border-gray-300 focus:ring-2 focus:ring-blue-600"
              />
              {errors.name && (
                <span className="text-red-600">Name is required</span>
              )}
            </div>

            {/* Email */}
            <div className="form-control mb-3">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                {...register("email", { required: true })}
                placeholder="Email"
                className="input border border-gray-300 focus:ring-2 focus:ring-blue-600"
              />
              {errors.email && (
                <span className="text-red-600">Email is required</span>
              )}
            </div>

            {/* Password */}
            <div className="form-control mb-4 relative">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type={showPassword ? "text" : "password"}
                {...register("password", {
                  required: true,
                  minLength: 6,
                })}
                placeholder="Password"
                className="input border border-gray-300 focus:ring-2 focus:ring-blue-600"
              />

              <button
                type="button"
                onClick={togglePassword}
                className="absolute right-3 top-10 text-xl"
              >
                {showPassword ? <IoMdEyeOff /> : <IoMdEye />}
              </button>

              {errors.password?.type === "required" && (
                <p className="text-red-600">Password is required</p>
              )}
              {errors.password?.type === "minLength" && (
                <p className="text-red-600">Minimum 6 characters</p>
              )}
            </div>

            {/* Submit */}
            <div className="form-control mt-2">
              <button
                disabled={!isValid}
                className={`w-full py-3 rounded-lg font-semibold transition ${
                  !isValid
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-[#432371] text-white hover:bg-[#5b34a2]"
                }`}
                type="submit"
              >
                Create Account
              </button>
            </div>
          </form>

          {/* Already have account */}
          <div className="mt-4">
            <p className="text-gray-800 text-sm">
              Already have an account?
              <Link
                to="/signin"
                className="text-p font-medium ml-2 hover:underline"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
