import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { NavLink, useLocation, useNavigate, useParams } from "react-router-dom";
import "remixicon/fonts/remixicon.css";
import { setGenreType, setSearchInput } from "../redux/tvSlice.js";
import { motion } from "framer-motion";
import DarkModeToggle from "./DarkModeToggle";
import { toggleDarkMode } from "../redux/darkModeSlice";

function Navbar() {
  const isDarkMode = useSelector((state) => state.darkMode.isDarkMode);
  const [isMobileView, setIsMobileView] = useState(window.innerWidth < 768);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchClicked, setIsSearchClicked] = useState(false);
  const [isGenreClicked, setIsGenreClicked] = useState(false);
  const dispatch = useDispatch();
  const genreType = useSelector((state) => state.BingeHub.genreType);
  const searchInput = useSelector((state) => state.BingeHub.searchInput);
  const navigate = useNavigate();
  const menuRef = useRef(null);
  const buttonRef = useRef(null);
  const location = useLocation();
  const { explore } = useParams();

  useEffect(() => {
    const handleResize = () => setIsMobileView(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
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
  const genres = genreType === "movie" ? movieGenrePaths : tvGenrePaths;
  const sectionEndpoints = [
    { label: "Home", to: "/", icon: "ri-home-4-line" },
    { label: "Movies", to: "/movie/popular", icon: "ri-film-line" },
    { label: "Tv Shows", to: "/tv/top_rated", icon: "ri-tv-line" },
    { label: "Upcoming", to: "/movie/upcoming", icon: "ri-calendar-2-line" },
  ];
  const handleSearchClickMobile = () => {
    if (isMobileView && searchInput) {
      setIsSearchClicked(true);
      return;
    }
    if (isMobileView) {
      setIsSearchClicked(!isSearchClicked);
    }
  };
  const handleToggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };
  const handleInteractionOutside = (event) => {
    if (
      menuRef.current &&
      !menuRef.current.contains(event.target) &&
      buttonRef.current &&
      !buttonRef.current.contains(event.target)
    ) {
      setIsMenuOpen(false);
    }
  };
  //for menu
  useEffect(() => {
    if (isMenuOpen) {
      document.addEventListener("mousedown", handleInteractionOutside);
      document.addEventListener("touchstart", handleInteractionOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleInteractionOutside);
      document.removeEventListener("touchstart", handleInteractionOutside);
    };
  }, [isMenuOpen]);

  //for search
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchInput) {
        navigate(`/search?q=${encodeURIComponent(searchInput)}`);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [searchInput]);

  const handleClickGenre = () => {
    setIsGenreClicked(true);
  };

  useEffect(() => {
    if (!location.pathname.includes("/genre")) {
      setIsGenreClicked(false);
    } else {
      setIsGenreClicked(true);
      dispatch(setSearchInput(""));
    }
  }, [location.pathname]);

  const handleTvShows = () => {
    dispatch(setGenreType("tv"));
  };

  const handleMovies = () => {
    dispatch(setGenreType("movie"));
  };

  useEffect(() => {
    if (location.pathname !== "/") {
      navigate("/");
    }
  }, []);

  useEffect(() => {
    if (location.pathname === "/") {
      setIsSearchClicked(false);
    }
  }, [location]);
  return (
    <>
      <div className="w-full fixed md:h-[80px] h-[70px] bg-[#000000] dark:bg-opacity-75 bg-opacity-85 transition-all duration-300 text-white flex lg:justify-around justify-evenly items-center z-50 text-nowrap -space-x-2 lg:-space-x-5 lg:pl-20 xl:space-x-0 xl:pl-0">
        <span className="absolute xl:left-14 left-7 top-1/2 -translate-y-1/2 lg:block hidden">
          <DarkModeToggle />
        </span>
        <NavLink to={"/"}>
          <h1
            style={{
              textShadow: "rgb(210, 175, 118) 0px 0px 20px",
            }}
            onClick={() => {
              dispatch(setSearchInput(""));
            }}
            className={`xl:text-5xl lg:text-[40px] sm:block text-2xl sm:text-3xl font-jose mt-[5px] ${
              isSearchClicked ? "hidden" : "block"
            }`}
          >
            BingeHub
          </h1>
        </NavLink>

        {/* pc navigation */}
        <div className="navigation font-semibold py-2 pl-9 xl:pr-20 justify-center gap-3 xl:gap-4 lg:flex hidden xl:absolute">
          {sectionEndpoints.map((item, index) => (
            <NavLink
              onClick={() => dispatch(setSearchInput(""))}
              key={index}
              to={item.to}
              className={({ isActive }) =>
                `hover:transition-colors hover:duration-300 ${
                  isActive ? "text-[#8d5353]" : "hover:text-[#8d5353]"
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
          <NavLink
            to={`/genre/comedy`}
            onClick={handleClickGenre}
            className={({ isActive }) =>
              `hover:transition-colors hover:duration-300 ${
                isActive || explore === "genre" || isGenreClicked
                  ? "text-[#8d5353]"
                  : "hover:text-[#8d5353]"
              }`
            }
          >
            Genre
          </NavLink>
        </div>

        {/* mobile navigation */}
        <button onClick={handleToggleMenu} ref={buttonRef}>
          <i className="ri-menu-line lg:hidden block absolute -translate-y-1/2 text-3xl left-4"></i>
        </button>
        <motion.div
          ref={menuRef}
          className="navigation font-light py-2 pl-9 bg-[#000000] bg-opacity-75 min-h-screen w-[200px] absolute top-full left-0 text-start flex-col flex lg:hidden"
          initial={{ opacity: 0, x: "-100%" }} // Initial state (hidden off-screen to the left)
          animate={{
            opacity: isMenuOpen ? 1 : 0, // Fade in/out based on menu state
            x: isMenuOpen ? 0 : "-100%", // Slide in/out based on menu state
          }}
          exit={{ opacity: 0, x: "-100%" }} // Ensure it slides out when exiting
          transition={{
            type: "spring", // Spring transition for smooth effect
            stiffness: 250, // Control how fast or slow the spring moves
            damping: 25, // Control how bouncy the spring is
          }}
        >
          {sectionEndpoints.map((item, index) => (
            <NavLink
              onClick={() => dispatch(setSearchInput(""))}
              key={index}
              to={item.to}
              className={({ isActive }) =>
                `hover:transition-colors hover:duration-300 mb-2 ${
                  isActive ? "text-[#8d5353]" : "hover:text-[#8d5353]"
                }`
              }
            >
              <span className="flex gap-2 items-center">
                <i className={item.icon + " text-xl"}></i>
                {item.label}
              </span>
            </NavLink>
          ))}
          <NavLink
            to={"/genre/comedy"}
            onClick={handleClickGenre}
            className={({ isActive }) =>
              `hover:transition-colors hover:duration-300  ${
                isActive || isGenreClicked
                  ? "text-[#8d5353]"
                  : "hover:text-[#8d5353]"
              }`
            }
          >
            <span className="flex gap-2 items-center mb-2">
              <i className="ri-keyboard-line text-xl"></i> Genre
            </span>
          </NavLink>
          <span className="flex gap-2 items-center ">
            <DarkModeToggle />
            <button onClick={() => dispatch(toggleDarkMode())}>
              Lights {isDarkMode ? "On" : "Off"}
            </button>
          </span>
        </motion.div>

        <div className="searchBar relative">
          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex items-center gap-1"
          >
            <input
              type="text"
              onChange={(e) => dispatch(setSearchInput(e.target.value))}
              value={searchInput}
              placeholder="Search for movies or shows"
              className={`md:block md:w-[300px] w-[275px] xxs:w-[255px] placeholder:text-sm focus:ring-[#8d5353] transition-all duration-300 bg-[#000000] outline-none ring ring-[#3b3b3b] rounded-full px-4 py-2 ${
                isSearchClicked && isMobileView ? "block " : "hidden"
              }`}
            />
            <button
              type="submit"
              onClick={handleSearchClickMobile}
              className="absolute right-0 bg-[#8d5353] w-10 h-10 rounded-full"
            >
              <i className="ri-search-line cursor-pointer text-xl"></i>
            </button>
          </form>
        </div>
      </div>
      {isGenreClicked && (
        <div className="genres w-full absolute left-1/2 -translate-x-1/2 md:top-[130px] top-[130px] z-20">
          <div className="absolute left-1/2 -translate-x-1/2 -top-10  xxs:text-sm ">
            <span className="flex gap-4 justify-center w-full">
              <button
                onClick={handleMovies}
                className={` ${
                  genreType === "movie"
                    ? "underline underline-offset-2 decoration-[#8d5353] decoration-2 text-[#8d5353]"
                    : "text-black dark:text-white hover:text-[#8d5353] transition-colors duration-300"
                }`}
              >
                Movies
              </button>
              <button
                onClick={handleTvShows}
                className={` ${
                  genreType === "tv"
                    ? "underline underline-offset-2 decoration-[#8d5353] decoration-2 text-[#8d5353]"
                    : "text-black dark:text-white hover:text-[#8d5353] transition-colors duration-300"
                }`}
              >
                Tv Shows
              </button>
            </span>
          </div>
          <ul className="grid xl:w-1/2 lg:w-[60%] sm:grid-cols-5 sm:w-[85%] grid-cols-4 w-[90%] xs:grid-cols-3 xs:w-[95%] md:grid-cols-5 md:w-[70%] xxs:w-[100%] lg:grid-cols-5 gap-1 absolute left-1/2 -translate-x-1/2 whitespace-nowrap text-center xxs:text-sm xss:text-xs">
            {genres.map((genre) => (
              <li key={genre.id}>
                <NavLink
                  to={`/${genreType}/${genre.name}`}
                  className={({ isActive }) =>
                    `hover:transition-colors hover:duration-300 ml-4 font-light  ${
                      isActive ? "text-[#8d5353]" : "hover:text-[#8d5353]"
                    }`
                  }
                >
                  {genre.name.replace(/_/g, " ")}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}

export default Navbar;
