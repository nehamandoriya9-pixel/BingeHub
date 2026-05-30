function SkeletonDetails() {
  return (
    <div className="flex flex-col w-full min-h-screen bg-gradient-to-r from-[#000000] to-[#000000] animate-pulse rounded-lg">
      <div className="backdrop min-h-[55vh] bg-[conic-gradient(var(--tw-gradient-stops))] from-[#363636] via-[#000000] to-[#000000]"></div>
      <div className="poster relative flex justify-center">
        <div className="poster-image xl:w-[350px] lg:w-[300px] md:w-[250px] sm:w-[220px] w-[170px] h-[300px] object-cover sm:h-[370px] md:h-[400px] xl:h-[550px] lg:h-[500px] mx-auto rounded-lg xxs:w-[150px] xxs:h-[260px] bg-[#000000] border border-[#313131] absolute lg:-top-[200px] -top-[50px] lg:left-40 md:left-24 sm:left-10 left-6">
          <h1 className="bg-[#5c5c5c] md:h-8 h-6 w-2/3 rounded-2xl absolute md:bottom-[110px] bottom-[80px] left-1/2 -translate-x-1/2"></h1>
          <h1 className="bg-[#3b3b3b] md:h-8 h-6 w-1/3 rounded-2xl absolute md:bottom-[70px] bottom-[50px]  left-1/2 -translate-x-1/2"></h1>
        </div>
        <div className="p-4 space-y-2 absolut w-full flex flex-col items-end lg:-mt-[200px] -mt-[50px] pr-4 pl-[100px] lg:pl-[110px] xl:pl-5">
          <div className=" h-12 lg:h-14 w-[60%] rounded-2xl">
            <div className="bg-[#606060] h-12 lg:h-14 lg:w-[70%] w-[90%] sm:w-[80%] rounded-2xl"></div>
          </div>
          <div className="h-8 w-[60%] rounded-2xl">
            <div className="bg-[#454545] h-8 w-[50%] rounded-2xl"></div>
          </div>
          <div className=" h-7 w-[60%] rounded-2xl">
            <div className="bg-[#4b4b4b] h-7 w-[30%] rounded-2xl"></div>
          </div>
          <div className=" h-5 w-[60%] rounded-2xl">
            <div className="bg-[#464646]  h-5 w-[40%] rounded-2xl"></div>
          </div>
          <div className=" h-5 w-[60%] flex lg:pt-[200px] sm:pt-[100px] pt-[50px] xxs:pt-[20px] sm:gap-24 gap-4">
            <div className="bg-[#8a8a8a]  lg:h-14 sm:h-12 h-10 sm:w-[30%] w-[60%]  rounded-full "></div>
            <div className="bg-[#8a8a8a]  lg:h-14 sm:h-12 h-10 sm:w-[30%] w-[60%] rounded-full "></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SkeletonDetails;
