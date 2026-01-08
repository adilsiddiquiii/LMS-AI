import { FaLongArrowAltLeft } from "react-icons/fa";
import { CiMicrophoneOn } from "react-icons/ci";
import img from "../assets/ai.png";
import { useState } from "react";
import axios from "axios";
import { serverUrl } from "../App";
import { useNavigate } from "react-router-dom";
import mp3 from "../assets/start.mp3";
import { toast } from "react-toastify";

function SearchWithAi() {
  const startSound = new Audio(mp3);
  const navigate = useNavigate();
  const [input, setInput] = useState("");
  const [recommendation, setRecommendation] = useState([]);

  function speak(mes) {
    let message = new SpeechSynthesisUtterance(mes);
    window.speechSynthesis.speak(message);
  }

  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;

  let recognition = new SpeechRecognition();

  if (!recognition) {
    toast.error("Speech recognition not supported");
  }

  const handleSearch = async () => {
    if (!recognition) return;
    startSound.play();
    recognition.start();

    recognition.onresult = async (e) => {
      const transcript = e.results[0][0].transcript.trim();
      setInput(transcript);
      await handleRecommendation(transcript);
    };
  };

  const handleRecommendation = async (query) => {
    try {
      const result = await axios.post(
        serverUrl + "/api/course/search",
        { input: query },
        { withCredentials: true }
      );
      console.log(result.data);
      if (result.data.length > 0) {
        speak("These are the top courses i found for you      enjoy Learning");
      } else {
        speak("No courses found");
      }
      setRecommendation(result.data);
    } catch (error) {
      console.log(error, "HandleRecommendation Error");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black to-gray-900 text-white flex flex-col items-center px-4 py-1">
      {/* search container */}

      <div className="bg-white shadow-xl rounded-3xl p-6 sm:p-8 w-full max-w-2xl text-center relative">
        <FaLongArrowAltLeft
          onClick={() => navigate("/")}
          className="absolute text-black w-[22px] h-[22px] cursor-pointer"
        />
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-600 mb-6 flex items-center justify-center gap-2">
          {" "}
          <img
            className="w-8 h-8 sm:w-[30px] sm:h-[30px]"
            src={img}
            alt=""
          />{" "}
          Search With <span className="text-[#CB99C7]">AI</span>
        </h1>

        <div className="flex items-center bg-gray-700 rounded-full overflow-hidden shadow-lg relative w-full">
          <input
            onChange={(e) => setInput(e.target.value)}
            value={input}
            className="flex-grow px-4 py-3 bg-transparent text-white placeholder-gray-400 focus:outline-none text-sm sm:text-base"
            type="text"
            placeholder="What do you want to learn? (e.g. AI , MERN , Cloud....) "
          />

          <button
            onClick={() => handleRecommendation(input)}
            className=" absolute right-14 sm:right-16 bg-white rounded-full cursor-pointer"
          >
            <img src={img} alt="" className="w-10 h-10 p-2 rounded-full" />
          </button>

          <button
            onClick={handleSearch}
            className="cursor-pointer absolute right-2 bg-white rounded-full w-10 h-10 flex items-center justify-center"
          >
            <CiMicrophoneOn className="w-5 h-5 text-[#cb87c5]" />
          </button>
        </div>
      </div>

      {recommendation.length > 0 ? (
        <div className="w-full max-w-6xl mt-12 px-2 sm:px-4">
          <h1 className="text-xl sm:text-2xl font-semibold mb-6 text-white text-center">
            AI Search Results{" "}
          </h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
            {recommendation?.map((course, index) => (
              <div
              onClick={()=> navigate(`/viewcourse/${course._id}`)}
              key={index} className="bg-white text-black p-5 rounded-2xl shadow-sm hover:shadow-indigo-50/30 transition-all duration-200 border border-gray-300 cursor-pointer hover:bg-gray-200">
                <h1 className="text-lg font-bold sm:text-xl">{course.title}</h1>
                <p >{course.category}</p>

              </div>
            ))}
          </div>
        </div>
      ) : (
        <h1>Search For Courses</h1>
      )}
    </div>
  );
}

export default SearchWithAi;
