import { useDispatch, useSelector } from "react-redux";
import { toggleDarkMode } from "../redux/darkModeSlice";

const DarkModeToggle = () => {
  const dispatch = useDispatch();
  const isDarkMode = useSelector((state) => state.darkMode.isDarkMode);

  return (
    <button
      onClick={() => dispatch(toggleDarkMode())}
      className="rounded-full lg:bg-[#212121] transition-colors duration-300 lg:w-10 lg:h-10 flex items-center justify-center"
    >
      <span className="relative">
        <i
          className={`ri-lightbulb-line ${
            isDarkMode ? "hidden" : "block"
          } hover:-rotate-[15deg] text-xl transition-transform duration-300`}
        ></i>
        <i
          style={{
            textShadow: "rgb(210, 175, 118) 0px 0px 20px",
          }}
          className={`ri-lightbulb-fill ${
            isDarkMode ? "block" : "hidden"
          } text-white hover:-rotate-[15deg] text-xl transition-transform duration-300`}
        ></i>
      </span>
    </button>
  );
};

export default DarkModeToggle;
