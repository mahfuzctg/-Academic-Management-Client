import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
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
  useGetAllOfferedCoursesQuery,
  useDeleteOfferedCourseMutation,
} from "@/redux/features/course/offerCourseApi";
import type { IOfferedCourse } from "@/types/offeredCourse";
import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import { useState } from "react";
import OfferedCourseForm from "./OfferedCourseForm";
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

const OfferedCourseList = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCourse, setSelectedCourse] = useState<IOfferedCourse | null>(
    null
  );
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [formDialogOpen, setFormDialogOpen] = useState(false);

  const {
    data: offeredCourses,
    isLoading,
    isError,
  } = useGetAllOfferedCoursesQuery();
  const [deleteOfferedCourse] = useDeleteOfferedCourseMutation();

  const filteredCourses = offeredCourses?.filter((course: IOfferedCourse) => {
    const courseTitle = String(course?.course ?? "").toLowerCase();
    const faculty = String(course?.faculty ?? "").toLowerCase();
    const query = searchQuery.toLowerCase();

    return courseTitle.includes(query) || faculty.includes(query);
  });

  const handleDelete = async () => {
    if (selectedCourse) {
      try {
        await deleteOfferedCourse(selectedCourse.id).unwrap();
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

  if (isError) {
    return (
      <div className="flex items-center justify-center h-64 text-red-500">
        Error loading offered courses
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
          <CardTitle>Offered Course Management</CardTitle>
          <Button onClick={() => setFormDialogOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Add Offered Course
          </Button>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4 mb-6">
            <Input
              placeholder="Search offered courses..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="max-w-sm"
            />
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Course</TableHead>
                  <TableHead>Faculty</TableHead>
                  <TableHead>Section</TableHead>
                  <TableHead>Max Capacity</TableHead>
                  <TableHead>Days</TableHead>
                  <TableHead>Time</TableHead>
                  <TableHead className="w-[150px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCourses?.map((course: IOfferedCourse) => (
                  <TableRow key={course.id}>
                    <TableCell>{course.course}</TableCell>
                    <TableCell>{course.faculty}</TableCell>
                    <TableCell>{course.section}</TableCell>
                    <TableCell>{course.maxCapacity}</TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {course.days.map((day) => (
                          <Badge key={day} variant="secondary">
                            {day}
                          </Badge>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>
                      {course.startTime} - {course.endTime}
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
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
                            setFormDialogOpen(true);
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

export default OfferedCourseList;
