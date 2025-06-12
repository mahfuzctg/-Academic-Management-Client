import { Button } from "@/components/ui/button";
import { useGetAllOfferedCoursesQuery } from "@/redux/features/offeredCourse/offeredCourseApi";

const OfferedCourseSection = () => {
  const { data, isLoading, isError } = useGetAllOfferedCoursesQuery();

  if (isLoading) return <p className="text-center text-lg">Loading...</p>;
  if (isError)
    return <p className="text-center text-red-500">Something went wrong!</p>;

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">
        Offered Courses
      </h2>

      {data?.data?.length === 0 ? (
        <p className="text-center text-gray-500">
          No offered courses available.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data?.data?.map((offeredCourse) => (
            <div
              key={offeredCourse._id}
              className="bg-white rounded-md border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
            >
              {offeredCourse.image && (
                <img
                  src={offeredCourse.image}
                  alt={offeredCourse.course?.title || "Course Image"}
                  className="w-full h-44 object-cover"
                />
              )}

              <div className="p-5 space-y-2 text-sm text-gray-700">
                <h3 className="text-lg font-semibold text-gray-900">
                  {offeredCourse.course?.title} ({offeredCourse.course?.code})
                </h3>
                <p>
                  <strong>Faculty:</strong> {offeredCourse.faculty?.fullName}
                </p>
                <p>
                  <strong>Department:</strong>{" "}
                  {offeredCourse.academicDepartment?.name}
                </p>
                <p>
                  <strong>Faculty:</strong>{" "}
                  {offeredCourse.academicFaculty?.name}
                </p>
                <p>
                  <strong>Semester:</strong>{" "}
                  {offeredCourse.academicSemester?.name}
                </p>
                <p>
                  <strong>Section:</strong> {offeredCourse.section}
                </p>
                <p>
                  <strong>Capacity:</strong> {offeredCourse.maxCapacity}
                </p>
                <p>
                  <strong>Days:</strong> {offeredCourse.days.join(", ")}
                </p>
                <p>
                  <strong>Time:</strong> {offeredCourse.startTime} -{" "}
                  {offeredCourse.endTime}
                </p>

                <div className="pt-4">
                  <Button className="w-full">Enroll Now</Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OfferedCourseSection;
