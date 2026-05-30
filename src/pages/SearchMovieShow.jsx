import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import languageCodes from "../components/LanguageCodes";
import { useDispatch, useSelector } from "react-redux";
import { setSearchInput } from "../redux/tvSlice";
import notFound from "../assets/noResFound.png";
import notAvailable from "../assets/imageNotAvailable.png";
import { setLoading, setError } from "../redux/tvSlice.js";
import SkeletonExplore from "../components/SkeletonExplore";

function SearchMovieShow() {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.BingeHub.loading);
  const error = useSelector((state) => state.BingeHub.error);
  const [delayedLoading, setDelayedLoading] = useState(true);

  const searchInput = useSelector((state) => state.BingeHub.searchInput);
  const configImageData = useSelector(
    (state) => state.BingeHub.configImageData
  );
  const location = useLocation();
  const [hoveredItemId, setHoveredItemId] = useState(null);
  const [results, setResults] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get("q");
  const navigate = useNavigate();

  const fetchResults = async (page = 1) => {
    if (!query) return;
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get("/search/multi", {
        params: {
          query: query,
          page: page,
        },
      });
      const { results, total_pages } = response.data;
      const filteredResults = results.filter(
        (item) => item?.media_type === "movie" || item?.media_type === "tv"
      );
      setResults((prev) => [...prev, ...filteredResults]);
      setTotalPages(total_pages);
      setCurrentPage(page);
    } catch (error) {
      console.error("Error fetching search results:", error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setResults([]);
    setCurrentPage(1);
    setTotalPages(0);
    fetchResults(1);
  }, [query]);

  const handleBack = () => {
    navigate("/");
    setResults([]);
    setCurrentPage(1);
    setTotalPages(0);
    dispatch(setSearchInput(""));
  };

  useEffect(() => {
    if (location.pathname === "/") {
      dispatch(setSearchInput(""));
    }
  }, [location]);

  const handleImageClick = (content) => {
    navigate(`/${content?.media_type}/details/${content?.id}`);
  };

  useEffect(() => {
    if (!loading && results.length === 0) {
      // Show skeleton during the initial load and delay its removal
      const timeout = setTimeout(() => {
        setDelayedLoading(false);
      }, 1000);
      return () => clearTimeout(timeout);
    }

    if (loading && results.length === 0) {
      // Show skeleton only if data is empty during loading
      setDelayedLoading(true);
    }
  }, [loading, results]);

  return (
    <InfiniteScroll
      dataLength={results.length}
      next={() => fetchResults(currentPage + 1)}
      hasMore={currentPage < totalPages}
      loader={
        <h4 className="text-center  font-poppins font-light">Loading...</h4>
      }
    >
      {" "}
      <div className="mb-4 absolute left-1/2 -translate-x-1/2 lg:top-[100px] md:top-[90px] top-[90px]">
        <h1 className="text-2xl font-extralight font-jose text-center">
          Search Results for{" "}
          <span className="font-poppins font-normal">&quot;{query}&quot;</span>
        </h1>
        {!delayedLoading &&
          !error &&
          results.length === 0 &&
          query.trim() !== "" && (
            <div className="flex flex-col items-center w-full gap-2 h-[35vh] justify-center">
              <p className="text-gray-500">No results found.</p>
              <div className="">
                <div className="overflow-hidden w-[200px] h-[200px] rounded-full">
                  <img
                    src={notFound}
                    className="object-cover w-full h-full"
                    alt="not-found"
                  />
                </div>
              </div>
            </div>
          )}
      </div>
      <div className="lg:pt-[75px] pt-[70px] min-h-screen  mx-auto lg:px-10 px-4 ">
        <div className="w-full">
          <button
            className="text-3xl xxs:text-2xl md:text-4xl lg:text-5xl py-4"
            onClick={handleBack}
          >
            <i className="ri-arrow-go-back-fill"></i>
          </button>
          <div
            className={`${
              searchInput.length > 10
                ? "md:pt-[10px] pt-[60px]"
                : "pt-[30px] md:pt-[10px] xs:pt-[30px]"
            }  grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 lg:gap-10 gap-4`}
          >
            {delayedLoading && results.length === 0 && (
              <>
                {Array.from({ length: 20 }, (_, index) => (
                  <div key={index}>
                    <SkeletonExplore />
                  </div>
                ))}
              </>
            )}
            {results &&
              results.map((content, index) => (
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
                      />
                    ) : (
                      <img
                        src={notAvailable}
                        alt={"not-available"}
                        className="w-full h-full object-cover"
                      />
                    )}
                    <div
                      className={`absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 lg:flex hidden items-center justify-center  transition-opacity duration-300 ${
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

export default SearchMovieShow;
