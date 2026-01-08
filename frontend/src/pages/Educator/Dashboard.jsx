import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RxCross1 } from "react-icons/rx";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

function Dashboard() {
  const { userdata } = useSelector((state) => state.user);
  const { creatorCourseData } = useSelector((state) => state.course);
  const navigate = useNavigate();

  const CourseProgressData =
    creatorCourseData?.map((course) => ({
      name: course.title.slice(0, 10) + "...",
      lectures: course.lectures.length || 0,
    })) || [];

  const EnrollData =
    creatorCourseData?.map((course) => ({
      name: course.title.slice(0, 10) + "...",
      enroll: course.enrolledStudents.length || 0,
    })) || [];

  const totalEarning =
    creatorCourseData?.reduce((sum, course) => {
      const studentCount = course.enrolledStudents?.length || 0;
      const courseRevenue = course.price ? course.price * studentCount : 0;

      return sum + courseRevenue;
    }, 0) || 0;

  return (
    <div className="flex min-h-screen bg-gray-100">
      <RxCross1
        onClick={() => navigate("/")}
        className="absolute top-[8%] right-[5%] w-[22px] h-[22px] cursor-pointer"
      />

      <div className="w-full px-6 py-10 bg-gray-50 space-y-10">
        {/* Profile Section */}
        <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-md p-6 flex flex-col md:flex-row items-center gap-6">
          <img
            className="w-28 h-28 rounded-full object-cover border-4 border-black shadow-md"
            src={userdata?.photoUrl || ""}
            alt="profile"
          />
          <div className="text-center md:text-left space-y-1">
            <h1 className="text-2xl font-bold text-gray-800">
              Welcome, {userdata?.name?.split(" ")[0] || "You"} 👋
            </h1>
            <h1 className="text-xl font-semibold text-gray-800">
              Total Earning : ₹{totalEarning.toLocaleString()}
            </h1>
            <p className="text-gray-600 text-sm">
              {userdata?.description || "Create courses to get started"}
            </p>
            <button
              onClick={() => navigate("/courses")}
              className="mt-3 px-4 py-2 bg-black text-white rounded-lg text-sm"
            >
              Create Courses
            </button>
          </div>
        </div>

        {/* Graph Section */}
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Course Progress */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-lg font-semibold mb-4 text-gray-700">
              Lectures Per Course
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={CourseProgressData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="lectures" fill="#6366f1" radius={[5, 5, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Enrollment Graph */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-lg font-semibold mb-4 text-gray-700">
              Students Enrollment
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={EnrollData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="enroll" fill="#10b981" radius={[5, 5, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
