import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaGraduationCap } from "react-icons/fa";

function Footer() {
  return (
    <footer className="relative w-full overflow-hidden mt-24">
      
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-gray-900 to-black" />
      <div className="absolute -top-32 -left-32 w-[400px] h-[400px] bg-indigo-500/20 rounded-full blur-3xl" />
      <div className="absolute top-1/2 right-0 w-[300px] h-[300px] bg-purple-500/20 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-1/3 w-[250px] h-[250px] bg-blue-500/20 rounded-full blur-3xl" />

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-20 text-gray-300">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">

          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <FaGraduationCap className="text-indigo-400 text-3xl" />
              <h2 className="text-white text-2xl font-bold">MD Adil</h2>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed max-w-sm">
              Building modern learning experiences with clean design, meaningful
              interaction, and accessible education for everyone.
            </p>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Contact</h3>
            <div className="space-y-4 text-sm">

              <div className="flex items-center gap-3">
                <FaMapMarkerAlt className="text-indigo-400 text-lg" />
                <span>Lucknow, India</span>
              </div>

              <div className="flex items-center gap-3">
                <FaEnvelope className="text-indigo-400 text-lg" />
                <span>adilsiddddd@gmail.com</span>
              </div>

              <div className="flex items-center gap-3">
                <FaPhoneAlt className="text-indigo-400 text-lg" />
                <span>+91 7905617682</span>
              </div>

            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-3 text-sm">
              <li className="hover:text-white transition cursor-pointer">Home</li>
              <li className="hover:text-white transition cursor-pointer">Courses</li>
              <li className="hover:text-white transition cursor-pointer">About</li>
              <li className="hover:text-white transition cursor-pointer">Contact</li>
            </ul>
          </div>

        </div>

        {/* Bottom */}
        <div className="mt-16 border-t border-white/10 pt-6 text-center text-xs text-gray-400">
          © {new Date().getFullYear()} MD Adil — All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;
