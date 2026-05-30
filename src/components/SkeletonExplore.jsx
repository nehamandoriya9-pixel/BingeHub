function SkeletonExplore() {
  return (
    <div className="w-full aspect-[2/3] bg-[#414141] animate-pulse rounded-lg relative flex flex-col">
      {/* Placeholder for image */}
      <div className="flex-1 bg-[#212121] rounded-t-lg"></div>
      {/* Placeholder for text */}
      <div className="p-4 space-y-2 flex flex-col items-center">
        <div className="bg-[#252525] h-4 w-3/4 rounded-lg"></div>
        <div className="bg-[#252525] h-3 w-1/2 rounded-lg"></div>
        <div className="bg-[#252525] h-3 w-1/4 rounded-lg"></div>
      </div>
    </div>
  );
}

export default SkeletonExplore