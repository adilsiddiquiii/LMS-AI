import { ClipLoader } from "react-spinners";
import { useEffect, useState } from "react";

const LoadingScreen = () => {
  const [showTimeoutMessage, setShowTimeoutMessage] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTimeoutMessage(true);
    }, 20000); // Show "still waking up" message after 20 seconds

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white dark:bg-gray-950 transition-all duration-500">
      <div className="flex flex-col items-center gap-6 p-8 rounded-2xl max-w-sm w-full text-center">
        {/* Spinner */}
        <div className="relative">
          <div className="absolute inset-0 blur-xl bg-blue-500/20 rounded-full animate-pulse"></div>
          <ClipLoader size={60} color="#000" speedMultiplier={0.8} />
        </div>

        {/* Text content */}
        <div className="space-y-3">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 animate-pulse">
            LMS AI
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">
            Connecting to server...
          </p>
          <div className="flex flex-col gap-1">
            <p className="text-xs text-blue-600 dark:text-blue-400 font-semibold tracking-wide uppercase">
              Free Server Waking Up
            </p>
            <p className="text-[10px] text-gray-400 italic">
              Please wait (can take 60-90s)
            </p>
          </div>
        </div>

        {/* Timeout Message */}
        {showTimeoutMessage && (
          <div className="mt-4 p-3 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg animate-in fade-in slide-in-from-top-2 duration-700">
            <p className="text-xs text-amber-700 dark:text-amber-300 font-medium leading-relaxed">
              Backend is still waking up... Thank you for your patience! ☕
            </p>
          </div>
        )}
      </div>
      
      {/* Subtle background element */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 opacity-30 select-none pointer-events-none">
        <span className="text-[10px] text-gray-300 dark:text-gray-700 tracking-[0.2em] font-light">
          POWERED BY GOOGLE GENAI
        </span>
      </div>
    </div>
  );
};

export default LoadingScreen;
