import { FaLongArrowAltLeft } from "react-icons/fa";
import Nav from "../components/Nav";
import { useNavigate } from "react-router-dom";
import ai from "../assets/SearchAi.png";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Cards from "../components/Cards";

function AllCourses() {
  const navigate = useNavigate();

  const { courseData } = useSelector((state) => state.course);

  const [category, setCategory] = useState([]);
  const [filterCourses, setFilterCourses] = useState([]);
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);

  const toggleCategory = (e) => {
    if (category.includes(e.target.value)) {
      setCategory((prev) => prev.filter((c) => c !== e.target.value));
    } else {
      setCategory((prev) => [...prev, e.target.value]);
    }
  };

  const applyFilter = () => {
    let courseCopy = courseData?.slice();
    if (category.length > 0) {
      courseCopy = courseCopy.filter((c) => category.includes(c.category));
    }
    setFilterCourses(courseCopy);
  };

  useEffect(() => {
    setFilterCourses(courseData);
  }, [courseData]);

  useEffect(() => {
    applyFilter();
  }, [category]);

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Nav />

      <button
      onClick={()=> setIsSidebarVisible(prev=> !prev)}
      className="fixed top-20 left-4 z-50 bg-white text-black px-3 py-1 rounded md:hidden border-2 border-black">
        {isSidebarVisible ? "Hide" : "Show"}
      </button>
      {/* sidebar */}
      <aside className={`w-[260px] h-screen overflow-y-auto bg-black fixed top-0 left-0 p-6 py-[130px] border-r border-gray-200 shadow-md transition-transform duration-300 z-5 ${isSidebarVisible ? "translate x-0 " : "-translate-x-full" } md:block md:translate-x-0 `}>
        <h2 className="text-xl font-bold flex items-center justify-center gap-2 text-gray-50 mb-6">
          {" "}
          <FaLongArrowAltLeft
            onClick={() => navigate("/ ")}
            className="text-white "
          />{" "}
          Filter By Category
        </h2>

        <form
          onSubmit={(e) => e.preventDefault()}
          action=""
          className="space-y-4 text-sm bg-gray-600 border-white text-[white] border p-[20px] rounded-2xl"
        >
          <button
          onClick={()=> navigate('/search')}
          className="px-[10px] py-[10px] bg-black text-white rounded-[10px] text-[15px] font-light flex items-center justify-center gap-2 cursor-pointer">
            Search With AI{" "}
            <img className="w-[30px] h-[30px] rounded-full" src={ai} alt="" />
          </button>

          <label
            htmlFor=""
            className="flex items-center gap-3 cursor-pointer hover:text-gray-200 transition"
          >
            <input
              onChange={toggleCategory}
              value={"App Development"}
              type="checkbox"
              className="accept-black w-4 h-4 rounded-md"
            />{" "}
            App Development
          </label>
          <label
            htmlFor=""
            className="flex items-center gap-3 cursor-pointer hover:text-gray-200 transition"
          >
            <input
              onChange={toggleCategory}
              value={"AI/ML"}
              type="checkbox"
              className="accept-black w-4 h-4 rounded-md"
            />{" "}
            AI/ML
          </label>
          <label
            htmlFor=""
            className="flex items-center gap-3 cursor-pointer hover:text-gray-200 transition"
          >
            <input
              onChange={toggleCategory}
              value={"Web Development"}
              type="checkbox"
              className="accept-black w-4 h-4 rounded-md"
            />{" "}
            Web Development
          </label>
          <label
            htmlFor=""
            className="flex items-center gap-3 cursor-pointer hover:text-gray-200 transition"
          >
            <input
              onChange={toggleCategory}
              value={"UI UX Designing"}
              type="checkbox"
              className="accept-black w-4 h-4 rounded-md"
            />{" "}
            UI UX Designing
          </label>
          <label
            htmlFor=""
            className="flex items-center gap-3 cursor-pointer hover:text-gray-200 transition"
          >
            <input
              onChange={toggleCategory}
              value={"Ethical Hacking"}
              type="checkbox"
              className="accept-black w-4 h-4 rounded-md"
            />{" "}
            Ethical Hacking
          </label>
          <label
            htmlFor=""
            className="flex items-center gap-3 cursor-pointer hover:text-gray-200 transition"
          >
            <input
              onChange={toggleCategory}
              value={"Others"}
              type="checkbox"
              className="accept-black w-4 h-4 rounded-md"
            />{" "}
            Others
          </label>
        </form>
      </aside>
      <main className="w-full transition-all duration-300 py-[130] md:pl-[300px] flex items-center justify-center md:justify-start flex-wrap gap-6 px-[10px]">
        {filterCourses?.map((course, index) => (
          <Cards
            key={index}
            thumbnail={course.thumbnail}
            title={course.title}
            category={course.category}
            price={course.price}
            id={course._id}
          />
        ))}
      </main>
    </div>
  );
}

export default AllCourses;
