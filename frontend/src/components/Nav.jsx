import { useDispatch, useSelector } from "react-redux";
import logo from "../assets/logo.jpg";
import { IoPersonCircleSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { serverUrl } from "../App";
import { setUserData } from "../redux/userSlice";
import { toast } from "react-toastify";
import { useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoMdClose } from "react-icons/io";

export default function Nav() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [showHam, setShowHam] = useState(false);
  const { userdata } = useSelector((state) => state.user);

  const handleLogout = async () => {
    try {
      const result = await axios.get(serverUrl + "/api/auth/logout", {
        withCredentials: true,
      });
      console.log(result);
      toast.success("Logout Successfully");
      navigate("/");

      dispatch(setUserData(null));
    } catch (error) {
      console.log(error, "Error while Logout");
      toast.error("Logout Successfully");
    }
  };

  return (
    <div>
      <div className="w-[100%] h-[70px] fixed top-0 px-[20px] py-[10px] flex items-center justify-between bg-[#00000047] z-10">
        {/* logo */}
        <div 
        onClick={()=> navigate('/')}
        className="lg:w-[20%] w-[40%] lg:pl-[50px] cursor-pointer">
          <img
            src={logo}
            alt="Logo"
            className="w-[60px] rounded-[5px] border-2 border-white "
          />
        </div>
        {/* right-side */}
        <div className="w-[30%] lg:flex items-center justify-center gap-4 hidden">
          {!userdata && (
            <IoPersonCircleSharp
              onClick={() => setShow((prev) => !prev)}
              className="w-[50px] h-[50px] fill-black cursor-pointer"
            />
          )}
          {userdata?.photoUrl ? (
            <img
              onClick={() => setShow((prev) => !prev)}
              className="w-[50px] h-[50px] rounded-full text-white flex items-center justify-center text-[20px] border-2 bg-black border-white cursor-pointer"
              src={userdata.photoUrl}
            />
          ) : (
            <div
              onClick={() => setShow((prev) => !prev)}
              className="w-[50px] h-[50px] rounded-full text-white flex items-center justify-center text-[20px] border-2 bg-black border-white cursor-pointer"
            >
              {userdata?.name.slice(0, 1).toUpperCase()}
            </div>
          )}
          {userdata?.role === "educator" && (
            <div
            onClick={()=> navigate('/dashboard')}
            className="px-[20px] py-[10px] border-2 lg:border-white border-black lg:text-white bg-[black] text-black rounded-[10px] text-[18px] font-light cursor-pointer">
              Dashboard
            </div>
          )}
          {!userdata ? (
            <span
              className="px-[20px] py-[10px] border-2 border-white  text-white rounded-[10px] text-[18px] font-light cursor-pointer bg-[black]"
              onClick={() => navigate("/login")}
            >
              Login
            </span>
          ) : (
            <span
              className="px-[20px] py-[10px]  text-black rounded-[10px] text-[18px] font-light cursor-pointer bg-[white] shadow-sm shadow-black"
              onClick={handleLogout}
            >
              Logout
            </span>
          )}
          {show && (
            <div className="absolute top-[110%] right-[15%] flex items-center flex-col justify-center gap-2 text-[16px] rounded-md bg-[white] px-[15px] py-[10px] border-[2px] border-black hover:border-white hover:text-white cursor-pointer hover:bg-black">
              <span
                onClick={() => navigate("/profile")}
                className="bg-[black] text-white px-[30px] py-[10px] rounded-2xl hover:bg-gray-600"
              >
                My Profile
              </span>
              <span
              onClick={()=> navigate('/mycourses')}
              className="bg-[black] text-white px-[30px] py-[10px] rounded-2xl hover:bg-gray-600">
                My Courses
              </span>
            </div>
          )}
        </div>
        <RxHamburgerMenu
          onClick={() => setShowHam((prev) => !prev)}
          className="w-[40px] h-[40px] lg:hidden fill-black cursor-pointer text-white"
        />
        <div
          className={`fixed top-0 left-0 w-[100vw] h-[100vh] bg-[#000000d6] flex items-center justify-center flex-col gap-5 z-10 lg:hidden ${
            showHam
              ? "translate-x-[0] transition duration-600"
              : "translate-x-[-100%] transition duration-600"
          }`}
        >
          <IoMdClose
            onClick={() => setShowHam(false)}
            className="w-[35px] h-[35px] fill-white absolute top-5 right-[4%]"
          />
          <>
            {userdata?.photoUrl ? (
              <img
                className="w-[50px] h-[50px] rounded-full text-white flex items-center justify-center text-[20px] border-2 bg-black border-white cursor-pointer"
                src={userdata.photoUrl}
              />
            ) : (
              <div className="w-[50px] h-[50px] rounded-full text-white flex items-center justify-center text-[20px] border-2 bg-black border-white cursor-pointer">
                {userdata?.name.slice(0, 1).toUpperCase()}
              </div>
            )}
            <div
              onClick={() => navigate("/profile")}
              className=" w-[200px] h-[60px] flex items-center justify-center border-2  border-white text-white bg-[black] rounded-[10px] text-[18px] font-light cursor-pointer"
            >
              My Profile
            </div>
            <div
            onClick={()=> navigate('/mycourses')}
            className=" w-[200px] h-[60px] flex items-center justify-center border-2  border-white text-white bg-[black] rounded-[10px] text-[18px] font-light cursor-pointer">
              My Courses
            </div>
            {userdata?.role === "educator" && (
              <div
              onClick={()=> navigate('/dashboard')}
              className="w-[200px] h-[60px] flex items-center justify-center border-2  border-white text-white bg-[black] rounded-[10px] text-[18px] font-light cursor-pointer">
                Dashboard
              </div>
            )}
            {!userdata ? (
              <span
                className="w-[200px] h-[60px] flex items-center justify-center border-2  border-white text-white bg-[black] rounded-[10px] text-[18px] font-light cursor-pointer"
                onClick={() => navigate("/login")}
              >
                Login
              </span>
            ) : (
              <span
                className="w-[200px] h-[60px] flex items-center justify-center border-2  border-white text-white bg-[black] rounded-[10px] text-[18px] font-light cursor-pointer"
                onClick={handleLogout}
              >
                Logout
              </span>
            )}
          </>
        </div>
      </div>
    </div>
  );
}
