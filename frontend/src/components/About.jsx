import about from "../assets/about.jpg";
import video from "../assets/video.mp4";
import { TfiLayoutLineSolid } from "react-icons/tfi";
import { BsFillPatchCheckFill } from "react-icons/bs";

function About() {
  return (
    <div className="w-full lg:h-[70vh] min-h-[50vh] flex flex-col lg:flex-row items-center justify-center gap-10 px-6 mb-20">
      
      {/* Image Section */}
      <div className="lg:w-[40%] md:w-[80%] w-full flex items-center justify-center relative">
        <img
          src={about}
          className="w-[85%] h-auto rounded-2xl object-cover shadow-lg"
          alt="about"
        />

        {/* Floating Video */}
        <div className="max-w-[320px] p-2 absolute top-[45%] right-0 translate-x-[10%] -translate-y-[-30%]">
          <video
            className="w-full rounded-xl shadow-2xl border-4 border-white bg-black"
            
            autoPlay
            loop
            muted
            src={video}
          />
        </div>
      </div>

      {/* Info Section */}
      <div className="lg:w-[50%] md:w-[70%] w-full flex flex-col items-center lg:items-start justify-center px-4 md:px-16 text-center lg:text-left">
        
        {/* Heading */}
        <div className="flex items-center gap-4 mb-3 text-[18px] font-medium text-gray-600">
          About Us <TfiLayoutLineSolid className="w-[36px] h-[36px]" />
        </div>

        <h2 className="md:text-[44px] text-[32px] font-bold leading-tight mb-4">
          We are Maximizing Your Learning Growth
        </h2>

        <p className="text-gray-600 text-[16px] max-w-[520px] leading-relaxed mb-8">
          We provide a modern learning management system to simplify online
          education, track progress, and enhance student-instructor
          collaboration efficiently.
        </p>

        {/* Feature List */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8 text-[15px] text-gray-700">
          <div className="flex items-center gap-3">
            <BsFillPatchCheckFill className="w-[18px] h-[18px] text-green-500" />
            Simplified Learning
          </div>
          <div className="flex items-center gap-3">
            <BsFillPatchCheckFill className="w-[18px] h-[18px] text-green-500" />
            Expert Trainers
          </div>
          <div className="flex items-center gap-3">
            <BsFillPatchCheckFill className="w-[18px] h-[18px] text-green-500" />
            Big Experience
          </div>
          <div className="flex items-center gap-3">
            <BsFillPatchCheckFill className="w-[18px] h-[18px] text-green-500" />
            Lifetime Access
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
