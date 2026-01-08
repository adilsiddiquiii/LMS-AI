import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaLongArrowAltLeft } from "react-icons/fa";

function Mycourses() {
  const { userdata } = useSelector((state) => state.user);
  const navigate = useNavigate();
  return (
    <div className="min-h-screen w-full px-4 py-9 bg-gray-50">
      <FaLongArrowAltLeft
        className="absolute top-[35] md:top-[6%] left-[5%] w-[22px] h-[22px] cursor-pointer"
        onClick={() => navigate("/")}
      />
      <h2 className="text-3xl text-center font-bold text-gray-800 mb-6">
        My Enrolled Courses
      </h2>

      {userdata?.enrolledCourses?.length === 0 ? (
        <p className="text-gray-500 text-center w-full">
          You haven't enrolled in any course yet.
        </p>
      ) : (
        <div className="flex items-center justify-center flex-wrap gap-[30px]">
          {userdata?.enrolledCourses?.map((course, index) => (
            <div
  key={index}
  className="bg-white rounded-2xl shadow-md overflow-hidden border w-[300px] h-[350px] flex flex-col"
>
  <img src={course.thumbnail} alt="" className="w-full h-40 object-cover" />
  <div className="p-4 flex flex-col flex-1">
    <h2 className="text-lg font-semibold text-gray-800 line-clamp-2">
      {course?.title}
    </h2>
    <p className="text-sm text-gray-600 mb-1">{course?.category}</p>
    <p className="text-sm text-gray-600 mb-2">{course?.level}</p>

    <h1
      className="mt-auto px-[10px] text-center py-[10px] border-2 bg-black border-black text-white rounded-[10px] text-[15px] font-light cursor-pointer hover:bg-gray-600"
      onClick={() => navigate(`/viewlecture/${course._id}`)}
    >
      Watch Now
    </h1>
  </div>
</div>

          ))}
        </div>
      )}
    </div>
  );
}

export default Mycourses;
