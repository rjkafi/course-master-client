import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const ManageCourses = () => {
  const axios = useAxiosPublic();
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);

  // Fetch courses
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await axios.get("/courses");
        setCourses(res.data.courses);
      } catch (err) {
        console.error(err);
      }
    };
    fetchCourses();
  }, [axios]);
  //   View Details
  const handleView = async (id) => {
    try {
      const res = await axios.get(`/courses/${id}`);
      setSelectedCourse(res.data);
      setShowViewModal(true);
    } catch (err) {
      console.error(err);
    }
  };
  // CloseView Modal
  const closeViewModal = () => {
    setShowViewModal(false);
    setSelectedCourse(null);
  };

  // Open update modal
  const handleEdit = (course) => {
    setSelectedCourse(course);
    setShowUpdateModal(true);
  };

  // Close modal
  const closeModal = () => {
    setSelectedCourse(null);
    setShowUpdateModal(false);
  };

  // Update course
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        `/courses/${selectedCourse._id}`,
        selectedCourse
      );
      setCourses(courses.map((c) => (c._id === res.data._id ? res.data : c)));
      closeModal();

      // SweetAlert success
      Swal.fire({
        icon: "success",
        title: "Updated!",
        text: "Course updated successfully",
        timer: 2000,
        showConfirmButton: false,
      });
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: "error",
        title: "Update failed",
        text: "Something went wrong!",
      });
    }
  };

  // Delete course
  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`/courses/${id}`);
          setCourses(courses.filter((c) => c._id !== id));
          Swal.fire({
            icon: "success",
            title: "Deleted!",
            text: "Course has been deleted.",
            timer: 2000,
            showConfirmButton: false,
          });
        } catch (err) {
          console.error(err);
          Swal.fire({
            icon: "error",
            title: "Delete failed",
            text: "Something went wrong!",
          });
        }
      }
    });
  };

  return (
    <div className="p-6 bg-[#0B1120] min-h-screen text-white">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-400">
        Manage Courses
      </h1>

      <div className="w-full">
        {/* Table for medium+ devices */}
        <div className="hidden md:block overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-700 bg-[#111827] rounded-lg">
            <thead className="bg-[#1f2937]">
              <tr>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-300">
                  Title
                </th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-300">
                  Instructor
                </th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-300">
                  Price
                </th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-300">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {courses.map((course) => (
                <tr key={course._id} className="hover:bg-gray-800 transition">
                  <td className="px-4 py-2">{course.title}</td>
                  <td className="px-4 py-2">{course.instructor}</td>
                  <td className="px-4 py-2">${course.price}</td>
                  <td className="px-4 py-2 space-x-2">
                    <button
                      onClick={() => handleView(course._id)}
                      className="px-3 py-1 bg-blue-500 hover:bg-blue-600 rounded text-white text-sm"
                    >
                      View
                    </button>
                    <button
                      onClick={() => handleEdit(course)}
                      className="px-3 py-1 bg-blue-500 hover:bg-blue-600 rounded text-white text-sm"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(course._id)}
                      className="px-3 py-1 bg-red-500 hover:bg-red-600 rounded text-white text-sm"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Card view for small devices */}
        <div className="md:hidden space-y-4">
          {courses.map((course) => (
            <div
              key={course._id}
              className="bg-[#111827] border border-gray-700 rounded-lg p-4 shadow-sm space-y-2"
            >
              <h3 className="text-lg font-semibold text-white">
                {course.title}
              </h3>
              <p className="text-gray-300 text-sm">
                Instructor: {course.instructor}
              </p>
              <p className="text-gray-300 text-sm">Price: ${course.price}</p>
              <div className="flex space-x-2 mt-2">
                <button
                  onClick={() => handleEdit(course)}
                  className="flex-1 px-3 py-1 bg-blue-500 hover:bg-blue-600 rounded text-white text-sm"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(course._id)}
                  className="flex-1 px-3 py-1 bg-red-500 hover:bg-red-600 rounded text-white text-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/*View Modal */}
      {showViewModal && selectedCourse && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
          <div className="bg-[#111827] p-6 rounded-lg w-full max-w-2xl relative">
            <button
              onClick={closeViewModal}
              className="absolute top-3 right-3 text-gray-300 hover:text-white font-bold text-xl"
            >
              &times;
            </button>
            <h2 className="text-2xl font-bold mb-2">{selectedCourse.title}</h2>
            <p className="text-gray-400 mb-2">{selectedCourse.description}</p>
            <p className="text-gray-300 mb-1">
              Instructor: {selectedCourse.instructor}
            </p>
            <p className="text-gray-300 mb-1">Price: ${selectedCourse.price}</p>
            <p className="text-gray-300 mb-2">
              Category: {selectedCourse.category}
            </p>
            <div className="flex flex-wrap gap-2 mb-4">
              {selectedCourse.tags?.map((tag, i) => (
                <span
                  key={i}
                  className="bg-blue-500/10 text-blue-400 text-xs px-3 py-1 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Syllabus */}
            <div className="mb-4">
              <h3 className="text-xl font-semibold mb-2">Syllabus</h3>
              <ul className="list-disc list-inside text-gray-400">
                {selectedCourse.lessons?.length === 0 && (
                  <li>No lessons added yet.</li>
                )}
                {selectedCourse.lessons?.map((lesson, i) => (
                  <li key={i}>
                    {lesson.order}. {lesson.title}{" "}
                    {lesson.content && `- ${lesson.content}`}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Update Modal */}
      {showUpdateModal && selectedCourse && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4  py-6 overflow-auto">
          <div className="bg-[#111827] p-6 rounded-2xl w-full max-w-2xl relative shadow-2xl shadow-black/50">
            <button
              onClick={closeModal}
              className="absolute top-3 right-3 text-gray-300 hover:text-white font-bold text-2xl"
            >
              &times;
            </button>
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">
              Update Course
            </h2>

            <form onSubmit={handleUpdate} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Title */}
                <label className="flex flex-col gap-1 text-gray-300">
                  <span className="text-sm font-medium">Title</span>
                  <input
                    type="text"
                    value={selectedCourse.title}
                    onChange={(e) =>
                      setSelectedCourse({
                        ...selectedCourse,
                        title: e.target.value,
                      })
                    }
                    className="w-full px-4 py-2 rounded-2xl bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </label>

                {/* Instructor */}
                <label className="flex flex-col gap-1 text-gray-300">
                  <span className="text-sm font-medium">Instructor</span>
                  <input
                    type="text"
                    value={selectedCourse.instructor}
                    onChange={(e) =>
                      setSelectedCourse({
                        ...selectedCourse,
                        instructor: e.target.value,
                      })
                    }
                    className="w-full px-4 py-2 rounded-2xl bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </label>

                {/* Price */}
                <label className="flex flex-col gap-1 text-gray-300">
                  <span className="text-sm font-medium">Price ($)</span>
                  <input
                    type="number"
                    value={selectedCourse.price}
                    onChange={(e) =>
                      setSelectedCourse({
                        ...selectedCourse,
                        price: parseFloat(e.target.value),
                      })
                    }
                    className="w-full px-4 py-2 rounded-2xl bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </label>

                {/* Category */}
                <label className="flex flex-col gap-1 text-gray-300">
                  <span className="text-sm font-medium">Category</span>
                  <input
                    type="text"
                    value={selectedCourse.category}
                    onChange={(e) =>
                      setSelectedCourse({
                        ...selectedCourse,
                        category: e.target.value,
                      })
                    }
                    className="w-full px-4 py-2 rounded-2xl bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </label>
              </div>

              {/* Description */}
              <label className="flex flex-col gap-1 text-gray-300">
                <span className="text-sm font-medium">Description</span>
                <textarea
                  value={selectedCourse.description}
                  onChange={(e) =>
                    setSelectedCourse({
                      ...selectedCourse,
                      description: e.target.value,
                    })
                  }
                  className="w-full px-4 py-2 rounded-2xl bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  rows={4}
                />
              </label>

              {/* Tags */}
              <label className="flex flex-col gap-1 text-gray-300">
                <span className="text-sm font-medium">
                  Tags (comma separated)
                </span>
                <input
                  type="text"
                  value={selectedCourse.tags?.join(", ")}
                  onChange={(e) =>
                    setSelectedCourse({
                      ...selectedCourse,
                      tags: e.target.value.split(",").map((t) => t.trim()),
                    })
                  }
                  className="w-full px-4 py-2 rounded-2xl bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </label>

              {/* Enroll / Update Buttons */}
              <div className="flex flex-col md:flex-row md:justify-between gap-4 mt-4">
                <button
                  type="submit"
                  className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-2xl transition"
                >
                  Update Course
                </button>
                <button
                  type="button"
                  onClick={closeModal}
                  className="flex-1 border border-gray-600 text-gray-300 hover:text-white hover:border-gray-400 font-semibold py-3 rounded-2xl transition"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageCourses;
