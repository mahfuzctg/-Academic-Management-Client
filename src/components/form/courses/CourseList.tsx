import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useToast } from "@/components/ui/use-toast";
import {
  clearFilters,
  dropCourse,
  enrollInCourse,
  fetchCourseOfferings,
  fetchEnrollments,
  setFilters,
} from "@/redux/features/enrollmentSlice";
import type { RootState } from "@/redux/store";
import type { CourseOffering } from "@/types/course";
import type { TEnrollment } from "@/types/enrollment.type";
import { motion } from "framer-motion";
import { Info } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

interface CourseListProps {
  studentId: string;
}

const CourseList = ({ studentId }: CourseListProps) => {
  const dispatch = useDispatch();
  const { toast } = useToast();
  const { courseOfferings, enrollments, loading, error, filters } = useSelector(
    (state: RootState) => state.enrollment
  );
  const [enrollDialogOpen, setEnrollDialogOpen] = useState(false);
  const [dropDialogOpen, setDropDialogOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<CourseOffering | null>(
    null
  );
  const [selectedEnrollment, setSelectedEnrollment] =
    useState<TEnrollment | null>(null);

  useEffect(() => {
    dispatch(fetchCourseOfferings(filters));
    dispatch(fetchEnrollments(studentId));
  }, [dispatch, filters, studentId]);

  const handleSearch = (value: string) => {
    dispatch(setFilters({ search: value }));
  };

  const handleSemesterChange = (value: string) => {
    dispatch(setFilters({ semester: parseInt(value) }));
  };

  const handleDepartmentChange = (value: string) => {
    dispatch(setFilters({ department: value }));
  };

  const handleStatusChange = (value: string) => {
    dispatch(setFilters({ status: value as CourseOffering["status"] }));
  };

  const handleClearFilters = () => {
    dispatch(clearFilters());
  };

  const handleEnroll = (course: CourseOffering) => {
    setSelectedCourse(course);
    setEnrollDialogOpen(true);
  };

  const handleDrop = (enrollment: TEnrollment) => {
    setSelectedEnrollment(enrollment);
    setDropDialogOpen(true);
  };

  const confirmEnroll = async () => {
    if (selectedCourse) {
      try {
        dispatch(
          enrollInCourse({
            courseOfferingId: selectedCourse.id,
            studentId,
          })
        );
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
      setEnrollDialogOpen(false);
      setSelectedCourse(null);
    }
  };

  const confirmDrop = async () => {
    if (selectedEnrollment) {
      try {
        dispatch(dropCourse(selectedEnrollment.id));
        toast({
          title: "Success",
          description: "Successfully dropped the course",
        });
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to drop the course",
          variant: "destructive",
        });
      }
      setDropDialogOpen(false);
      setSelectedEnrollment(null);
    }
  };

  const isEnrolled = (courseId: string) => {
    return enrollments.some(
      (e: { courseOfferingId: string; status: string }) =>
        e.courseOfferingId === courseId && e.status === "registered"
    );
  };

  const getEnrollment = (courseId: string) => {
    return enrollments.find(
      (e: { courseOfferingId: string; status: string }) =>
        e.courseOfferingId === courseId && e.status === "registered"
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64 text-red-500">
        Error: {error}
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Course Registration</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4 mb-6">
            <div className="flex flex-wrap gap-4">
              <Input
                placeholder="Search courses..."
                value={filters.search || ""}
                onChange={(e) => handleSearch(e.target.value)}
                className="max-w-sm"
              />
              <Select
                value={filters.semester?.toString()}
                onValueChange={handleSemesterChange}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Semester" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Semester 1</SelectItem>
                  <SelectItem value="2">Semester 2</SelectItem>
                  <SelectItem value="3">Semester 3</SelectItem>
                  <SelectItem value="4">Semester 4</SelectItem>
                </SelectContent>
              </Select>
              <Select
                value={filters.department}
                onValueChange={handleDepartmentChange}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="computer-science">
                    Computer Science
                  </SelectItem>
                  <SelectItem value="engineering">Engineering</SelectItem>
                  <SelectItem value="business">Business</SelectItem>
                  <SelectItem value="arts">Arts</SelectItem>
                </SelectContent>
              </Select>
              <Select value={filters.status} onValueChange={handleStatusChange}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="open">Open</SelectItem>
                  <SelectItem value="closed">Closed</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" onClick={handleClearFilters}>
                Clear Filters
              </Button>
            </div>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Course</TableHead>
                  <TableHead>Instructor</TableHead>
                  <TableHead>Schedule</TableHead>
                  <TableHead>Capacity</TableHead>
                  <TableHead>Prerequisites</TableHead>
                  <TableHead>Deadline</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="w-[100px]">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {courseOfferings.map((course: CourseOffering) => {
                  const enrolled = isEnrolled(course.id);
                  const enrollment = getEnrollment(course.id);
                  return (
                    <TableRow key={course.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">
                            {course.subject.name}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {course.subject.code}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        {`${course.instructor.firstName} ${course.instructor.lastName}`}
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <div>{course.schedule.day}</div>
                          <div>{course.schedule.time}</div>
                          <div>{course.schedule.room}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        {course.enrolledStudents}/{course.capacity}
                      </TableCell>
                      <TableCell>
                        {course.subject.prerequisites.length > 0 ? (
                          <div className="flex items-center gap-1">
                            <Info className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm">
                              {course.subject.prerequisites.join(", ")}
                            </span>
                          </div>
                        ) : (
                          "None"
                        )}
                      </TableCell>
                      <TableCell>{course.registrationDeadline}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            course.status === "open"
                              ? "default"
                              : course.status === "closed"
                              ? "secondary"
                              : "destructive"
                          }
                        >
                          {course.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {enrolled ? (
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => handleDrop(enrollment!)}
                          >
                            Drop
                          </Button>
                        ) : (
                          <Button
                            variant="default"
                            size="sm"
                            onClick={() => handleEnroll(course)}
                            disabled={
                              course.status !== "open" ||
                              course.enrolledStudents >= course.capacity
                            }
                          >
                            Enroll
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <AlertDialog open={enrollDialogOpen} onOpenChange={setEnrollDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Enrollment</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to enroll in {selectedCourse?.subject.name}?
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmEnroll}>
              Enroll
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog open={dropDialogOpen} onOpenChange={setDropDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Drop</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to drop{" "}
              {selectedEnrollment?.courseOffering.subject.name}? This action
              cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDrop}
              className="bg-red-600 hover:bg-red-700"
            >
              Drop
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </motion.div>
  );
};

export default CourseList;
