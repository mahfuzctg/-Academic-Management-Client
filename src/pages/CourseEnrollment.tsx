import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";

interface Course {
  id: string;
  code: string;
  name: string;
  instructor: string;
  department: string;
  credits: number;
  prerequisites: string[];
  enrolled: boolean;
}

export default function CourseEnrollment() {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [courses, setCourses] = useState<Course[]>([
    {
      id: "1",
      code: "CS101",
      name: "Introduction to Programming",
      instructor: "Dr. Jane Smith",
      department: "Computer Science",
      credits: 3,
      prerequisites: [],
      enrolled: false,
    },
    {
      id: "2",
      code: "CS201",
      name: "Data Structures",
      instructor: "Dr. John Doe",
      department: "Computer Science",
      credits: 4,
      prerequisites: ["CS101"],
      enrolled: false,
    },
    // Add more sample data as needed
  ]);

  const filteredCourses = courses.filter(
    (course) =>
      course.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.department.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleEnrollment = (courseId: string) => {
    setCourses((prevCourses) =>
      prevCourses.map((course) =>
        course.id === courseId
          ? { ...course, enrolled: !course.enrolled }
          : course
      )
    );

    const course = courses.find((c) => c.id === courseId);
    if (course) {
      toast({
        title: course.enrolled ? "Course Dropped" : "Course Enrolled",
        description: `You have ${course.enrolled ? "dropped" : "enrolled in"} ${
          course.name
        }`,
      });
    }
  };

  return (
    <div className="space-y-6">
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
        {filteredCourses.map((course) => (
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
                  <span className="font-medium">Instructor:</span>{" "}
                  {course.instructor}
                </p>
                <p className="text-sm">
                  <span className="font-medium">Credits:</span> {course.credits}
                </p>
                {course.prerequisites.length > 0 && (
                  <p className="text-sm">
                    <span className="font-medium">Prerequisites:</span>{" "}
                    {course.prerequisites.join(", ")}
                  </p>
                )}
                <Button
                  variant={course.enrolled ? "destructive" : "default"}
                  className="w-full"
                  onClick={() => handleEnrollment(course.id)}
                >
                  {course.enrolled ? "Drop Course" : "Enroll"}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
