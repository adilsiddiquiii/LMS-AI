import { useState } from "react";
import { FaLongArrowAltLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { serverUrl } from "../../App";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";

function CreateCourses() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCreateCourse = async () => {
    setLoading(true);
    try {
      const result = await axios.post(
        serverUrl + "/api/course/create",
        { title, category },
        { withCredentials: true }
      );
      console.log(result.data);
      setLoading(false);
      toast.success("Course Created");
      navigate("/courses");
    } catch (error) {
      console.log(error, "Error While Creating Course");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 py-10">
      <div className="max-w-xl w-[600px] mx-auto p-6 bg-white shadow-md rounded-md mt-10 relative">
        <FaLongArrowAltLeft
          className="top-[8%] absolute left-[5%] w-[22px] h-[22px] cursor-pointer "
          onClick={() => navigate("/courses")}
        />
        <h2 className="text-2xl font-semibold mb-6 text-center">
          Create Course
        </h2>
        <form onSubmit={(e) => e.preventDefault()} className=" space-y-5">
          <div>
            <label
              className="block text-sm font-medium text-gray-700 mb-1"
              htmlFor="title"
            >
              Course Title
            </label>
            <input
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2"
              type="text"
              name=""
              id="title"
              placeholder="Enter Course Title"
            />
          </div>
          <div>
            <label
              className="block text-sm font-medium text-gray-700 mb-1"
              htmlFor="category"
            >
              Course Category
            </label>
            <select
              onChange={(e) => setCategory(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2"
              id="category"
            >
              <option value="">Select Category</option>
              <option value="Web Development">Web Development</option>
              <option value="App Development">App Development</option>
              <option value="AI/ML">AI/ML</option>
              <option value="UI UX Designing">UI UX Designing</option>
              <option value="Ethical Hacking">Ethical Hacking</option>
              <option value="Others">Others</option>
            </select>
          </div>
          <button
            onClick={handleCreateCourse}
            className="w-full bg-[black] text-white py-2 px-4 rounded-md active:bg-[#3a3a3a] transition cursor-pointer"
            disabled={loading}
          >
            {loading ? <ClipLoader size={30} color="white" /> : "Create"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateCourses;
