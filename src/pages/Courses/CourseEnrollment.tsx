import { motion } from "framer-motion";
import CourseList from "@/components/courses/CourseList";
import { useAuth } from "@/hooks/useAuth";

export default function CourseEnrollment() {
  const { user } = useAuth();

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
          <CourseList studentId={user.id} />
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              Please log in to view and register for courses
            </p>
          </div>
        )}
      </motion.div>
    </div>
  );
}
