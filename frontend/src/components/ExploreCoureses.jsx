import { SiViaplay } from "react-icons/si";
import { TiDeviceDesktop } from "react-icons/ti";
import { FaUikit } from "react-icons/fa6";
import { IoLogoGooglePlaystore } from "react-icons/io5";
import { FaHackerrank } from "react-icons/fa";
import { GiArtificialIntelligence } from "react-icons/gi";
import { FaDatabase } from "react-icons/fa6";
import { DiGoogleAnalytics } from "react-icons/di";
import { AiFillTool } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

function ExploreCoureses() {
  const navigate = useNavigate()
  return (
    <div className='w-[100vw] min-h-[70vh] lg:h-[50vh] flex flex-col lg:flex-row items-center justify-center gap-4 px-[30px]'>

      {/* left ka upar wala */}
      <div className='w-[100%] lg:w-[350px] lg:h-[100%] h-[400px]  flex flex-col items-start justify-center gap-1 md:px-[40px] px-[20px]'>

        <span className='text-[35px] font-semibold'>Explore</span>
        <span className='text-[35px] font-semibold'>Our Courses</span>
        <p className='text-[17px]'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur dolor perspiciatis libero minima eaque sint doloremque magnam delectus reiciendis aliquam.</p>
        <button
        onClick={()=> navigate('/allcourses') }
        className='px-[20px] py-[10px] border-2 bg-[black] border-white text-white rounded-[10px] text-[18px] font-light flex gap-2 mt-[40px] cursor-pointer'>Explore Courses <SiViaplay className="w-[30px] h-[30px] fill-white" /> </button>
      </div>

       {/* right ka niche wala */}
      <div className="w-[720px] max-w-[90%] lg:h-[300px] md:min-h-[300px] flex items-center justify-center lg:gap-[60px] gap-[50px] flex-wrap mb-[50px] lg:mb-[0px]">
        <div className="w-[100px] h-[130px] font-light text-[13px] flex flex-col gap-3 text-center">
          <div className="w-[100px] h-[90px] bg-[#fbd9fb] rounded-lg flex items-center justify-center" >
            <TiDeviceDesktop className="w-[60px] h-[60px] text-[#6d6c6c]"/>
          </div>
          Web Dev
        </div>
        <div className="w-[100px] h-[130px] font-light text-[13px] flex flex-col gap-3 text-center">
          <div className="w-[100px] h-[90px] bg-[#eaef9e] rounded-lg flex items-center justify-center" >
            <FaUikit className="w-[60px] h-[60px] text-[#6d6c6c]"/>
          </div>
          UI/UX    Designing
        </div>
        <div className="w-[100px] h-[130px] font-light text-[13px] flex flex-col gap-3 text-center">
          <div className="w-[100px] h-[90px] bg-[#9eb3f1] rounded-lg flex items-center justify-center" >
            <IoLogoGooglePlaystore className="w-[60px] h-[60px] text-[#6d6c6c]"/>
          </div>
          App Dev
        </div>
        <div className="w-[100px] h-[130px] font-light text-[13px] flex flex-col gap-3 text-center">
          <div className="w-[100px] h-[90px] bg-[#fd9b9b] rounded-lg flex items-center justify-center" >
            <FaHackerrank className="w-[60px] h-[60px] text-[#6d6c6c]"/>
          </div>
          Ethical Hacking
        </div>

        <div className="w-[100px] h-[130px] font-light text-[13px] flex flex-col gap-3 text-center">
          <div className="w-[100px] h-[90px] bg-[#b3ff99] rounded-lg flex items-center justify-center" >
            <GiArtificialIntelligence className="w-[60px] h-[60px] text-[#6d6c6c]"/>
          </div>
          AI/ML
        </div>
        
        <div className="w-[100px] h-[130px] font-light text-[13px] flex flex-col gap-3 text-center">
          <div className="w-[100px] h-[90px] bg-[#8fffe1] rounded-lg flex items-center justify-center" >
            <FaDatabase className="w-[60px] h-[60px] text-[#6d6c6c]"/>
          </div>
          Data Science
        </div>

        <div className="w-[100px] h-[130px] font-light text-[13px] flex flex-col gap-3 text-center">
          <div className="w-[100px] h-[90px] bg-[#ebbcff] rounded-lg flex items-center justify-center" >
            <DiGoogleAnalytics className="w-[60px] h-[60px] text-[#6d6c6c]"/>
          </div>
          Data Analytics
        </div>

        <div className="w-[100px] h-[130px] font-light text-[13px] flex flex-col gap-3 text-center">
          <div className="w-[100px] h-[90px] bg-[#faa6c5] rounded-lg flex items-center justify-center" >
            <AiFillTool className="w-[60px] h-[60px] text-[#6d6c6c]"/>
          </div>
          AI Tools
        </div>
      </div>
    </div>
  )
}

export default ExploreCoureses
