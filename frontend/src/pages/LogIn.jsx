import { useState } from "react";
import google from "../assets/google.jpg";
import logo from "../assets/logo.jpg";
import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { serverUrl } from "../App";
import { ClipLoader } from "react-spinners";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setUserData } from "../redux/userSlice";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../utils/firebase";

function LogIn() {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch()

  const handleLogin = async () => {
    setLoading(true);
    try {
      const result = await axios.post(
        serverUrl + "/api/auth/login",
        {
          email,
          password,
        },
        { withCredentials: true }
      );
      setLoading(false);
      dispatch(setUserData(result.data));
      toast.success("Login Successfully");
      navigate('/')
    } catch (error) {
      console.log(error);
      setLoading(false)
      toast.error("Login Failed")
      
    }
  };


   const googleSignUp = async () => {
      try {
        const response = await signInWithPopup(auth, provider);
        let user = response.user;
        let name = user.displayName;
        let email = user.email;
        let role = ""
        const result = await axios.post(
          serverUrl + "/api/auth/googleauth",
          { name, email, role },
          { withCredentials: true }
        );
        dispatch(setUserData(result.data));
        navigate("/");
        toast.success("Login Successfully ");
      } catch (error) {
        console.log(error);
        toast.error('failed by Google')
      }
    };

  return (
    <div className="bg-[#dddbdb] w-[100vw] h-[100vh] flex items-center justify-center">
      <form onSubmit={(e)=> e.preventDefault()} className="w-[90%] md:w-200 h-140 bg-[white] shadow-xl rounded-2xl flex">
        {/* left div */}
        <div className="md:w-[50%] w-[100%] h-[100%] flex flex-col items-center justify-center gap-3">
          <div>
            <h1 className="font-semibold text-[black] text-2xl">
              Welcome Back
            </h1>
            <h2 className="text-[gray] text-[18px]">Login Your Account</h2>
          </div>

          <div className="flex flex-col gap-1 w-[80%] items-start justify-center px-3">
            <label htmlFor="email" className="font-semibold">
              Email
            </label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              id="email"
              type="text"
              name=""
              className="border-1 w-[100%] h-[35px] border-[#e7e6e6] text-[15px] px-[20px]"
              placeholder="Your Email"
            />
          </div>

          <div className="flex flex-col gap-1 w-[80%] items-start justify-center px-3 relative">
            <label htmlFor="password" className="font-semibold">
              Password
            </label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              id="password"
              type={show ? "text" : "password"}
              name=""
              className="border-1 w-[100%] h-[35px] border-[#e7e6e6] text-[15px] px-[20px]"
              placeholder="Create Password"
            />
            {show ? (
              <IoMdEye
                onClick={() => setShow((prev) => !prev)}
                className="absolute w-[20px] h-[20px] cursor-pointer right-[5%] bottom-[10%]"
              />
            ) : (
              <IoMdEyeOff
                onClick={() => setShow((prev) => !prev)}
                className="absolute w-[20px] h-[20px] cursor-pointer right-[5%] bottom-[10%]"
              />
            )}
          </div>

          <button
            onClick={handleLogin}
            className="w-[80%] h-[40px] bg-black text-white cursor-pointer flex items-center justify-center rounded-[5px]"
            disabled={loading}
          >
            {loading ? <ClipLoader size={30} color="white" /> : "Login"}
          </button>
          <span
          onClick={()=> navigate('/forgetpassword')}
          className="text-[13px] cursor-pointer text-[#585757]">
            Forget your password?
          </span>
          <div className="w-[80%] flex items-center gap-2">
            <div className="w-[25%] h-[1px] bg-[#c4c4c4]"></div>
            <div className="w-[50%] h-[15px] text-[#6f6f6f] flex items-center justify-center">
              Or Continue
            </div>
            <div className="w-[25%] h-[1px] bg-[#c4c4c4]"></div>
          </div>
          <div 
          onClick={googleSignUp}
          className="w-[80%] h-[40px] border-1 border-black rounded-[5px] flex items-center justify-center cursor-pointer ">
            <img src={google} alt="Google" className="w-[25px]" />
            <span className="text-[18px] text-gray-500">oogle</span>
          </div>
          <div className="text-[#6f6f6f]">
            Create a account{" "}
            <span
              className="underline underline-offset-1 text-black cursor-pointer"
              onClick={() => navigate("/signup")}
            >
              Signup
            </span>
          </div>
        </div>
        {/* right div */}
        <div className="w-[50%] h-[100%] rounded-r-2xl bg-[black] md:flex items-center justify-center flex-col hidden">
          <img src={logo} alt="Logo" className="w-40 shadow-2xl" />
          <span className="text-2xl text-white">LMS AI</span>
        </div>
      </form>
    </div>
  );
}

export default LogIn;
