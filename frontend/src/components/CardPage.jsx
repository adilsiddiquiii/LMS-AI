import React, { useEffect, useState } from "react";
import Cards from "./Cards";
import { useSelector } from "react-redux";

function CardPage() {
  const { courseData } = useSelector((state) => state.course);

  const [PopularCourses, setPopularCourses] = useState([]);

  useEffect(() => {
    setPopularCourses(courseData?.slice(0,6))
  }, [courseData]);

  return (
    <div className="relative flex items-center justify-center flex-col">
      <h1 className="md:text-[45px] text-[30px] font-semibold text-center mt-[30px] px-[20px]">
        Our Popular Courses
      </h1>
      <span className="lg:w-[50%] md:w-[80%] text-[15px] text-center mt-[30px] mb-[30px] px-[20px]">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor
        reprehenderit nam dicta modi, sed nemo repellendus inventore minima
        explicabo architecto.
      </span>

      <div className="w-[100%]  flex items-center justify-center flex-wrap gap-[50px] lg:p-[50px] md:p-[30px] p-[10px] mb-[40px]">

        {PopularCourses?.map((course , index)=>{ return (
          <Cards key={index} thumbnail={course.thumbnail} title={course.title} category={course.category} price={course.price} id={course._id}  /> )
        })}
      </div>
    </div>
  );
}

export default CardPage;
