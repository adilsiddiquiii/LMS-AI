import axios from "axios";
import { useEffect, useState } from "react";
import { FaLongArrowAltLeft } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { serverUrl } from "../../App";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";
import { setLectureData } from "../../redux/lectureSlice";
import { MdMovieEdit } from "react-icons/md";

function CreateLecture() {
  const navigate = useNavigate();
  const { courseId } = useParams();
  const [lectureTitle, setLectureTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { lectureData } = useSelector((state) => state.lecture);

  const handleCreateLecture = async () => {
    setLoading(true);

    try {
      const result = await axios.post(
        serverUrl + `/api/course/createlecture/${courseId}`,
        { lectureTitle },
        { withCredentials: true }
      );
      console.log(result);
      dispatch(setLectureData([...lectureData, result.data.lectures]));
      setLoading(false);
      setLectureTitle("");
      navigate('/courses')
      toast.success("Lecture Created Successfully");
    } catch (error) {
      console.log(error, "while creating lecture");
      setLoading(false);
      toast.error("Lecture failed to create");
    }
  };

  useEffect(() => {
    const getCourseLecture = async () => {
      try {
        const result = await axios.get(
          serverUrl + `/api/course/courselecture/${courseId}`,
          { withCredentials: true }
        );
        console.log(result.data);

        dispatch(setLectureData(result.data.lectures));
      } catch (error) {
        console.log(error);
      }
    };
    getCourseLecture();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white shadow-xl rounded-xl w-full max-w-2xl p-6">
        {/* header */}
        <div className="mb-6">
          <h1 className=" text-2xl font-semibold text-gray-800 fonsem mb-1">
            Let's Add a Lecture
          </h1>
          <p className="text-sm text-gray-500">
            Enter the title and add your Video lectures to enhance your course
            content.
          </p>
        </div>
        {/* inputs */}
        <input
          onChange={(e) => setLectureTitle(e.target.value)}
          value={lectureTitle}
          type="text"
          className="w-full border border-gray-300 rounded-md p-3 text-sm focus:outline-none focus:ring-2 focus:ring-black-400 mb-4"
          placeholder="Introduction to MERN stack"
        />
        {/* button */}
        <div className="flex gap-4 mb-6">
          <button
            onClick={() => navigate(`/editcourse/${courseId}`)}
            className="flex items-center gap-2 px-4 py-2 rounded-md bg-gray-200 hover:bg-gray-300 text-sm font-medium"
          >
            {" "}
            <FaLongArrowAltLeft />
            Back to Course
          </button>
          <button
            onClick={handleCreateLecture}
            className="px-5 py-2 rounded-md bg-[black] text-white hover:bg-gray-600 transition-all text-sm font-medium shadow"
            disabled={loading}
          >
            {loading ? (
              <ClipLoader size={30} color="white" />
            ) : (
              "Create Lecture"
            )}
          </button>
        </div>
        {/* lecture list */}
        <div className="space-y-2">
          {lectureData?.map((lecture, index) => {
            return (
              <div
                className="bg-gray-100 rounded-md flex justify-between items-center p-3 text-sm font-medium text-gray-700"
                key={index}
              >
                <span>
                  {index + 1} : {lecture.lectureTitle}
                </span>
                <MdMovieEdit 
                onClick={()=> navigate(`/editlecture/${courseId}/${lecture._id}`)}
                className="text-gray-500 hover:text-gray-700 cursor-pointer"/>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default CreateLecture;
