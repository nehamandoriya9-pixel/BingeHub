import Home from "./components/Home";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Navbar from "./components/Navbar";
import Explore from "./pages/Explore";
import Details from "./pages/Details";
import SearchMovieShow from "./pages/SearchMovieShow";
import Footer from "./components/Footer";

import {
  setBannerData,
  setBollywoodData,
  setConfigImageData,
  setHollywoodData,
  setNowTvPlayingData,
  setTopRatedData,
  setTvSeriesData,
} from "./redux/tvSlice";
import useFetchTMDB from "./hooks/useFetchTMDB";
import ScrollToTop from "./components/ScrollToTop";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <div>
        <Navbar />
        <Home />
        <Footer />
      </div>
    ),
  },
  {
    path: "/:explore/:id/similar",
    element: (
      <div>
        <Navbar />
        <Explore />
      </div>
    ),
  },
  {
    path: "/:explore/:id/recommendations",
    element: (
      <div>
        <Navbar />
        <Explore />
      </div>
    ),
  },
  {
    path: "/:explore/:type",
    element: (
      <div>
        <Navbar />
        <Explore />
      </div>
    ),
  },
  {
    path: "/:explore/details/:id",
    element: (
      <div>
        <Navbar />
        <Details />
      </div>
    ),
  },
  {
    path: "/search",
    element: (
      <div>
        <Navbar />
        <SearchMovieShow />
      </div>
    ),
  },
  // {
  //   path: "/explore/genre/:genreName", 
  //   element: (
  //     <div>
  //       <Navbar />
  //       <Details />
  //     </div>
  //   )
  // }
]);

function App() {
  const isDarkMode = useSelector((state) => state.darkMode.isDarkMode);
  useEffect(() => {
    const html = document.documentElement;
    if (isDarkMode) {
      html.classList.add("dark");
    } else {
      html.classList.remove("dark");
    }
  }, [isDarkMode]);

  // Fetch configuration data
  useFetchTMDB(
    "/configuration",
    (data) => data.images.secure_base_url,
    setConfigImageData
  );
  // Fetch trending data
  useFetchTMDB(
    "/trending/all/day?language=en-US&page=1",
    (data) => data?.results,
    setBannerData
  );

  // Fetch now playing data
  useFetchTMDB(
    "/tv/airing_today",
    (data) => data?.results,
    setNowTvPlayingData
  );

  // Fetch top rated data
  useFetchTMDB("/tv/top_rated", (data) => data?.results, setTopRatedData);

  // Fetch tv series data
  useFetchTMDB("/tv/popular", (data) => data?.results, setTvSeriesData);

  // Fetch bollywood data
  useFetchTMDB(
    "/discover/movie?with_original_language=hi&sort_by=popularity.desc",
    (data) => data?.results,
    setBollywoodData
  );
 
  // Fetch hollywood data
  useFetchTMDB(
    "/discover/movie?with_original_language=en&sort_by=vote_average.desc",
    (data) => data?.results,
    setHollywoodData
  );

  return (
    <div className="font-poppins dark:bg-[#000000] bg-white dark:text-white text-black transition-all duration-300">
      <RouterProvider router={router}>
        <ScrollToTop />
      </RouterProvider>
    </div>
  );
}

export default App;
