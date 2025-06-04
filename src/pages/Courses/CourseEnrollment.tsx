import { motion } from "framer-motion";
import { useAppSelector } from "@/redux/hooks";
import { selectCurrentUser } from "@/redux/features/auth/authSlice";
import CourseList from "@/components/form/courses/CourseList";
import { useGetStudentCoursesQuery } from "@/redux/features/student/studentApi";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

export default function CourseEnrollment() {
  const user = useAppSelector(selectCurrentUser);
  const {
    data: studentData,
    isLoading,
    error,
  } = useGetStudentCoursesQuery(user?.userId || "", {
    skip: !user?.userId,
  });

  if (isLoading) {
    return (
      <div className="container mx-auto py-6 space-y-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <Skeleton className="h-8 w-64 mb-2" />
            <Skeleton className="h-4 w-96" />
          </div>
        </div>
        <div className="grid gap-4">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-32 w-full" />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto py-6">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            {error instanceof Error
              ? error.message
              : "Failed to load course enrollment data"}
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-6 space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold">Course Registration</h1>
            <p className="text-muted-foreground mt-1">
              Register for courses for the upcoming semester
            </p>
          </div>
        </div>

        {user ? (
          <CourseList
            studentId={user.userId}
            enrolledCourses={studentData?.data?.enrolledCourses || []}
            availableCourses={studentData?.data?.availableCourses || []}
          />
        ) : (
          <div className="text-center py-12">
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                Please log in to view and register for courses
              </AlertDescription>
            </Alert>
          </div>
        )}
      </motion.div>
    </div>
  );
}
