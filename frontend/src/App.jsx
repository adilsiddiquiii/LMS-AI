import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import SingUp from "./pages/SingUp";
import LogIn from "./pages/LogIn";
import { ToastContainer } from "react-toastify";
import useCurrentUser from "./customHooks/getCurrentUser.js";
import { useSelector } from "react-redux";
import Profile from "./pages/Profile.jsx";
import ForgetPassword from "./pages/ForgetPassword.jsx";
import EditProfile from "./pages/EditProfile.jsx";
import Dashboard from "./pages/Educator/Dashboard.jsx";
import Courses from "./pages/Educator/Courses.jsx";
import CreateCourses from "./pages/Educator/CreateCourses.jsx";
import useCreatorCourse from "./customHooks/getCreatorCourse.js";
import EditCourse from "./pages/Educator/EditCourse.jsx";
import usePublishedCourse from "./customHooks/getPublishedCourse.js";
import AllCourses from "./pages/AllCourses.jsx";
import CreateLecture from "./pages/Educator/CreateLecture.jsx";
import EditLecture from "./pages/Educator/EditLecture.jsx";
import ViewCourse from "./pages/ViewCourse.jsx";
import ScrollTop from "./components/ScrollTop.jsx";
import ViewLectures from "./pages/ViewLectures.jsx";
import Mycourses from "./pages/Mycourses.jsx";
import SearchWithAi from "./pages/SearchWithAi.jsx";
import { useEffect, useState } from "react";
import axios from "axios";
import LoadingScreen from "./components/LoadingScreen.jsx";

export const serverUrl =
  window.location.hostname === "localhost"
    ? "http://localhost:4001"
    : "https://lms-ai-73va.onrender.com";

const AppContent = () => {
  useCurrentUser();
  useCreatorCourse();
  usePublishedCourse();
  ScrollTop();
  const { userdata } = useSelector((state) => state.user);

  return (
    <>
      <ToastContainer position="bottom-right" />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/signup"
          element={!userdata ? <SingUp /> : <Navigate to={"/"} />}
        />
        <Route path="/login" element={<LogIn />} />
        <Route
          path="/profile"
          element={userdata ? <Profile /> : <Navigate to={"/signup"} />}
        />
        <Route
          path="/forgetpassword"
          element={ <ForgetPassword />}
        />
        <Route
          path="/editprofile"
          element={userdata ? <EditProfile /> : <Navigate to={"/signup"} />}
        />
        <Route
          path="/dashboard"
          element={
            userdata?.role === "educator" ? (
              <Dashboard />
            ) : (
              <Navigate to={"/signup"} />
            )
          }
        />
        <Route
          path="/courses"
          element={
            userdata?.role === "educator" ? (
              <Courses />
            ) : (
              <Navigate to={"/signup"} />
            )
          }
        />
        <Route
          path="/createcourse"
          element={
            userdata?.role === "educator" ? (
              <CreateCourses />
            ) : (
              <Navigate to={"/signup"} />
            )
          }
        />
        <Route
          path="/editcourse/:courseId"
          element={
            userdata?.role === "educator" ? (
              <EditCourse />
            ) : (
              <Navigate to={"/signup"} />
            )
          }
        />
        <Route
          path="/allcourses"
          element={userdata ? <AllCourses /> : <Navigate to={"/signup"} />}
        />
        <Route
          path="/createlecture/:courseId"
          element={userdata ? <CreateLecture /> : <Navigate to={"/signup"} />}
        />
        <Route
          path="/editlecture/:courseId/:lectureId"
          element={userdata ? <EditLecture /> : <Navigate to={"/signup"} />}
        />
        <Route
          path="/viewcourse/:courseId"
          element={userdata ? <ViewCourse /> : <Navigate to={"/signup"} />}
        />
        <Route
          path="/viewlecture/:courseId"
          element={userdata ? <ViewLectures /> : <Navigate to={"/signup"} />}
        />
        <Route
          path="/mycourses"
          element={userdata ? <Mycourses /> : <Navigate to={"/signup"} />}
        />
        <Route
          path="/search"
          element={userdata ? <SearchWithAi /> : <Navigate to={"/signup"} />}
        />
      </Routes>
    </>
  );
};

function App() {
  const [isBackendReady, setIsBackendReady] = useState(false);

  useEffect(() => {
    const checkBackend = async () => {
      try {
        // Silent retry until backend responds
        await axios.get(serverUrl + "/api/health");
        setIsBackendReady(true);
      } catch (error) {
        // Retry every 2 seconds
        setTimeout(checkBackend, 2000);
      }
    };

    checkBackend();
  }, []);

  if (!isBackendReady) {
    return <LoadingScreen />;
  }

  return <AppContent />;
}

export default App;
