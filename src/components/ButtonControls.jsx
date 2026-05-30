/* eslint-disable */
function ButtonControls({
  setCurrentIndex,
  bannerData,
  isMobile,
  setBannerEntered,
}) {
  const handlePrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? bannerData.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === bannerData.length - 1 ? 0 : prevIndex + 1
    );
  };
  return (
    <div className="next&previous text-[#c1c1c1] text-2xl lg:text-3xl flex gap-4 justify-end w-full absolute lg:bottom-10 sm:bottom-4 bottom-0 -translate-y-4 lg:right-10 right-5 z-50">
      <button
        className="left z-50 bg-[#1a1a1a] bg-opacity-85 hover:bg-[#333333] transition-colors duration-300 lg:py-12 py-8 lg:rounded-xl rounded-lg"
        onClick={(e) => {
          e.stopPropagation();
          handlePrevious();
        }}
        {...(!isMobile && {
          onMouseEnter: () => setBannerEntered(true),
          onMouseLeave: () => setBannerEntered(false),
        })}
        {...(isMobile && {
          onTouchStart: () => setBannerEntered(true),
          onTouchEnd: () => setBannerEntered(false),
        })}
      >
        <i className="ri-arrow-left-s-line"></i>
      </button>
      <button
        className="right z-50 bg-[#1a1a1a] bg-opacity-85 hover:bg-[#333333] transition-colors duration-300 lg:py-12 py-8 lg:rounded-xl rounded-lg"
        onClick={(e) => {
          e.stopPropagation();
          handleNext();
        }}
        {...(!isMobile && {
          onMouseEnter: () => setBannerEntered(true),
          onMouseLeave: () => setBannerEntered(false),
        })}
        {...(isMobile && {
          onTouchStart: () => setBannerEntered(true),
          onTouchEnd: () => setBannerEntered(false),
        })}
      >
        <i className="ri-arrow-right-s-line"></i>
      </button>
    </div>
  );
}

export default ButtonControls;
