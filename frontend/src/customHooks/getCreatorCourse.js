import axios from "axios";
import React, { useEffect } from "react";
import { serverUrl } from "../App";
import { useDispatch, useSelector } from "react-redux";
import { setCreatorCourseData } from "../redux/courseSlice";
import { toast } from "react-toastify";

const useCreatorCourse = () => {
  const dispatch = useDispatch();
  const { userdata } = useSelector((state) => state.user);

  useEffect(() => {
    if (!userdata) return;
    const creatorCourses = async () => {
      try {
        const result = await axios.get(
          serverUrl + "/api/course/getCreatorCourses",
          { withCredentials: true }
        );
        console.log(result);
        dispatch(setCreatorCourseData(result.data));
      } catch (error) {
        console.log(error);
        toast.error("Failed to get the Courses");
      }
    };
    creatorCourses();
  }, [userdata]);
};

export default useCreatorCourse;
