import { useEffect, useState } from "react";
import useAxiosPublic from "../hooks/useAxiosPublic";

const Courses = () => {
  const axios = useAxiosPublic();
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleView = async (id) => {
    try {
      const res = await axios.get(`/courses/${id}`);
      setSelectedCourse(res.data);
      setShowModal(true);
    } catch (err) {
      console.error(err);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedCourse(null);
  };

  const handleEnroll = async (courseId) => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login first to enroll!");
      return;
    }

    try {
      await axios.post(
        `/courses/${courseId}/enroll`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Enrolled Successfully!");
      closeModal();
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Enrollment failed");
    }
  };

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

  return (
    <section className="py-16 px-4 md:px-10 bg-[#0B1120] text-white">
      <div className="max-w-7xl mx-auto text-center mb-12">
        <p className="text-blue-400 font-medium mb-2">Our Courses</p>
        <h2 className="text-3xl md:text-4xl font-bold">
          Explore <span className="text-blue-400">Courses</span> We Offer
        </h2>
        <p className="mt-4 text-gray-400 max-w-2xl mx-auto">
          Learn from industry experts with our curated courses.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <div
            key={course._id}
            className="group relative bg-[#111827] border border-blue-500/20 rounded-xl p-6 overflow-hidden hover:bg-[#1f2937] transition-all duration-300"
          >
            <div className="w-12 h-12 mb-4 rounded-md bg-blue-500/10 flex items-center justify-center transition-transform duration-300 transform group-hover:scale-110">
              <span className="text-blue-400 font-bold text-lg">
                {course.title[0]}
              </span>
            </div>
            <h3 className="text-xl font-semibold mb-2">{course.title}</h3>
            <p className="text-gray-400 mb-4 text-sm leading-relaxed">
              {course.description}
            </p>
            <p className="text-gray-300 text-sm mb-2">
              Instructor: {course.instructor}
            </p>
            <p className="text-gray-300 text-sm mb-2">Price: ${course.price}</p>
            <div className="flex flex-wrap gap-2 mb-3">
              {course.tags?.map((tag, i) => (
                <span
                  key={i}
                  className="bg-blue-500/10 text-blue-400 text-xs px-3 py-1 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
            <button
              onClick={() => handleView(course._id)}
              className="mt-2 w-full py-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white font-semibold transition"
            >
              View
            </button>
          </div>
        ))}
      </div>

      {/* Modal */}
      {showModal && selectedCourse && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
          <div className="bg-[#111827] p-6 rounded-lg w-full max-w-2xl relative">
            <button
              onClick={closeModal}
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

            <button
              onClick={() => handleEnroll(selectedCourse._id)}
              className="w-full bg-blue-500 hover:bg-blue-600 py-2 rounded-lg font-semibold"
            >
              Enroll Now
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default Courses;
