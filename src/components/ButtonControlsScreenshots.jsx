/* eslint-disable */
function ButtonControlsScreenshots({
  setCurrentIndex,
  screenshots,
  sliderRef,
  currentIndex,
}) {
  const handlePrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? screenshots.length - 1 : prevIndex - 1
    );
    smoothScroll(-1);
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === screenshots.length - 1 ? 0 : prevIndex + 1
    );
    smoothScroll(1);
  };

  const smoothScroll = (direction) => {
    if (sliderRef.current) {
      const scrollAmount = sliderRef.current.clientWidth * direction;
      sliderRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <div className="text-[#c1c1c1] text-2xl lg:text-3xl flex gap-4 justify-end w-full absolute top-1/2 -translate-y-1/2 xl:right-[2vw] lg:right-[.8vw]">
      <button
        disabled={currentIndex === 0}
        className="left z-30 bg-[#2a2a2a] bg-opacity-85 hover:bg-[#333333] transition-colors duration-300 lg:py-12 py-8 lg:rounded-xl rounded-lg"
        onClick={(e) => {
          e.stopPropagation();
          handlePrevious();
        }}
      >
        <i className="ri-arrow-left-s-line"></i>
      </button>
      <button
        disabled={currentIndex === screenshots.length - 1}
        className="right z-30 bg-[#2a2a2a] bg-opacity-85 hover:bg-[#333333] transition-colors duration-300 lg:py-12 py-8 lg:rounded-xl rounded-lg"
        onClick={(e) => {
          e.stopPropagation();
          handleNext();
        }}
      >
        <i className="ri-arrow-right-s-line"></i>
      </button>
    </div>
  );
}

export default ButtonControlsScreenshots;
