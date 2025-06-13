import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import {
  useGetAllOfferedCoursesQuery,
  // useDeleteOfferedCourseMutation,
} from "@/redux/features/offeredCourse/offeredCourseApi";
import type { Days } from "@/types/offeredCourse";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { Plus, Search, X } from "lucide-react";
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
import OfferedCourseForm from "@/components/form/offerCourses/OfferedCourseForm";
import { useDeleteOfferedCourseMutation } from "@/redux/features/course/offerCourseApi";

const AdminOfferedCourseSection = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCourse, setSelectedCourse] = useState<any>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [formDialogOpen, setFormDialogOpen] = useState(false);

  const { data, isLoading, isError } = useGetAllOfferedCoursesQuery();
  const [deleteOfferedCourse] = useDeleteOfferedCourseMutation();

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

  const handleDelete = async () => {
    if (selectedCourse) {
      try {
        await deleteOfferedCourse(selectedCourse._id).unwrap();
        toast({
          title: "Success",
          description: "Offered course deleted successfully",
        });
        setDeleteDialogOpen(false);
        setSelectedCourse(null);
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to delete offered course",
          variant: "destructive",
        });
      }
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
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Offered Course Management</CardTitle>
          <Button onClick={() => setFormDialogOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Add Offered Course
          </Button>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4 mb-6">
            <div className="relative max-w-sm">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search courses..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

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
                  <div className="flex gap-2">
                    <Button
                      variant="destructive"
                      className="flex-1"
                      onClick={() => {
                        setSelectedCourse(course);
                        setDeleteDialogOpen(true);
                      }}
                    >
                      Delete
                    </Button>
                    <Button
                      variant="default"
                      className="flex-1"
                      onClick={() => {
                        setSelectedCourse(course);
                        setFormDialogOpen(true);
                      }}
                    >
                      Edit
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Deletion</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this offered course? This action
              cannot be undone.
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

      <AlertDialog open={formDialogOpen} onOpenChange={setFormDialogOpen}>
        <AlertDialogContent className="max-w-4xl">
          <AlertDialogHeader className="flex flex-row items-center justify-between">
            <AlertDialogTitle>
              {selectedCourse
                ? "Edit Offered Course"
                : "Add New Offered Course"}
            </AlertDialogTitle>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => {
                setFormDialogOpen(false);
                setSelectedCourse(null);
              }}
            >
              <X className="h-4 w-4" />
            </Button>
          </AlertDialogHeader>
          <div className="py-4">
            <OfferedCourseForm
              offeredCourse={selectedCourse || undefined}
              onSuccess={() => {
                setFormDialogOpen(false);
                setSelectedCourse(null);
              }}
            />
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </motion.div>
  );
};

export default AdminOfferedCourseSection;
