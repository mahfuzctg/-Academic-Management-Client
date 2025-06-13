import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { useGetAllOfferedCoursesQuery } from "@/redux/features/offeredCourse/offeredCourseApi";
import type { Days } from "@/types/offeredCourse";
import { Search } from "lucide-react";
import { useState } from "react";

const OfferedCourseSection = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const { data, isLoading, isError } = useGetAllOfferedCoursesQuery();

  if (isError) {
    toast({
      title: "Error",
      description: "Failed to load offered courses",
      variant: "destructive",
    });
  }

  const filteredCourses = data?.filter((course) => {
    const courseTitle = String(course?.course?.title ?? "").toLowerCase();
    const faculty = String(course?.faculty?.fullName ?? "").toLowerCase();
    const department = String(
      course?.academicDepartment?.name ?? ""
    ).toLowerCase();
    const query = searchQuery.toLowerCase();

    return (
      courseTitle.includes(query) ||
      faculty.includes(query) ||
      department.includes(query)
    );
  });

  const handleEnroll = async (courseId: string) => {
    try {
      toast({
        title: "Success",
        description: "Successfully enrolled in the course",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to enroll in the course",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="max-w-screen-xl mx-auto px-4 py-10 space-y-8">
      <div className="text-center">
        <h2 className="text-4xl font-bold text-gray-800 mb-2">
          Available Courses
        </h2>
        <p className="text-gray-500">
          Browse and enroll in the courses offered this semester.
        </p>
        <div className="relative mt-6 max-w-md mx-auto">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
          <Input
            placeholder="Search by course, faculty or department..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 py-2.5 text-base rounded-xl shadow-sm"
          />
        </div>
      </div>

      {filteredCourses?.length === 0 ? (
        <p className="text-center text-gray-500">
          No courses available matching your search.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCourses.map((course) => (
            <Card
              key={course._id}
              className="transition-shadow border rounded-xl hover:shadow-md"
            >
              {course.image && (
                <div className="relative h-48 overflow-hidden rounded-t-xl">
                  <img
                    src={course.image}
                    alt={course.course?.title || "Course Image"}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 right-2">
                    <Badge variant="secondary">
                      {course.academicSemester?.name}
                    </Badge>
                  </div>
                </div>
              )}
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-semibold">
                  {course.course?.title}
                </CardTitle>
                <p className="text-sm text-gray-500">{course.course?.code}</p>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-gray-700">
                <div className="space-y-1">
                  <p>
                    <span className="font-medium">Faculty:</span>{" "}
                    {course.faculty?.fullName}
                  </p>
                  <p>
                    <span className="font-medium">Department:</span>{" "}
                    {course.academicDepartment?.name}
                  </p>
                  <p>
                    <span className="font-medium">Section:</span>{" "}
                    {course.section}
                  </p>
                  <p>
                    <span className="font-medium">Capacity:</span>{" "}
                    {course.maxCapacity}
                  </p>
                  <p>
                    <span className="font-medium">Time:</span>{" "}
                    {course.startTime} - {course.endTime}
                  </p>
                  <div className="flex flex-wrap gap-2 pt-1">
                    {course.days.map((day: Days) => (
                      <Badge key={day} variant="outline">
                        {day}
                      </Badge>
                    ))}
                  </div>
                </div>
                <Button
                  className="w-full mt-2"
                  onClick={() => handleEnroll(course._id)}
                >
                  Enroll Now
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default OfferedCourseSection;
