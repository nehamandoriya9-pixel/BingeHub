import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Card from "./Card";
import { useNavigate } from "react-router-dom";
import SkeletonBannerHome from "./SkeletonBannerHome";
import ButtonControls from "./ButtonControls";

function Home() {
  const loading = useSelector((state) => state.BingeHub.loading);
  const [delayedLoading, setDelayedLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const bannerData = useSelector((state) => state.BingeHub.bannerData);
  const imgURL = useSelector((state) => state.BingeHub.configImageData);
  const nowPlayingData = useSelector((state) => state.BingeHub.nowPlayingData);
  const topRatedData = useSelector((state) => state.BingeHub.topRatedData);
  const tvSeriesData = useSelector((state) => state.BingeHub.tvSeriesData);
  const bollywoodData = useSelector((state) => state.BingeHub.bollywoodData);
  const hollywoodData = useSelector((state) => state.BingeHub.hollywoodData);
  const [bannerEntered, setBannerEntered] = useState(false);
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (bannerData.length > 0 && !bannerEntered) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) =>
          prevIndex === bannerData.length - 1 ? 0 : prevIndex + 1
        );
      }, 3000);

      return () => clearInterval(interval);
    }
  }, [bannerData, bannerEntered]);

  const handleImageClick = (content) => {
    navigate(`/${content?.media_type}/details/${content?.id}`);
  };

  useEffect(() => {
    if (!loading && bannerData.length === 0) {
      // Show skeleton during the initial load and delay its removal
      const timeout = setTimeout(() => {
        setDelayedLoading(false);
      }, 1000);
      return () => clearTimeout(timeout);
    }

    if (loading && bannerData.length === 0) {
      // Show skeleton only if data is empty during loading
      setDelayedLoading(true);
    }
  }, [loading, bannerData]);

  return (
    <div className="carousel w-full h-full min-h-screen text-white ">
      <div className="w-full min-h-full max-h-[98vh] flex overflow-hidden">
        {delayedLoading && bannerData.length === 0 && (
          <>
            {Array.from({ length: 20 }, (_, index) => (
              <div key={index}>
                <SkeletonBannerHome />
              </div>
            ))}
          </>
        )}
        {bannerData &&
          bannerData.map((content) => (
            <div
              className="carousel-banner min-w-full md:min-h-screen min-h-[650px] flex relative transition-all duration-500 ease-in-out mx-auto"
              key={content?.id}
              style={{
                transform: `translateX(-${currentIndex * 100}%)`,
              }}
              onClick={(e) => {
                handleImageClick(content);
                e.stopPropagation();
              }}
            >
              <div className="h-full w-full">
                {/* Low Quality Image placeholder */}
                <img
                  src={
                    content?.poster_path || content?.backdrop_path
                      ? imgURL +
                        (isMobile
                          ? `w92${content?.poster_path}`
                          : `w300${content?.backdrop_path}`)
                      : null
                  }
                  alt={content?.title || content?.name}
                  className={`absolute inset-0 blur-md transition-opacity duration-500 w-full h-full object-cover flex-shrink-0 ${
                    imageLoaded ? "opacity-0" : "opacity-100"
                  }`}
                  style={{
                    userSelect: "none",
                  }}
                  loading="lazy"
                />
                {/* High Quality Image */}
                <img
                  src={
                    content?.poster_path || content?.backdrop_path
                      ? imgURL +
                        (isMobile
                          ? `w500${content?.poster_path}`
                          : `w1280${content?.backdrop_path}`)
                      : null
                  }
                  alt={content?.title || content?.name}
                  className={`w-full h-full object-cover flex-shrink-0 transition-opacity duration-500 ${
                    imageLoaded ? "opacity-100" : "opacity-0"
                  }`}
                  style={{
                    userSelect: "none",
                  }}
                  loading="lazy"
                  onLoad={() => setImageLoaded(true)}
                />
              </div>
              <div className="absolute inset-0 bg-[radial-gradient(rgba(0,0,0,0.1),rgba(0,0,0,0.8))]" />

              {/* buttons controls */}
              <ButtonControls
                setCurrentIndex={setCurrentIndex}
                bannerData={bannerData}
                isMobile={isMobile}
                setBannerEntered={setBannerEntered}
              />

              <div className="absolute lg:left-20 left-4 text-wrap lg:w-1/2 md:w-[70%] w-1/2 h-full">
                <div className="flex h-full w-full flex-col justify-end lg:pb-12 sm:pb-8 pb-2">
                  <span
                    onMouseEnter={() => setBannerEntered(true)}
                    onMouseLeave={() => setBannerEntered(false)}
                  >
                    <h1 className="text-3xl md:text-4xl xxs:text-2xl lg:text-5xl py-0 md:py-2 font-bold">
                      {content?.title || content?.name}
                      <span className="font-extralight md:font-thin ml-4">
                        {(
                          content?.release_date || content?.first_air_date
                        )?.substring(0, 4)}
                      </span>
                    </h1>
                  </span>
                  <p
                    className="text-sm hidden md:block font-normal text-[#ededed]"
                    onMouseEnter={() => setBannerEntered(true)}
                    onMouseLeave={() => setBannerEntered(false)}
                  >
                    {content?.overview &&
                      content?.overview.slice(0, 300) + "..."}
                  </p>
                  <div className="flex space-x-2 text-nowrap xxs:text-sm">
                    <h1
                      className="mt-2"
                      onMouseEnter={() => setBannerEntered(true)}
                      onMouseLeave={() => setBannerEntered(false)}
                    >
                      Rating:{" "}
                      <span>
                        {content?.vote_average &&
                          content?.vote_average.toFixed(1) + "+"}
                      </span>{" "}
                    </h1>
                    <h1
                      className="mt-2"
                      onMouseEnter={() => setBannerEntered(true)}
                      onMouseLeave={() => setBannerEntered(false)}
                    >
                      Views:{" "}
                      <span>
                        {content?.vote_count &&
                          content?.vote_count.toFixed(0) + "+"}
                      </span>
                    </h1>
                  </div>
                  <button
                    className="mt-2 -ml-1 w-fit"
                    onMouseEnter={() => setBannerEntered(true)}
                    onMouseLeave={() => setBannerEntered(false)}
                  >
                    <i className="ri-play-circle-fill text-5xl xxs:text-4xl flex items-center gap-1 lg:gap-2 text-[#72ad7f]">
                      {" "}
                      <span className="text-2xl lg:text-3xl xxs:text-lg text-nowrap font-poppins font-bold text-white">
                        Play Now
                      </span>{" "}
                    </i>
                  </button>
                </div>
              </div>
            </div>
          ))}
      </div>

      <Card data={bannerData} heading="Trending" />
      <Card data={topRatedData} heading="Top Rated" media_type="movie" />
        <Card data={nowPlayingData} heading="Now Playing" media_type="movie" />
        <Card data={tvSeriesData} heading="Popular Shows" media_type="tv" />
        <Card data={bollywoodData} heading="Bollywood" media_type="movie" />
        <Card data={hollywoodData} heading="Hollywood" media_type="movie" />
    </div>
  );
}

export default Home;
