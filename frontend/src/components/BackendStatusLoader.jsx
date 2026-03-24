import { ClipLoader } from "react-spinners";

const BackendStatusLoader = () => {
  return (
    <div className="fixed top-0 left-0 right-0 z-[10000] flex items-center justify-center p-2 bg-black/80 backdrop-blur-sm border-b border-white/10 animate-in fade-in slide-in-from-top duration-500">
      <div className="flex items-center gap-3">
        <ClipLoader size={12} color="#fff" speedMultiplier={0.8} />
        <span className="text-[11px] text-white font-medium tracking-wide uppercase">
          Server Waking Up... <span className="text-gray-400 font-normal normal-case italic">(60-90s)</span>
        </span>
      </div>
    </div>
  );
};

export default BackendStatusLoader;
