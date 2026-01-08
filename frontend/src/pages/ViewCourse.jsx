import { FaLongArrowAltLeft } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { FaLock } from "react-icons/fa";

import { FaPlay } from "react-icons/fa";

import { FaRegStar } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { setSelectedCourse } from "../redux/courseSlice";
import { useEffect, useState } from "react";
import empty from "../assets/empty.jpg";
import { serverUrl } from "../App";
import axios from "axios";
import Cards from "../components/Cards";
import { toast } from "react-toastify";

function ViewCourse() {
  const navigate = useNavigate();
  const { courseId } = useParams();

  const dispatch = useDispatch();

  const [selectedLecture, setSelectedLecture] = useState(null);

  const { courseData, selectedCourse } = useSelector((state) => state.course);

  const { userdata } = useSelector((state) => state.user);
  const [createrData, setCreaterData] = useState(null);

  const [createrCourses, setCreaterCourses] = useState(null);
  const [isEnrolled, SetIsEnrolled] = useState(false);

  useEffect(() => {
    const handleCreater = async () => {
      if (selectedCourse?.creator) {
        try {
          const result = await axios.post(
            serverUrl + "/api/course/creater",
            {
              userId: selectedCourse?.creator,
            },
            { withCredentials: true }
          );
          console.log(result.data);
          setCreaterData(result.data);
        } catch (error) {
          console.log(error);
        }
      }
    };
    handleCreater();
  }, [selectedCourse]);

  const checkEnrollment = () => {
    const verify = userdata?.enrolledCourses?.some(
      (c) =>
        (typeof c === "string" ? c : c._id).toString() === courseId?.toString()
    );
    if (verify) {
      SetIsEnrolled(true);
    }
  };

  useEffect(() => {
    if (courseData?.length) {
      const course = courseData.find((c) => c._id === courseId);
      if (course) {
        dispatch(setSelectedCourse(course));
      }
    }
    checkEnrollment()
  }, [courseData, courseId, dispatch]);

  useEffect(() => {
    if (createrData?._id && courseData.length > 0) {
      const createrCourses = courseData.filter(
        (course) =>
          course.creator === createrData?._id && course._id !== courseId
      );
      setCreaterCourses(createrCourses);
    }
  }, [createrData, courseData]);

  const handleEnroll = async (userId, courseId) => {
    try {
      const orderData = await axios.post(
        serverUrl + "/api/order/razorpay-order",
        { userId, courseId },
        { withCredentials: true }
      );
      console.log(orderData);
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: orderData.data.amount,
        currency: "INR",
        name: "COURSES",
        description: "COURSE ENROLLMENT PAYMENT",
        order_id: orderData.data.id,
        handler: async function (response) {
          console.log("RazorPay Responce", response);
          try {
            const verifyPayment = await axios.post(
              serverUrl + "/api/order/verifypayment",
              { ...response, courseId, userId },
              { withCredentials: true }
            );
            SetIsEnrolled(true);
            console.log(verifyPayment);

            toast.success("Payment Successfull");
          } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || "Payment failed");
          }
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto bg-white shadow-md rounded-xl space-y-6 relative">
        {/* top section */}
        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-1/2">
            <FaLongArrowAltLeft
              onClick={() => navigate("/")}
              className="text-black w-[22px] h-[22px] cursor-pointer mb-3"
            />

            <img
              className="rounded-xl w-full object-cover"
              src={selectedCourse?.thumbnail || empty}
              alt="thumbnail"
            />
          </div>
          {/* course info */}
          <div className="flex-1 space-y-2 mt-[20px]">
            <h2 className="text-2xl font-bold">{selectedCourse?.title}</h2>
            <p className="text-gray-600">{selectedCourse?.subTitle}</p>
            <div className="flex items-start flex-col justify-between">
              <div className="text-yellow-500 font-medium ">
                <span className="flex items-center justify-start gap-1 ">
                  {" "}
                  <FaRegStar size={20} />5
                </span>
                <span className="text-gray-400">(1283 Reviews)</span>
              </div>
              <div className="text-lg font-semibold text-black">
                <span className="text-lg font-semibold text-black">
                  ₹ {selectedCourse?.price}
                </span>{" "}
                <span className="line-through text-sm text-gray-400">
                  ₹ 599
                </span>
              </div>
              <ul className="text-sm text-gray-700 space-y-1 pt-2">
                <li>✅ 10+ hourse of video content</li>
                <li>✅ Lifetime access to course materials</li>
              </ul>
              {!isEnrolled ? (
                <button
                  onClick={() => handleEnroll(userdata._id, courseId)}
                  className="bg-[black] text-white px-6 py-2 rounded hover:bg-gray-700 mt-3 cursor-pointer"
                >
                  Enroll Now
                </button>
              ) : (
                <button
                onClick={()=> navigate(`/viewlecture/${courseId}`)}
                className="bg-green-100 text-green-600 px-6 py-2 rounded hover:bg-gray-500 mt-3 cursor-pointer">
                  Watch Now
                </button>
              )}
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">What You'll Learn</h2>
          <ul className="list-disc pl-6 text-gray-700 space-y-1">
            <li>Learn {selectedCourse?.category} from Beginning</li>
          </ul>
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-2">Who This Course is For</h2>
          <p className="text-gray-700">
            Beginners , aspiring developers, and professionals looking to
            upgrade skills.
          </p>
        </div>

        {/* lec */}

        <div className="flex flex-col md:flex-row gap-6">
          <div className="bg-white w-full md:w-2/5 p-6 rounded-2xl shadow-lg border border-gray-200">
            <h2 className="text-xl font-bold mb-1 text-gray-800">
              Course Curriculum
            </h2>
            <p className="text-sm text-gray-500 mb-4">
              {selectedCourse?.lectures?.length} Lectures
            </p>
            <div className="flex flex-col gap-3">
              {selectedCourse?.lectures?.map((lecture, index) => (
                <button
                  key={index}
                  disabled={!lecture.isPreviewFree}
                  onClick={() => {
                    if (lecture.isPreviewFree) {
                      setSelectedLecture(lecture);
                    }
                  }}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg border transition-all duration-200 text-left cursor-pointer ${
                    lecture.isPreviewFree
                      ? "hover:bg-gray-100 border-gray-200"
                      : "cursor-not-allowed opacity-50 border-gray-200"
                  } ${
                    selectedLecture?.lectureTitle === lecture?.lectureTitle
                      ? "bg-gray-100 border-gray-400"
                      : " "
                  }`}
                >
                  <span className="text-lg text-gray-700">
                    {lecture.isPreviewFree ? <FaPlay size={20} /> : <FaLock />}
                  </span>
                  <span>{lecture?.lectureTitle}</span>
                </button>
              ))}
            </div>
          </div>
          {/* right div */}
          <div className="bg-white w-full md:w-3/5 p-6 rounded-2xl shadow-lg border border-gray-200">
            <div className="aspect-video w-full rounded-lg overflow-hidden mb-4 bg-black flex items-center justify-center">
              {selectedLecture?.videoUrl ? (
                <video
                  src={selectedLecture?.videoUrl}
                  className="w-full h-full object-cover"
                  controls
                ></video>
              ) : (
                <span className="text-white text-sm">
                  Select a preview lecture to watch
                </span>
              )}
            </div>
          </div>
        </div>

        {/* rev */}
        <div className="mt-8 border-t pt-6">
          <h2 className="text-xl font-semibold mb-2">Write a Reviews</h2>
          <div className="mb-4">
            <div className="flex gap-1 mb-2">
              {[1, 2, 3, 4, 5].map((star) => {
                return <FaRegStar key={star} className="fill-gray-500" />;
              })}
            </div>
            <textarea
              name=""
              className="w-full border border-gray-300 rounded-lg p-2"
              placeholder="Write your review here..."
              rows={3}
            ></textarea>
            <button className="bg-black text-white mt-3 px-4 py-2 rounded hover:bg-gray-800">
              Submit
            </button>
          </div>
        </div>
        {/* for creator info */}
        <div className="flex items-center gap-4 pt-4 border-t">
          {createrData?.photoUrl ? (
            <img
              className="border-1 border-gray-200 w-16 h-16 rounded-full object-cover"
              src={createrData?.photoUrl}
              alt=""
            />
          ) : (
            <img
              className="border-1 border-gray-200 w-16 h-16 rounded-full object-cover"
              src={empty}
              alt=""
            />
          )}
          <div>
            <h2 className="text-lg font-semibold">{createrData?.name}</h2>
            <p className="md:text-sm text-gray-600 text-[10px]">
              {createrData?.description}
            </p>
            <p className="md:text-sm text-gray-600 text-[10px]">
              {createrData?.email}
            </p>
          </div>
        </div>
        <div>
          <p className="text-xl font-semibold mb-2">
            Other Published Courses by the Educator -
          </p>
        </div>
        <div className="w-full transition-all duration-300 py-[20px] flex items-start justify-center lg:justify-start flex-wrap gap-6 lg:px-[80px]">
          {createrCourses?.map((course, index) => (
            <Cards
              key={index}
              thumbnail={course.thumbnail}
              id={course._id}
              price={course.price}
              title={course.title}
              category={course.category}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default ViewCourse;
