import { useLocation, useNavigate, useParams } from "react-router-dom";
import languageCodes from "../components/LanguageCodes";
import { useEffect, useState } from "react";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";
import { useSelector, useDispatch } from "react-redux";
import notAvailable from "../assets/imageNotAvailable.png";
import { setLoading } from "../redux/tvSlice.js";
import SkeletonExplore from "../components/SkeletonExplore";

function Explore() {
  const dispatch = useDispatch();
  const [hoveredItemId, setHoveredItemId] = useState(null);
  const configImageData = useSelector(
    (state) => state.BingeHub.configImageData
  );
  const loading = useSelector((state) => state.BingeHub.loading);
  const [delayedLoading, setDelayedLoading] = useState(true);
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const { explore, type: rawType, id } = useParams();
  const type = rawType === "all" ? "trending" : rawType;

  const location = useLocation();
  const navigate = useNavigate();
  const genreType = useSelector((state) => state.BingeHub.genreType);
  const endpoint = () => {
    const movieGenrePaths = [
      { id: 28, name: "action" },
      { id: 12, name: "adventure" },
      { id: 16, name: "animation" },
      { id: 35, name: "comedy" },
      { id: 80, name: "crime" },
      { id: 99, name: "documentary" },
      { id: 10749, name: "romance" },
      { id: 878, name: "science_fiction" },
      { id: 53, name: "thriller" },
      { id: 27, name: "horror" },
      { id: 18, name: "drama" },
      { id: 10751, name: "family" },
      { id: 14, name: "fantasy" },
      { id: 10752, name: "war" },
      { id: 37, name: "western" },
      { id: 9648, name: "mystery" },
      { id: 10402, name: "music" },
      { id: 10770, name: "tv_movie" },
    ];
    const tvGenrePaths = [
      { id: 16, name: "animation" },
      { id: 35, name: "comedy" },
      { id: 80, name: "crime" },
      { id: 99, name: "documentary" },
      { id: 10749, name: "romance" },
      { id: 18, name: "drama" },
      { id: 10751, name: "family" },
      { id: 37, name: "western" },
      { id: 9648, name: "mystery" },
    ];

    const genrePaths = genreType === "movie" ? movieGenrePaths : tvGenrePaths;
    const matchedGenre = genrePaths.find((genre) =>
      location.pathname.includes(genre.name)
    );

    if (matchedGenre) {
      return `/discover/${genreType}?with_genres=${matchedGenre.id}`;
    }
    if (location.pathname.includes("/trending")) return "/trending/all/day";
    if (location.pathname.includes(`/movie/${id}/similar`))
      return `/movie/${id}/similar`;
    if (location.pathname.includes(`/tv/${id}/similar`))
      return `/tv/${id}/similar`;
    if (location.pathname.includes(`/movie/${id}/recommendations`))
      return `/movie/${id}/recommendations`;
    if (location.pathname.includes(`/tv/${id}/recommendations`))
      return `/tv/${id}/recommendations`;
    if (location.pathname.includes("/movie/popular")) return "/movie/popular";
    if (location.pathname.includes("/tv/popular")) return "/tv/popular";
    if (location.pathname.includes("/tv/top_rated")) return "/tv/top_rated";
    if (location.pathname.includes("/bollywood"))
      return "/discover/movie?with_original_language=hi&sort_by=popularity.desc";
    if (location.pathname.includes("/hollywood"))
      return "/discover/movie?with_original_language=en&sort_by=vote_average.desc";
    if (location.pathname.includes("/movie/top_rated"))
      return "/movie/top_rated";
    if (location.pathname.includes("/upcoming")) return "/movie/upcoming";
    if (location.pathname.includes("/now_playing")) return "/movie/now_playing";
    return `/${explore}/popular`; // Default to the base explore path
  };

  const fetchData = async (page = 1) => {
    const apiUrl = endpoint();
    dispatch(setLoading(true));
    try {
      const response = await axios.get(apiUrl, {
        params: { page },
      });
      const { results, total_pages } = response.data;
      // Update state with new data
      setData((prev) => (page === 1 ? results : [...prev, ...results]));
      setTotalPages(total_pages);
      setCurrentPage(page);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    if (!loading && data.length === 0) {
      // Show skeleton during the initial load and delay its removal
      const timeout = setTimeout(() => {
        setDelayedLoading(false);
      }, 1000);
      return () => clearTimeout(timeout);
    }

    if (loading && data.length === 0) {
      // Show skeleton only if data is empty during loading
      setDelayedLoading(true);
    }
  }, [loading, data]);

  useEffect(() => {
    setData([]); // Clear previous data
    setCurrentPage(1); // Reset to page 1
    setTotalPages(0); // Reset total pages
    fetchData(1); // Fetch data for the new section
  }, [location.pathname, genreType]);

  const handleBack = () => {
    navigate(-1);
  };

  const handleImageClick = (content) => {
    if (explore.includes("genre")) {
      navigate(`/${genreType}/details/${content?.id}`);
    } else if (explore.includes("trending")) {
      navigate(`/${content?.media_type}/details/${content?.id}`);
    } else if (explore.includes("top_rated")) {
      navigate(`/${content?.media_type}/details/${content?.id}`);
    } else {
      navigate(`/${explore}/details/${content?.id}`);
    }
  };

  return (
    <InfiniteScroll
      dataLength={data.length}
      next={() => fetchData(currentPage + 1)}
      hasMore={currentPage < totalPages}
      loader={
        <h4 className="text-center  font-poppins font-light py-4 md:text-2xl">
          Loading...
        </h4>
      }
    >
      <div className="lg:pt-[80px] pt-[70px] min-h-screen mx-auto px-4">
        <div className="w-full">
          <div className="flex items-center md:gap-4 gap-2">
            <button
              className="text-3xl xxs:text-2xl md:text-4xl lg:text-5xl py-4"
              onClick={handleBack}
            >
              <i className="ri-arrow-go-back-fill"></i>
            </button>
            <h1 className="text-3xl xxs:text-2xl md:text-4xl lg:text-5xl py-4 font-extralight">
              {type && !explore.includes("genre") ? (
                type
                  .replace(/_/g, " ")
                  .replace(/\b\w/g, (match) => match.toUpperCase())
              ) : location.pathname.includes("similar") ? (
                <>
                  {" "}
                  {location.pathname.includes("tv")
                    ? "Similar Shows"
                    : "Similar Movies"}
                </>
              ) : location.pathname.includes("recommendations") ? (
                <>
                  {" "}
                  {location.pathname.includes("tv")
                    ? "Recommended Shows"
                    : "Recommended Movies"}
                </>
              ) : null}
            </h1>
          </div>
          <div
            className={`grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 lg:gap-10 gap-4 ${
              location.pathname.includes("/genre") && genreType === "movie"
                ? "md:pt-[120px] sm:pt-[130px] pt-[150px] xs:pt-[180px] xxs:pt-[150px] xss:pt-[130px]"
                : location.pathname.includes("/genre") && genreType === "tv"
                ? "sm:pt-[60px] pt-[90px] xs:pt-[90px] xxs:pt-[80px] xss:pt-[70px]"
                : "pt-0"
            }`}
          >
            {delayedLoading && data.length === 0 && (
              <>
                {Array.from({ length: 20 }, (_, index) => (
                  <div key={index}>
                    <SkeletonExplore />
                  </div>
                ))}
              </>
            )}

            {data &&
              data.map((content, index) => (
                <div
                  key={`${content?.id}-${currentPage}-${index}`}
                  onMouseEnter={() => setHoveredItemId(content?.id)}
                  onMouseLeave={() => setHoveredItemId(null)}
                  onClick={() => handleImageClick(content)}
                >
                  <div className="relative cursor-pointer overflow-hidden rounded-lg aspect-[2/3] border border-[#000000] dark:border-[#414141] transition-all duration-300 text-center">
                    {content?.poster_path ? (
                      <img
                        src={`${configImageData}w300${content?.poster_path}`}
                        alt={content?.title || content?.name}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    ) : (
                      <img
                        src={notAvailable}
                        alt={"not-available"}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    )}
                    <div
                      className={`absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 lg:flex hidden items-center justify-center transition-opacity duration-300 ${
                        hoveredItemId === content?.id
                          ? "opacity-100"
                          : "opacity-0"
                      }`}
                    >
                      <div className="text-center xl:block hidden text-white">
                        <h2 className="text-lg font-semibold cursor-auto">
                          {content?.title || content?.name}
                        </h2>
                        <p className="text-sm cursor-auto">
                          {(content.overview &&
                            content?.overview.slice(0, 400) + "...") ||
                            "N/A"}
                        </p>
                      </div>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-60 hover:opacity-0 transition-opacity duration-300 lg:block block" />
                    <div className="absolute bottom-0 w-full text-wrap text-center space-x-1 lg:space-x-2 p-1 lg:block block text-white">
                      <div className="font-semibold flex justify-center space-x-2 ">
                        <h1 className="cursor-auto">
                          {content?.title || content?.name}
                          <span className="font-normal ml-1 cursor-auto">
                            {(
                              content?.release_date || content?.first_air_date
                            )?.substring(0, 4)}
                          </span>
                        </h1>
                      </div>
                      <span className="cursor-auto">{content?.media_type}</span>
                      <span className="cursor-auto">
                        {languageCodes[content?.original_language] || "Unknown"}
                      </span>
                      <span className="flex items-center justify-center gap-1 cursor-auto">
                        {content?.vote_average?.toFixed(1)}
                        <i className="ri-star-half-line text-sm"></i>
                      </span>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </InfiniteScroll>
  );
}

export default Explore;
