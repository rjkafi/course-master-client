import { useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAxiosPublic from "../../hooks/useAxiosPublic.jsx";

export default function CreateCourse() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm({ mode: "onChange" });
  const axios = useAxiosPublic();
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = async (data) => {
    setSubmitting(true);
    try {
      // Convert tags string to array
      const tags = data.tags
        ? data.tags.split(",").map((tag) => tag.trim())
        : [];
      const courseData = { ...data, tags };

      const res = await axios.post("/courses", courseData);

      Swal.fire({
        icon: "success",
        title: "Course Created!",
        text: `Course "${res.data.title}" has been added.`,
        timer: 1500,
        showConfirmButton: false,
      });

      reset();
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: err.response?.data?.message || "Something went wrong",
      });
    }
    setSubmitting(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-100">
      <div className="w-full max-w-2xl bg-white shadow-xl rounded-2xl p-8">
        <h2 className="text-2xl font-bold mb-6">Create New Course</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Title */}
          <div>
            <label className="block mb-1 font-medium">Title</label>
            <input
              type="text"
              {...register("title", { required: "Title is required" })}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
            {errors.title && (
              <p className="text-red-600 text-sm">{errors.title.message}</p>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="block mb-1 font-medium">Description</label>
            <textarea
              {...register("description")}
              rows={4}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          {/* Instructor */}
          <div>
            <label className="block mb-1 font-medium">Instructor</label>
            <input
              type="text"
              {...register("instructor", {
                required: "Instructor is required",
              })}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
            {errors.instructor && (
              <p className="text-red-600 text-sm">
                {errors.instructor.message}
              </p>
            )}
          </div>

          {/* Price */}
          <div>
            <label className="block mb-1 font-medium">Price ($)</label>
            <input
              type="number"
              {...register("price", {
                required: "Price is required",
                min: { value: 0, message: "Price must be >= 0" },
              })}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
            {errors.price && (
              <p className="text-red-600 text-sm">{errors.price.message}</p>
            )}
          </div>

          {/* Category */}
          <div>
            <label className="block mb-1 font-medium">Category</label>
            <input
              type="text"
              {...register("category")}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          {/* Tags */}
          <div>
            <label className="block mb-1 font-medium">
              Tags (comma separated)
            </label>
            <input
              type="text"
              {...register("tags")}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={!isValid || submitting}
            className={`w-full py-3 rounded-lg font-semibold text-white ${
              !isValid || submitting
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-700 hover:bg-blue-800"
            } transition`}
          >
            {submitting ? "Creating..." : "Create Course"}
          </button>
        </form>
      </div>
    </div>
  );
}
