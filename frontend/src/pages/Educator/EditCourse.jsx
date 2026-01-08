import { useEffect, useRef, useState } from "react";
import { FaLongArrowAltLeft } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import empty from "../../assets/empty.jpg";
import { MdMovieEdit } from "react-icons/md";
import axios from "axios";
import { serverUrl } from "../../App";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";
import { useDispatch, useSelector } from "react-redux";
import { setCourseData } from "../../redux/courseSlice";

function EditCourse() {
  const navigate = useNavigate();
  const { courseId } = useParams();
  const thumb = useRef();
  const [isPublished, setIsPublished] = useState(false);
  const [selectCourse, setSelectCourse] = useState(null);
  const [title, setTitle] = useState("");
  const [subTitle, setSubTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [level, setLevel] = useState("");
  const [price, setPrice] = useState("");
  const [loading, setLoading] = useState(false);

  const [frontendImage, setFrontendImage] = useState(empty);
  const [backendImage, setBackendImage] = useState(null);
  const dispatch = useDispatch();
  const { courseData } = useSelector((state) => state.course);

  const handleThumbnail = (e) => {
    const file = e.target.files[0];
    setBackendImage(file);
    setFrontendImage(URL.createObjectURL(file));
  };

  const getCourseById = async () => {
    try {
      const result = await axios.get(
        serverUrl+`/api/course/getcourse/${courseId}`,
        { withCredentials: true }
      );
      setSelectCourse(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCourseById();
  }, []);

  useEffect(() => {
    if (selectCourse) {
      setTitle(selectCourse.title || "");
      setSubTitle(selectCourse.subTitle || "");
      setDescription(selectCourse.description || "");
      setCategory(selectCourse.category || "");
      setLevel(selectCourse.level || "");
      setPrice(selectCourse.price || "");
      setFrontendImage(selectCourse.thumbnail || empty);
      setIsPublished(selectCourse?.isPublished);
    }
  }, [selectCourse]);

  const handleEditCourse = async () => {
    setLoading(true);

    const formData = new FormData();
    formData.append("title", title);
    formData.append("subTitle", subTitle);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("level", level);
    formData.append("price", price);
    formData.append("thumbnail", backendImage);
    formData.append("isPublished", isPublished);
    try {
      const result = await axios.post(
        serverUrl+`/api/course/editcourse/${courseId}`,
        formData,
        { withCredentials: true }
      );
      console.log(result.data);
      const updatedData = result.data;
      if (updatedData.isPublished) {
        const updatedCourses = courseData.map((c) =>
          c._id === courseId ? updatedData : c
        );
        if (!courseData.some((c) => c._id === courseId)) {
          updatedCourses.push(updatedData);
        }
        dispatch(setCourseData(updatedCourses));
      } else {
        const filterCourse = courseData.filter(
          (course) => course._id == !courseId
        );
        dispatch(setCourseData(filterCourse));
      }
      setLoading(false);
      navigate("/courses");
      toast.success("Course Updated");
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error("Course Edit Failed");
    }
  };

  const handleRemoveCourse = async () => {
    try {
      const result = await axios.delete(
        serverUrl+`/api/course/remove/${courseId}`,
        { withCredentials: true }
      );
      toast.success("Course removed Successfully");
      console.log(result);
      const filterCourse = courseData.filter(
        (course) => course._id !== courseId
      );
      navigate("/courses");
      dispatch(setCourseData(filterCourse));
    } catch (error) {
      console.log(error, "Error while removing the Course");
      toast.error("Remove Course Failed");
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6 mt-10 bg-white rounded-lg shadow-md">
      {/* Top */}
      <div className="flex items-center justify-center gap-[20px] md:justify-between flex-col md:flex-row mb-6 relative">
        <FaLongArrowAltLeft
          className=" top-[-20%] md:top-[20px] absolute  left-[0] md:left-[2%] w-[22px] h-[22px] cursor-pointer "
          onClick={() => navigate("/courses")}
        />

        <h2 className="text-2xl font-semibold md:pl-[60px]">
          Add Detail Information regarding the Course
        </h2>
        <div className=" space-x-2  space-y-2">
          <button
            onClick={() => navigate(`/createlecture/${selectCourse?._id}`)}
            className="bg-black text-white px-4 py-2 rounded-md cursor-pointer"
          >
            Go to Lecture Page
          </button>
        </div>
      </div>

      {/* {form} bottom */}
      <div className="bg-gray-50 p-6 rounded-md">
        <h2 className="text-lg font-medium mb-4">Basic Course Information</h2>
        <div className="space-x-2 space-y-2">
          {!isPublished ? (
            <button
              onClick={() => setIsPublished((prev) => !prev)}
              className=" bg-green-100 text-green-600 px-4 py-2 rounded-md  border-1 cursor-pointer"
            >
              Click To Publish
            </button>
          ) : (
            <button
              onClick={() => setIsPublished((prev) => !prev)}
              className=" bg-red-100 text-red-600 px-4 py-2 rounded-md  border-1 cursor-pointer"
            >
              Click To Unpublish
            </button>
          )}
          <button
            onClick={handleRemoveCourse}
            className="bg-red-100 text-red-600 px-4 py-2 rounded-md  border-1 cursor-pointer"
          >
            Remove Course
          </button>
        </div>
        <form onSubmit={(e) => e.preventDefault()} action="">
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Title
            </label>
            <input
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              className="w-full border px-4 py-2 rounded-md"
              type="text"
              id="title"
              placeholder="Title"
            />
          </div>
          <div>
            <label
              htmlFor="subtitle"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Subtitle
            </label>
            <input
              onChange={(e) => setSubTitle(e.target.value)}
              value={subTitle}
              className="w-full border px-4 py-2 rounded-md"
              type="text"
              id="subtitle"
              placeholder="Course Subtitle"
            />
          </div>
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Description
            </label>
            <textarea
              onChange={(e) => setDescription(e.target.value)}
              value={description}
              className="w-full border px-4 py-2 rounded-md h-24 resize-none"
              type="text"
              id="description"
              placeholder="Course Description"
            />
          </div>

          <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
            {/* category */}
            <div className="flex-1">
              <label
                htmlFor=""
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Course Category
              </label>
              <select
                onChange={(e) => setCategory(e.target.value)}
                value={category}
                className=" w-full border px-4 py-2 rounded-md bg-white"
                name=""
                id=""
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

            {/* Level */}
            <div className="flex-1">
              <label
                htmlFor=""
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Course Level
              </label>
              <select
                onChange={(e) => setLevel(e.target.value)}
                value={level}
                className=" w-full border px-4 py-2 rounded-md bg-white"
                name=""
                id=""
              >
                <option value="">Select Level</option>
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
            </div>

            {/* price */}
            <div className="flex-1">
              <label
                htmlFor="price"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Course Price (INR)
              </label>
              <input
                onChange={(e) => setPrice(e.target.value)}
                value={price}
                className="w-full border px-4 py-2 rounded-md"
                type="number"
                id="price"
                placeholder="₹"
              />
            </div>
          </div>
          <div>
            <label
              className="block text-sm font-medium text-gray-700 mb-1"
              htmlFor=""
            >
              Course Thumbnail
            </label>
            <input
              onChange={handleThumbnail}
              type="file"
              accept="image/*"
              hidden
              ref={thumb}
            />
          </div>
          <div className="relative w-[300px] h-[170px]">
            <img
              className="w-[100%] h-[100%] border-1 border-black rounded-[5px]"
              src={frontendImage}
              alt="thumbnail"
              onClick={() => thumb.current.click()}
            />
            <MdMovieEdit
              onClick={() => thumb.current.click()}
              className="w-[20px] h-[20px] absolute top-2 right-2"
            />
          </div>

          <div className="flex items-center justify-start gap-[15px] pt-2">
            <button
              onClick={() => navigate("/courses")}
              className="bg-[#e9e8e8] hover:bg-red-200 text-black border-1 border-black cursor-pointer px-4 py-2 rounded-md"
            >
              Cancel
            </button>
            <button
              onClick={handleEditCourse}
              className="bg-black text-white px-7 py-2 rounded-md hover:bg-gray-500 cursor-pointer"
              disabled={loading}
            >
              {loading ? <ClipLoader size={30} color="white" /> : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditCourse;
