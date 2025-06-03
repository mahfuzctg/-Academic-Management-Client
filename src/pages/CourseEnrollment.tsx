import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { useGetAllCoursesQuery } from "@/redux/features/course/courseApi";
import type { ICourse } from "@/types/course";

import { useState } from "react";

export default function CourseEnrollment() {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [enrolledIds, setEnrolledIds] = useState<string[]>([]);

  const { data: courses = [], isLoading, isError } = useGetAllCoursesQuery();

  const filteredCourses = courses.filter(
    (course: ICourse) =>
      (course?.name?.toLowerCase() ?? "").includes(searchQuery.toLowerCase()) ||
      (course?.code?.toLowerCase() ?? "").includes(searchQuery.toLowerCase()) ||
      (course?.department?.toLowerCase() ?? "").includes(
        searchQuery.toLowerCase()
      )
  );

  const handleEnrollment = (course: ICourse) => {
    const isAlreadyEnrolled = enrolledIds.includes(course.id);
    const updatedEnrolledIds = isAlreadyEnrolled
      ? enrolledIds.filter((id) => id !== course.id)
      : [...enrolledIds, course.id];

    setEnrolledIds(updatedEnrolledIds);

    toast({
      title: isAlreadyEnrolled ? "Course Dropped" : "Course Enrolled",
      description: `You have ${isAlreadyEnrolled ? "dropped" : "enrolled in"} ${
        course.name
      }`,
    });
  };

  if (isLoading) {
    return <div className="text-center mt-10">Loading courses...</div>;
  }

  if (isError) {
    return (
      <div className="text-center mt-10 text-red-500">
        Failed to load courses.
      </div>
    );
  }

  return (
    <div className="space-y-6 w-9/12 my-20 mx-auto">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Course Enrollment</h1>
      </div>

      <div className="flex items-center space-x-2">
        <Input
          placeholder="Search courses..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="max-w-sm"
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredCourses.map((course: ICourse) => {
          const isEnrolled = enrolledIds.includes(course.id);
          return (
            <Card key={course.id}>
              <CardHeader>
                <CardTitle>{course.name}</CardTitle>
                <CardDescription>
                  {course.code} • {course.department}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p className="text-sm">
                    <span className="font-medium">Title:</span>
                    {course?.title}
                  </p>
                  <p className="text-sm">
                    <span className="font-medium">Prefix:</span> {course.prefix}
                  </p>

                  <p className="text-sm">
                    <span className="font-medium">Credits:</span>{" "}
                    {course.credits}
                  </p>
                  {course.prerequisites?.length > 0 && (
                    <p className="text-sm">
                      <span className="font-medium">Prerequisites:</span>{" "}
                      {course.prerequisites.join(", ")}
                    </p>
                  )}
                  <Button
                    variant={isEnrolled ? "destructive" : "default"}
                    className="w-full"
                    onClick={() => handleEnrollment(course)}
                  >
                    {isEnrolled ? "Drop Course" : "Enroll"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
