import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

function ScrollToTop() {
  const location = useLocation();
  const loading = useSelector((state) => state.BingeHub.loading);

  useEffect(() => {
    // Scroll to top when the pathname changes or loading starts
    if (location.pathname || loading) {
      window.scrollTo(0, 0);
    }
  }, [location.pathname, loading]);

  return null;
}

export default ScrollToTop;
