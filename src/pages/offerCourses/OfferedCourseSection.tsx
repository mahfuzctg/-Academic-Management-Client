import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { useGetAllOfferedCoursesQuery } from "@/redux/features/course/offerCourseApi";
import type { TQueryParam } from "@/types/global";
import { useDebounce } from "@/hooks/useDebounce";

const OfferedCourseSection = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [queryParams, setQueryParams] = useState<TQueryParam[]>([]);
  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  const { data, isLoading, isError } =
    useGetAllOfferedCoursesQuery(queryParams);

  useEffect(() => {
    if (debouncedSearchQuery) {
      setQueryParams([
        {
          name: "searchTerm",
          value: debouncedSearchQuery,
        },
      ]);
    } else {
      setQueryParams([]);
    }
  }, [debouncedSearchQuery]);

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

  if (isError) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-red-500">
          Failed to load courses. Please try again later.
        </p>
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

      {data?.data?.length === 0 ? (
        <p className="text-center text-gray-500">
          No courses available matching your search.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data?.data?.map((course) => (
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
                    {course.faculty?.fullName || "Not Assigned"}
                  </p>
                  <p>
                    <span className="font-medium">Department:</span>{" "}
                    {course.academicDepartment?.name || "Not Assigned"}
                  </p>
                  <p>
                    <span className="font-medium">Section:</span>{" "}
                    {course.section || "N/A"}
                  </p>
                  <p>
                    <span className="font-medium">Capacity:</span>{" "}
                    {course.maxCapacity || "N/A"}
                  </p>
                  <p>
                    <span className="font-medium">Time:</span>{" "}
                    {course.startTime && course.endTime
                      ? `${course.startTime} - ${course.endTime}`
                      : "N/A"}
                  </p>
                  <div className="flex flex-wrap gap-2 pt-1">
                    {course.days?.map((day) => (
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
    </motion.div>
  );
};

export default OfferedCourseSection;
