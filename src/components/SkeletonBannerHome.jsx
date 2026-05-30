import { useEffect, useState } from "react";
import { motion } from "framer-motion";

function SkeletonBannerHome() {
  const [exceededDelay, setExceededDelay] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setExceededDelay(true);
    }, 3000);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="w-[100vw] lg:min-h-[98vh] min-h-[650px] bg-gradient-to-r from-[#1d1b1b]  to-[#000000] animate-pulse rounded-lg relative flex flex-col">
      {/* Placeholder for image */}
      <div className="flex-1 bg-gradient-to-r from-[#1b1b1b]  to-[#000000] rounded-t-lg"></div>
      {/* Placeholder for text */}
      {exceededDelay && (
        <div className="flex absolute justify-center w-full items-center lg:min-h-[98vh] min-h-[650px] text-lg lg:text-xl flex-wrap">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 1,
            }}
            className="text-center"
          >
            Content not loading? Use&nbsp;<span className="font-bold">VPN</span>
            &nbsp;or change your&nbsp;<span className="font-bold">DNS</span>.
          </motion.h1>
        </div>
      )}
      <div className="p-4 space-y-2 flex flex-col items-start justify-center h-[30vh] lg:pl-20 pl-4">
        <div className="bg-[#959595] h-12 lg:h-14 w-1/3 rounded-2xl"></div>
        <div className="bg-[#454545] h-8 w-1/2 rounded-2xl"></div>
        <div className="bg-[#4b4b4b] h-7 w-1/4 rounded-2xl"></div>
        <div className="bg-[#464646] h-5 lg:w-1/12 w-1/3 rounded-2xl"></div>
      </div>
    </div>
  );
}

export default SkeletonBannerHome;
