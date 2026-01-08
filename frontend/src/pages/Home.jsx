import Nav from "../components/Nav";
import home1 from "../assets/home1.jpg";
import { SiViaplay } from "react-icons/si";
import ai from "../assets/ai.png";
import ai1 from "../assets/SearchAi.png";
import Logos from "../components/Logos";
import ExploreCoureses from "../components/ExploreCoureses";
import CardPage from "../components/CardPage";
import { useNavigate } from "react-router-dom";
import About from "../components/About";
import Footer from "../components/Footer";

function Home() {

  const navigate = useNavigate()

  return (
    <div className="w-[100%] overflow-hidden">
      <div className="w-[100%] lg:h-[140vh] h-[70vh] relative">
        <Nav></Nav>
        <img
          src={home1}
          alt="HomePageImg"
          className="object-cover md:object-fill w-[100%] lg:h-[100%] h-[50vh]"
        />

        <span className="lg:text-[70px] absolute md:text-[40px] lg:top-[10%] top-[15%] w-[100%] flex items-center justify-center text-white font-bold text-[20px]">
          Grow Your Skills to Advance
        </span>
        <span className="lg:text-[70px] absolute md:text-[40px] lg:top-[18%] top-[20%] w-[100%] flex items-center justify-center text-white font-bold text-[20px]">
          Your Career Path
        </span>
        <div className="absolute lg:top-[30%] top-[75%] md:top-[80%] w-[100%] flex items-center justify-center gap-3 flex-wrap">
          <button
          onClick={()=> navigate('/allcourses') }
          className="px-[20px] py-[10px] border-2 lg:border-white border-black lg:text-white text-black rounded-[10px] text-[18px] font-light flex gap-2 cursor-pointer">
            View All Courses{" "}
            <SiViaplay className="w-[30px] h-[30px] lg:fill-white fill-black" />
          </button>
          <button
          onClick={()=> navigate('/search')}
          className="px-[20px] py-[10px] border-2 lg:border-white border-black lg:text-black text-white rounded-[10px] text-[18px] font-light flex gap-2 cursor-pointer items-center justify-center lg:bg-white bg-black">
            Search With AI{" "}
            <img
              src={ai}
              alt="Ai"
              className="w-[30px] h-[30px] rounded-full hidden lg:block"
            />{" "}
            <img
              src={ai1}
              alt="Ai"
              className="w-[30px] h-[30px] rounded-full  lg:hidden"
            />{" "}
          </button>
        </div>
      </div>
      <Logos />
      <ExploreCoureses />
      <CardPage />
      <About/>
      <Footer/>
    </div>
  );
}

export default Home;
