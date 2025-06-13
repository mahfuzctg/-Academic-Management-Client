import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Clock,
  Users,
  CalendarDays,
  BookOpen,
  GraduationCap,
} from "lucide-react";
import { useGetAllOfferedCoursesQuery } from "@/redux/features/course/offerCourseApi";
import type { TQueryParam } from "@/types/global";
import { useDebounce } from "@/hooks/useDebounce";
import { Skeleton } from "@/components/ui/skeleton";

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
        title: "🎉 Enrollment Successful",
        description: "You've been successfully enrolled in the course",
        className: "bg-green-50 border-green-200",
      });
    } catch (error) {
      toast({
        title: "⚠️ Enrollment Failed",
        description: "Failed to enroll in the course. Please try again.",
        variant: "destructive",
      });
    }
  };

  if (isError) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-col items-center justify-center min-h-[400px] gap-4"
      >
        <div className="bg-red-100 p-6 rounded-full">
          <BookOpen className="h-10 w-10 text-red-500" />
        </div>
        <p className="text-red-500 text-center max-w-md text-lg">
          Failed to load courses. Please refresh the page or try again later.
        </p>
        <Button variant="outline" onClick={() => window.location.reload()}>
          Retry
        </Button>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8 max-w-7xl mx-auto px-4"
    >
      <div className="flex flex-col gap-6">
        <motion.div
          className="text-center space-y-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-4xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
            Available Courses
          </h2>
          <p className="text-muted-foreground text-lg">
            Explore and enroll in courses that match your academic goals
          </p>
        </motion.div>

        <motion.div
          className="relative max-w-md mx-auto w-full"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search by course name, code, or faculty..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-4 py-6 rounded-xl shadow-sm border-border/50 focus:border-primary/50 transition-colors"
          />
        </motion.div>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, index) => (
            <Card key={index} className="overflow-hidden border-border/50">
              <Skeleton className="h-48 w-full rounded-t-lg" />
              <CardContent className="space-y-4 pt-6">
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
                <div className="space-y-2">
                  {[...Array(4)].map((_, i) => (
                    <Skeleton key={i} className="h-4 w-full" />
                  ))}
                </div>
                <Skeleton className="h-10 w-full mt-4" />
              </CardContent>
            </Card>
          ))}
        </div>
      ) : data?.data?.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center justify-center py-16 gap-4"
        >
          <div className="bg-blue-100 p-8 rounded-full">
            <GraduationCap className="h-12 w-12 text-blue-600" />
          </div>
          <p className="text-center text-lg text-muted-foreground max-w-md">
            No courses found matching your search. Try different keywords or
            check back later.
          </p>
        </motion.div>
      ) : (
        <AnimatePresence mode="wait">
          <motion.div
            key={debouncedSearchQuery}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {data?.data?.map((course) => (
              <motion.div
                key={course._id}
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <Card className="hover:shadow-lg transition-all duration-200 border-border/50 hover:border-primary/30 overflow-hidden group h-full">
                  {course.image && (
                    <div className="relative h-48 overflow-hidden">
                      <motion.img
                        src={course.image}
                        alt={course.course?.title || "Course Image"}
                        className="w-full h-full object-cover rounded-t-lg group-hover:scale-105 transition-transform duration-300"
                        initial={{ opacity: 0.9 }}
                        whileHover={{ opacity: 1 }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                      <Badge className="absolute top-3 right-3 bg-white/90 text-foreground hover:bg-white shadow-sm">
                        {course.course?.code}
                      </Badge>
                    </div>
                  )}
                  <CardHeader>
                    <CardTitle className="text-lg font-semibold line-clamp-2">
                      {course.course?.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4 text-sm">
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-primary" />
                        <span>
                          <span className="font-medium">Faculty:</span>{" "}
                          {course.faculty?.fullName || "Not Assigned"}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <BookOpen className="h-4 w-4 text-primary" />
                        <span>
                          <span className="font-medium">Department:</span>{" "}
                          {course.academicDepartment?.name || "Not Assigned"}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-primary" />
                        <span>
                          <span className="font-medium">Time:</span>{" "}
                          {course.startTime && course.endTime
                            ? `${course.startTime} - ${course.endTime}`
                            : "N/A"}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CalendarDays className="h-4 w-4 text-primary" />
                        <div className="flex flex-wrap gap-1">
                          {course.days?.map((day) => (
                            <Badge
                              key={day}
                              variant="secondary"
                              className="text-xs bg-primary/10 text-primary hover:bg-primary/20"
                            >
                              {day}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex flex-col gap-3 pt-4">
                    <div className="w-full flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">
                        Capacity: {course.enrolled || 0}/
                        {course.maxCapacity || 0}
                      </span>
                      <div className="h-2 w-1/2 bg-gray-200 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-primary"
                          initial={{ width: 0 }}
                          animate={{
                            width: `${Math.min(
                              100,
                              ((course.enrolled || 0) /
                                (course.maxCapacity || 1)) *
                                100
                            )}%`,
                          }}
                          transition={{ duration: 0.8 }}
                        />
                      </div>
                    </div>
                    <Button
                      className="w-full mt-2 bg-primary hover:bg-primary/90 transition-colors"
                      onClick={() => handleEnroll(course._id)}
                      size="sm"
                    >
                      Enroll Now
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      )}
    </motion.div>
  );
};

export default OfferedCourseSection;
