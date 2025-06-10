const StudentProfileSkeleton = () => {
  return (
    <div className="flex justify-center items-start min-h-screen bg-gray-50 p-6">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-4xl p-6 space-y-6 animate-pulse">
        {/* Header Skeleton */}
        <div className="flex items-center gap-6">
          <div className="w-28 h-28 bg-gray-300 rounded-full" />
          <div className="flex-1 space-y-2">
            <div className="h-5 bg-gray-300 rounded w-2/3" />
            <div className="h-4 bg-gray-200 rounded w-1/3" />
            <div className="h-4 bg-gray-200 rounded w-1/2" />
          </div>
        </div>

        {/* Personal Info Skeleton */}
        <div>
          <div className="h-5 bg-gray-300 rounded w-1/3 mb-4" />
          <div className="grid grid-cols-2 gap-4 text-sm text-gray-700">
            {[...Array(10)].map((_, idx) => (
              <div key={idx} className="h-4 bg-gray-200 rounded w-full" />
            ))}
          </div>
        </div>

        {/* Guardian Info Skeleton */}
        <div>
          <div className="h-5 bg-gray-300 rounded w-1/3 mb-4" />
          <div className="grid grid-cols-2 gap-4 text-sm text-gray-700">
            {[...Array(6)].map((_, idx) => (
              <div key={idx} className="h-4 bg-gray-200 rounded w-full" />
            ))}
          </div>
        </div>

        {/* Local Guardian Info Skeleton */}
        <div>
          <div className="h-5 bg-gray-300 rounded w-1/3 mb-4" />
          <div className="grid grid-cols-2 gap-4 text-sm text-gray-700">
            {[...Array(4)].map((_, idx) => (
              <div key={idx} className="h-4 bg-gray-200 rounded w-full" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentProfileSkeleton;
