function SkeletonCard() {
  return (
    <div className="lg:min-w-[245px] md:min-w-[180px] min-w-[150px] max-w-[230px] md:h-[350px] h-[230px] bg-[#222222] animate-pulse rounded-lg relative">
      <div className="texts p-4 space-y-2 flex flex-col items-center h-full justify-end">
        <div className="bg-[#b0b0b0] h-3 w-3/4 rounded-lg"></div>
        <div className="bg-[#b0b0b0] h-2 w-1/2 rounded-lg"></div>
        <div className="bg-[#7a7a7a] h-2 w-1/4 rounded-lg"></div>
      </div>
    </div>
  );
}

export default SkeletonCard;
