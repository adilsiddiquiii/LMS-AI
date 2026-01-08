import { useState } from "react";
import { FaLongArrowAltLeft } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { serverUrl } from "../../App";
import { setLectureData } from "../../redux/lectureSlice";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";

function EditLecture() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { courseId, lectureId } = useParams();
  const { lectureData } = useSelector((state) => state.lecture);
  const selectedLecture = lectureData.find(
    (lecture) => lecture._id === lectureId
  );

  const [lectureTitle, setLectureTitle] = useState(
    selectedLecture.lectureTitle
  );
  const [videoUrl, setVideoUrl] = useState("");
  const [isPreviewFree, setIsPreviewFree] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loading1, setLoading1] = useState(false);

  const formData = new FormData();

  formData.append("lectureTitle", lectureTitle);
  formData.append("videoUrl", videoUrl);
  formData.append("isPreviewFree", isPreviewFree);

  const handleEditLecture = async () => {
    setLoading(true);
    try {
      const result = await axios.post(
        serverUrl + `/api/course/editlecture/${lectureId}`,
        formData,
        { withCredentials: true }
      );
      console.log(result.data);
      dispatch(setLectureData([...lectureData, result.data]));
      toast.success("Lecture Updated");
      setLoading(false);
      navigate("/courses");
    } catch (error) {
      console.log(error, "Handle edit failed");
      setLoading(false);
    }
  };

  const removeLecture = async () => {
    setLoading1(true);
    try {
      const result = await axios.delete(
        serverUrl + `/api/course/removelecture/${lectureId}`,
        { withCredentials: true }
      );
      console.log(result.data);
      navigate(`/createlecture/${courseId}`);
      toast.success("Lecture Removed");
      setLoading1(false);
    } catch (error) {
      console.log(error, "error while removibg lecture");
      toast.error("Lecture Removing Failed");
      setLoading1(false);
    }
  };
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-xl bg-white rounded-xl shadow-lg p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center gap-2 mb-2">
          <FaLongArrowAltLeft
            onClick={() => navigate(`/createlecture/${courseId}`)}
            className="text-gray-600 cursor-pointer"
          />
          <h2 className="text-xl font-semibold text-gray-800">
            Update Course Lecture
          </h2>
        </div>
        <button
          onClick={removeLecture}
          className="mt-2 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-all text-sm cursor-pointer "
          disabled={loading1}
        >
          {loading1 ? <ClipLoader size={30} color="white" /> : "Remove Lecture"}
        </button>

        <div className="space-y-4">
          <div>
            <label
              className="block text-sm font-medium text-gray-700 mb-1"
              htmlFor=""
            >
              Lecture Title *
            </label>
            <input
              className="w-full p-3 border border-gray-300 rounded-md text-sm focus:ring-2 focus-ring-[black] focus:outline-none"
              type="text"
              name=""
              id=""
              required
              value={lectureTitle}
              onChange={(e) => setLectureTitle(e.target.value)}
            />
          </div>
          <div>
            <label
              className="block text-sm font-medium text-gray-700 mb-1"
              htmlFor=""
            >
              Video *
            </label>
            <input
              className="w-full border border-gray-300 rounded-md p-2 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:bg-gray-700 file:text-[white] hover:file:bg-gray-400"
              type="file"
              name=""
              id=""
              required
              accept="video/*"
              onChange={(e) => setVideoUrl(e.target.files[0])}
            />
          </div>
          <div className="flex items-center gap-3">
            <input
              onChange={() => setIsPreviewFree((prev) => !prev)}
              className="accent-[black]"
              type="checkbox"
              id="check"
            />
            <label className="text-sm text-gray-700" htmlFor="check">
              Is this Video Free ?
            </label>
          </div>
        </div>

        {loading ? <p>Uploading Video... please wait</p> : ""}

        <div className="pt-4">
          <button
            onClick={handleEditLecture}
            className="w-full bg-black text-white py-3 rounded-md text-sm font-medium hover:bg-gray-700 transition cursor-pointer"
            disabled={loading}
          >
            {loading ? (
              <ClipLoader size={30} color="white" />
            ) : (
              "Update Lecture"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditLecture;
