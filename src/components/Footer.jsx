import { FaFacebook, FaGithub, FaLinkedin } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="bg-[#0e0b26] text-white py-10 px-6">
      <div className="container mx-auto grid md:grid-cols-3 gap-10 text-center md:text-left">
        {/* About CourseMaster */}
        <div>
          <h2 className="text-xl font-bold mb-3">About CourseMaster</h2>
          <p className="text-sm leading-6 text-gray-300">
            CourseMaster is a modern and scalable EdTech platform designed to
            help students learn efficiently and instructors manage courses
            effortlessly. Built with the MERN stack focusing on performance,
            security, and a smooth learning experience.
          </p>
        </div>

        {/* Platform Links */}
        <div>
          <h2 className="text-xl font-bold mb-3">Platform Links</h2>
          <ul className="space-y-2">
            <li>
              <a href="/courses" className="text-sm hover:text-blue-400">
                Browse Courses
              </a>
            </li>
            <li>
              <a href="/dashboard" className="text-sm hover:text-blue-400">
                Student Dashboard
              </a>
            </li>
            <li>
              <a href="/admin" className="text-sm hover:text-blue-400">
                Admin Panel
              </a>
            </li>
          </ul>
        </div>

        {/* Developer Info + Social */}
        <div>
          <h2 className="text-xl font-bold mb-3">Developer</h2>
          <p className="text-sm mb-3 text-gray-300">
            Developed by{" "}
            <span className="font-semibold">Md. Abdullah Al Kafi</span>, MERN
            Stack Developer passionate about building real-world,
            production-ready applications.
          </p>

          <div className="flex justify-center md:justify-start space-x-4 mt-2">
            <a
              href="https://github.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xl hover:text-blue-400"
            >
              <FaGithub />
            </a>

            <a
              href="https://facebook.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xl hover:text-blue-400"
            >
              <FaFacebook />
            </a>

            <a
              href="https://linkedin.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xl hover:text-blue-400"
            >
              <FaLinkedin />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="text-center mt-10 text-sm border-t border-gray-700 pt-4">
        © {new Date().getFullYear()} CourseMaster — All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
