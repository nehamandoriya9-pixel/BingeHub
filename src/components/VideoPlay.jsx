import { useEffect, useRef, useState } from "react";
import useFetchDetails from "../hooks/useFetchDetails";
import { motion, AnimatePresence } from "framer-motion";

function VideoPlay({
  mediaId,
  mediaType,
  onClose,
  videoType,
  setDimMode,
  dimMode,
}) {
  const [videoKey, setVideoKey] = useState(null);
  const [isMouseOver, setIsMouseOver] = useState(false);
  const videoRef = useRef(null);

  // Fetch videos using `useFetchDetails`
  const {
    data: videoData,
    loading,
    error,
  } = useFetchDetails(`/${mediaType}/${mediaId}/videos`);

  // Extract the video key when data is fetched
  useEffect(() => {
    if (videoData?.results) {
      const video = videoData.results.find(
        (video) => video.type === videoType && video.site === "YouTube"
      );
      setVideoKey(video?.key || null); // Set the video key or null if no video is found
    }
  }, [videoData, videoType]);

  const handleInteractionOutside = (event) => {
    if (videoRef.current && !videoRef.current.contains(event.target)) {
      onClose();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleInteractionOutside); // For clicks
    return () => {
      document.removeEventListener("mousedown", handleInteractionOutside); // For clicks
    };
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error)
    return <div>Error fetching video data. Please try again later.</div>;

  if (!videoKey) {
    return (
      <div className="fallback-container fixed bottom-0  w-4/5 sm:w-2/3 md:w-[25%] z-50 left-1/2 -translate-x-1/2">
        <motion.div
          ref={videoRef}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          transition={{
            type: "spring",
            stiffness: 200,
            damping: 20,
            duration: 1,
          }}
          className="relative text-center text-white bg-black/90 h-[150px] flex flex-col items-center justify-center rounded-lg gap-2"
        >
          <p className="text-lg">
            No {videoType} available for this{" "}
            {mediaType === "movie" ? "movie" : "show"}
          </p>
          <button
            className="bg-[#303030] hover:bg-[#464646] transition-colors duration-200 text-white px-3 py-1 rounded"
            onClick={onClose}
          >
            <i className="ri-close-large-fill"></i>
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div
      className="video-container fixed top-1/2 -translate-y-1/2 w-full sm:w-2/3 lg:w-2/3 z-50 left-1/2 -translate-x-1/2"
      onMouseEnter={() => setIsMouseOver(true)}
      onMouseLeave={() => setIsMouseOver(false)}
    >
      <AnimatePresence>
        <motion.div
          ref={videoRef}
          className="relative"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          transition={{
            type: "spring",
            stiffness: 200,
            damping: 20,
            duration: 1,
          }}
        >
          <iframe
            className="h-[250px] sm:h-[300px] md:h-[350px] lg:h-[600px]"
            width="100%"
            height="100%"
            src={`https://www.youtube.com/embed/${videoKey}`}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen; geolocation; microphone; camera"
            allowFullScreen
          ></iframe>

          <button
            className="absolute md:hidden top-1/2 right-2 bg-[#303030] hover:bg-[#464646] transition-colors duration-200 text-white px-2 py-1/2 rounded"
            onClick={onClose}
          >
            <i className="ri-close-large-fill"></i>
          </button>
          {isMouseOver && (
            <>
              <button
                className="absolute md:block hidden top-1/2 right-2 bg-[#303030] hover:bg-[#464646] transition-colors duration-200 text-white px-3 py-1 rounded"
                onClick={onClose}
              >
                <i className="ri-close-large-fill"></i>
              </button>
              <button
                className="absolute md:block hidden top-1/2 left-2 bg-[#303030] hover:bg-[#464646] transition-colors duration-200 text-white px-3 py-1 rounded"
                onClick={() => setDimMode((prev) => !prev)}
              >
                {dimMode ? (
                  <i className="ri-lightbulb-fill"></i>
                ) : (
                  <i className="ri-lightbulb-line"></i>
                )}
              </button>
            </>
          )}
          <button
            className="absolute md:hidden top-1/2 left-2 bg-[#303030] hover:bg-[#464646] transition-colors duration-200 text-white px-2 py-1/1 rounded"
            onClick={() => setDimMode((prev) => !prev)}
          >
            {dimMode ? (
              <i className="ri-lightbulb-fill"></i>
            ) : (
              <i className="ri-lightbulb-line"></i>
            )}
          </button>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default VideoPlay;
