// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { useToast } from "@/components/ui/use-toast";
// import {
//   useAssignFacultiesMutation,
//   useGetAllCoursesQuery,
//   useGetFacultiesWithCourseQuery,
// } from "@/redux/features/course/courseApi";
// import type { ICourse } from "@/types/course";
// import { useState } from "react";
// import OfferedCourseSection from "./OfferedCourseSection";

// export default function CourseEnrollment() {
//   const { toast } = useToast();
//   const [searchQuery, setSearchQuery] = useState("");
//   const [selectedCourse, setSelectedCourse] = useState<ICourse | null>(null);

//   const { data: courses, isLoading, isError } = useGetAllCoursesQuery();
//   const [assignFaculties] = useAssignFacultiesMutation();
//   const { data: courseFaculties } = useGetFacultiesWithCourseQuery(
//     selectedCourse?.id || ""
//   );

//   const filteredCourses = courses?.filter((course: ICourse) => {
//     const title = String(course?.title ?? "").toLowerCase();
//     const prefix = String(course?.prefix ?? "").toLowerCase();
//     const code = String(course?.code ?? "").toLowerCase();
//     const query = searchQuery.toLowerCase();

//     return (
//       title.includes(query) || prefix.includes(query) || code.includes(query)
//     );
//   });

//   const handleAssignFaculty = async (courseId: string, facultyId: string) => {
//     try {
//       await assignFaculties({
//         courseId,
//         faculties: [facultyId],
//       }).unwrap();
//       toast({
//         title: "Success",
//         description: "Faculty assigned successfully",
//       });
//     } catch (error) {
//       toast({
//         title: "Error",
//         description: "Failed to assign faculty",
//         variant: "destructive",
//       });
//     }
//   };

//   if (isLoading) {
//     return <div className="text-center mt-10">Loading courses...</div>;
//   }

//   if (isError) {
//     return (
//       <div className="text-center mt-10 text-red-500">
//         Failed to load courses.
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-6 w-9/12 my-20 mx-auto">
//       <div className="flex justify-between items-center">
//         <h1 className="text-3xl font-bold">Course Management</h1>
//       </div>
//       <OfferedCourseSection />
//       <div className="flex items-center space-x-2">
//         <Input
//           placeholder="Search courses..."
//           value={searchQuery}
//           onChange={(e) => setSearchQuery(e.target.value)}
//           className="max-w-sm"
//         />
//       </div>

//       <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
//         {filteredCourses?.map((course: ICourse) => (
//           <Card key={course.id}>
//             <CardHeader>
//               <CardTitle>{course.title}</CardTitle>
//               <CardDescription>
//                 {course.prefix} {course.code}
//               </CardDescription>
//             </CardHeader>
//             <CardContent>
//               <div className="space-y-2">
//                 <p className="text-sm">
//                   <span className="font-medium">Credits:</span> {course.credits}
//                 </p>
//                 {course?.preRequisiteCourses?.length > 0 && (
//                   <p className="text-sm">
//                     <span className="font-medium">Prerequisites:</span>{" "}
//                     {course.preRequisiteCourses
//                       .map((prereq) => prereq.course)
//                       .join(", ")}
//                   </p>
//                 )}
//                 <Button
//                   variant="outline"
//                   className="w-full"
//                   onClick={() => setSelectedCourse(course)}
//                 >
//                   Manage Course
//                 </Button>
//               </div>
//             </CardContent>
//           </Card>
//         ))}
//       </div>
//     </div>
//   );
// }
