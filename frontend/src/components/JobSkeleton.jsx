//component for job skeleton for browse page
const JobSkeleton = () => {
  return (
    <div className="px-6 py-4 rounded-2xl shadow-md bg-white border border-gray-200 animate-pulse flex flex-col justify-between min-h-[260px]">
      {/* Top line */}
      <div className="h-3 w-24 bg-gray-200 rounded mb-2 self-end" />

      {/* Avatar and company */}
      <div className="flex items-center gap-3 mb-3">
        <div className="w-12 h-12 rounded-full bg-gray-200" />
        <div className="flex flex-col gap-2">
          <div className="h-4 w-32 bg-gray-200 rounded" />
          <div className="h-3 w-20 bg-gray-100 rounded" />
        </div>
      </div>

      {/* Title and description */}
      <div className="flex flex-col gap-2 mb-3">
        <div className="h-4 w-40 bg-gray-200 rounded" />
        <div className="h-3 w-full bg-gray-100 rounded" />
        <div className="h-3 w-3/4 bg-gray-100 rounded" />
      </div>

      {/* Badges */}
      <div className="flex gap-2 mt-auto">
        <div className="h-6 w-20 bg-gray-200 rounded" />
        <div className="h-6 w-16 bg-gray-200 rounded" />
        <div className="h-6 w-24 bg-gray-200 rounded" />
      </div>
    </div>
  );
};

export default JobSkeleton;
