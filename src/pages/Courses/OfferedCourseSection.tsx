import { useGetAllOfferedCoursesQuery } from "@/redux/features/offeredCourse/offeredCourseApi";

const OfferedCourseSection = () => {
  const { data, isLoading, isError } = useGetAllOfferedCoursesQuery();

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Something went wrong!</p>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Offered Courses</h2>
      {data?.data?.length === 0 ? (
        <p>No offered courses available.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {data?.data?.map((offeredCourse) => (
            <div
              key={offeredCourse._id}
              className="border rounded-lg shadow p-4 space-y-2"
            >
              <p>
                <strong>Course:</strong> {offeredCourse.course?.title} (
                {offeredCourse.course?.code})
              </p>
              <p>
                <strong>Faculty:</strong> {offeredCourse.faculty?.fullName}
              </p>
              <p>
                <strong>Department:</strong>{" "}
                {offeredCourse.academicDepartment?.name}
              </p>
              <p>
                <strong>Faculty:</strong> {offeredCourse.academicFaculty?.name}
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
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OfferedCourseSection;
