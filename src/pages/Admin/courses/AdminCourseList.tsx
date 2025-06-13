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
  useGetAllCoursesQuery,
  useDeleteCourseMutation,
  useUpdateCourseMutation,
  useAssignFacultiesMutation,
  useGetFacultiesWithCourseQuery,
  useRemoveFacultiesMutation,
} from "@/redux/features/course/courseApi";
import { useGetAllFacultiesQuery } from "@/redux/features/faculty/facultyApi";

import type { ICourse } from "@/types/course";
import { motion } from "framer-motion";
import { Info, Plus, X } from "lucide-react";
import { useState } from "react";

import CourseForm from "@/components/form/courses/CourseForm";

const AdminCourseList = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCourse, setSelectedCourse] = useState<ICourse | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [facultyDialogOpen, setFacultyDialogOpen] = useState(false);
  const [courseFormDialogOpen, setCourseFormDialogOpen] = useState(false);
  const [selectedFaculty, setSelectedFaculty] = useState<string>("");

  const { data: courses, isLoading, isError } = useGetAllCoursesQuery();
  const { data: faculties } = useGetAllFacultiesQuery(undefined);
  const [deleteCourse] = useDeleteCourseMutation();
  const [updateCourse] = useUpdateCourseMutation();
  const [assignFaculties] = useAssignFacultiesMutation();
  const [removeFaculties] = useRemoveFacultiesMutation();
  const { data: courseFaculties } = useGetFacultiesWithCourseQuery(
    selectedCourse?.id || ""
  );

  const filteredCourses = courses?.filter((course: ICourse) => {
    const title = String(course?.title ?? "").toLowerCase();
    const prefix = String(course?.prefix ?? "").toLowerCase();
    const code = String(course?.code ?? "").toLowerCase();
    const query = searchQuery.toLowerCase();

    return (
      title.includes(query) || prefix.includes(query) || code.includes(query)
    );
  });

  const handleDelete = async () => {
    if (selectedCourse) {
      try {
        await deleteCourse(selectedCourse.id).unwrap();
        toast({
          title: "Success",
          description: "Course deleted successfully",
        });
        setDeleteDialogOpen(false);
        setSelectedCourse(null);
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to delete course",
          variant: "destructive",
        });
      }
    }
  };

  const handleAssignFaculty = async () => {
    if (selectedCourse && selectedFaculty) {
      try {
        await assignFaculties({
          courseId: selectedCourse.id,
          faculties: [selectedFaculty],
        }).unwrap();
        toast({
          title: "Success",
          description: "Faculty assigned successfully",
        });
        setSelectedFaculty("");
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to assign faculty",
          variant: "destructive",
        });
      }
    }
  };

  const handleRemoveFaculty = async (facultyId: string) => {
    if (selectedCourse) {
      try {
        await removeFaculties({
          courseId: selectedCourse.id,
          faculties: [facultyId],
        }).unwrap();
        toast({
          title: "Success",
          description: "Faculty removed successfully",
        });
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to remove faculty",
          variant: "destructive",
        });
      }
    }
  };

  const handleStatusChange = async (courseId: string, isActive: boolean) => {
    try {
      await updateCourse({
        id: courseId,
        data: { isActive },
      }).unwrap();
      toast({
        title: "Success",
        description: `Course ${
          isActive ? "activated" : "deactivated"
        } successfully`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update course status",
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
      <div className="flex items-center justify-center h-64 text-red-500">
        Error loading courses
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
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Course Management</CardTitle>
          <Button onClick={() => setCourseFormDialogOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Add Course
          </Button>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4 mb-6">
            <div className="flex flex-wrap gap-4">
              <Input
                placeholder="Search courses..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="max-w-sm"
              />
              <Select>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Code</TableHead>
                  <TableHead>Prefix</TableHead>
                  <TableHead>Credits</TableHead>
                  <TableHead>Prerequisites</TableHead>
                  <TableHead>Faculties</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="w-[200px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCourses?.map((course: ICourse) => (
                  <TableRow key={course.id}>
                    <TableCell>{course.title}</TableCell>
                    <TableCell>{course.code}</TableCell>
                    <TableCell>{course.prefix}</TableCell>
                    <TableCell>{course.credits}</TableCell>
                    <TableCell>
                      {course?.preRequisiteCourses?.length > 0 ? (
                        <div className="flex items-center gap-1">
                          <Info className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">
                            {course.preRequisiteCourses
                              .map((prereq) => prereq.course)
                              .join(", ")}
                          </span>
                        </div>
                      ) : (
                        "None"
                      )}
                    </TableCell>
                    <TableCell>
                      {courseFaculties?.faculties?.length || 0} assigned
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={course.isActive ? "default" : "secondary"}
                        className="cursor-pointer"
                        onClick={() =>
                          handleStatusChange(course.id, !course.isActive)
                        }
                      >
                        {course.isActive ? "Active" : "Inactive"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setSelectedCourse(course);
                            setFacultyDialogOpen(true);
                          }}
                        >
                          Manage Faculty
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => {
                            setSelectedCourse(course);
                            setDeleteDialogOpen(true);
                          }}
                        >
                          Delete
                        </Button>
                        <Button
                          variant="default"
                          size="sm"
                          onClick={() => {
                            setSelectedCourse(course);
                            setCourseFormDialogOpen(true);
                          }}
                        >
                          Edit
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Deletion</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete {selectedCourse?.title}? This
              action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Faculty Management Dialog */}
      <AlertDialog open={facultyDialogOpen} onOpenChange={setFacultyDialogOpen}>
        <AlertDialogContent className="max-w-2xl">
          <AlertDialogHeader>
            <AlertDialogTitle>Manage Faculty</AlertDialogTitle>
            <AlertDialogDescription>
              Assign or remove faculty members for {selectedCourse?.title}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="py-4 space-y-4">
            <div className="flex gap-4">
              <Select
                value={selectedFaculty}
                onValueChange={setSelectedFaculty}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select faculty to assign" />
                </SelectTrigger>
                <SelectContent>
                  {faculties?.data?.map((faculty) => (
                    <SelectItem key={faculty.id} value={faculty.id}>
                      {faculty?.firstName} {faculty?.lastName}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button onClick={handleAssignFaculty} disabled={!selectedFaculty}>
                Assign
              </Button>
            </div>

            <div className="space-y-2">
              <h4 className="font-medium">Assigned Faculties</h4>
              <div className="space-y-2">
                {courseFaculties?.faculties?.map((faculty) => (
                  <div
                    key={faculty.id}
                    className="flex items-center justify-between p-2 border rounded"
                  >
                    <span>
                      {faculty.firstName} {faculty.lastName}
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleRemoveFaculty(faculty.id)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                {!courseFaculties?.faculties?.length && (
                  <p className="text-sm text-muted-foreground">
                    No faculties assigned
                  </p>
                )}
              </div>
            </div>
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel>Close</AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Course Form Dialog */}
      <AlertDialog
        open={courseFormDialogOpen}
        onOpenChange={setCourseFormDialogOpen}
      >
        <AlertDialogContent className="max-w-4xl">
          <AlertDialogHeader className="flex flex-row items-center justify-between">
            <AlertDialogTitle>
              {selectedCourse ? "Edit Course" : "Add New Course"}
            </AlertDialogTitle>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => {
                setCourseFormDialogOpen(false);
                setSelectedCourse(null);
              }}
            >
              <X className="h-4 w-4" />
            </Button>
          </AlertDialogHeader>
          <div className="py-4">
            <CourseForm
              course={selectedCourse || undefined}
              onSuccess={() => {
                setCourseFormDialogOpen(false);
                setSelectedCourse(null);
              }}
            />
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </motion.div>
  );
};

export default AdminCourseList;
