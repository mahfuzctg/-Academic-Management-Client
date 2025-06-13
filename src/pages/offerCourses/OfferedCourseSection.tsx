import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { useGetAllOfferedCoursesQuery } from "@/redux/features/offeredCourse/offeredCourseApi";
import type { Days } from "@/types/offeredCourse";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { Search } from "lucide-react";

const OfferedCourseSection = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const { data, isLoading, isError } = useGetAllOfferedCoursesQuery();

  const filteredCourses = data?.data?.filter((course) => {
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
      // TODO: Implement enrollment mutation
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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <div className="flex flex-col gap-4">
        <h2 className="text-3xl font-bold text-center text-gray-800">
          Available Courses
        </h2>
        <div className="relative max-w-sm mx-auto w-full">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search courses..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {filteredCourses?.length === 0 ? (
        <p className="text-center text-gray-500">
          No courses available matching your search.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses?.map((course) => (
            <Card
              key={course._id}
              className="hover:shadow-lg transition-shadow duration-200"
            >
              {course.image && (
                <div className="relative h-48">
                  <img
                    src={course.image}
                    alt={course.course?.title || "Course Image"}
                    className="w-full h-full object-cover rounded-t-lg"
                  />
                  <div className="absolute top-2 right-2">
                    <Badge variant="secondary">
                      {course.academicSemester?.name}
                    </Badge>
                  </div>
                </div>
              )}
              <CardHeader>
                <CardTitle className="text-xl">
                  {course.course?.title}
                </CardTitle>
                <p className="text-sm text-gray-500">{course.course?.code}</p>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2 text-sm">
                  <p className="flex items-center gap-2">
                    <span className="font-medium">Faculty:</span>
                    {course.faculty?.fullName}
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="font-medium">Department:</span>
                    {course.academicDepartment?.name}
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="font-medium">Section:</span>
                    {course.section}
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="font-medium">Capacity:</span>
                    {course.maxCapacity}
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {course.days.map((day: Days) => (
                      <Badge key={day} variant="outline">
                        {day}
                      </Badge>
                    ))}
                  </div>
                  <p className="flex items-center gap-2">
                    <span className="font-medium">Time:</span>
                    {course.startTime} - {course.endTime}
                  </p>
                </div>
                <Button
                  className="w-full"
                  onClick={() => handleEnroll(course._id)}
                >
                  Enroll Now
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default OfferedCourseSection;
